import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "./database.types";
import { load } from "cheerio"

// makes a type to make specfic keys optinal 
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type UserData = Pick<Tables<'Users'>, "id" | 'email' | 'username'>;
type BlogCardData =
  Optional<Pick<Tables<'Blog'>, "id" | "title" | 'shortDescription' | "tag" | "image_uri" | "created_at" | "updated_at">, "image_uri" | "created_at"> & { user: UserData };

function generateShortDescription(htmlContent: string): string {
  const maxLenght = 200;
  let $ = load("<div class='a'><div>")(".a");
  $.append(htmlContent);
  let text = $.text().trim();

  if (text.length <= maxLenght) return text;

  text = text.slice(0, maxLenght);
  let lastspace = text.lastIndexOf(" ");
  return text.slice(0, lastspace) + "...";

}

export class Db {
  static _inst: Db;
  connection: SupabaseClient;

  private constructor() {
    this.connection = createClient<Database>(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  }

  public static get inst(): Db {
    if (!Db._inst) {
      Db._inst = new Db();
    }
    return Db._inst;
  }

  public async login(email: string, password: string): Promise<UserData | string> {
    const { data, error } = await this.connection
      .from("Users")
      .select("id , email, username")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error != null) return error.message;
    return data as UserData;
  }

  public async signup(username: string, email: string, password: string): Promise<UserData | string> {
    const { data, error } = await this.connection
      .from("Users")
      .insert({ username, email, password })
      .select("id, email, username")
      .single();

    if (error != null) return error.message;
    return data as UserData;
  }

  public async createBlog(title: string, content: string, image_uri: string, userId: number, tag: string): Promise<BlogCardData | string> {
    let shortDescription = generateShortDescription(content);

    const { data, error } = await this.connection
      .from("Blog")
      .insert({ title, content, shortDescription, image_uri, user: userId, tag })
      .select(`
        id,
        title,
        shortDescription,
        image_uri,
        created_at,
        user:Users!Blog_user_fkey(
          id,
          username,
          email
        )
      `)
      .single()

    if (error != null) return error.message;

    return {
      ...data,
      user: data.user[0]
    } as BlogCardData;
  }

  public async getblog(blogid: number): Promise<(Omit<Tables<"Blog">, "user"> & { user: UserData }) | string> {
    const query = this.connection
      .from("Blog")
      .select(`
        *,
        user:Users!Blog_user_fkey(
          id,
          username,
          email
        )
      `)
      .eq("id", blogid)
      .single();

    const { data, error } = await query;
    if (error != null) return error.message;


    return {
      ...data,
      user: data.user[0]
    };
  }
  public async getBlogs(userId: number | null = null): Promise<BlogCardData[] | string> {
    const query = this.connection
      .from("Blog")
      .select(`
        id,
        title,
        shortDescription,
        image_uri,
        created_at,
        tag,
        user:Users!Blog_user_fkey(
          id,
          username,
          email
        )
      `)
      .order("created_at", { ascending: true })

    if (userId !== null) {
      query.eq("user.id", userId);
    }

    const { data, error } = await query;
    if (error != null) return error.message;

    return data.map(blog => ({
      ...blog,
      user: blog.user[0]
    })) as BlogCardData[];
  }

  public async updateBlog(blogId: number, title: string, content: string, tag: string, image_uri: string): Promise<BlogCardData | string> {
    const shortDescription = generateShortDescription(content);
    const query = this.connection
      .from("Blog")
      .update({
        title,
        shortDescription,
        content,
        updated_at: Date.now(),
        tag,
        image_uri,
      })
      .eq("id", blogId)
      .select(`
        id,
        title,
        shortDescription,
        image_uri,
        created_at,
        tag,
        user:Users!Blog_user_fkey(
          id,
          username,
          email
        )
      `)
      .single();
    const { data, error } = await query;
    if (error != null) return error.message;
    return {
      ...data,
      user: data.user[0]
    } as BlogCardData;
  }
  public async deleteBlog(blogId: number): Promise<string> {
    const query = this.connection
      .from("Blog")
      .delete()
      .eq("id", blogId)
    const { error } = await query;
    if (error != null) return error.message;
    return "delete success"
  }

  public async getTags(): Promise<({ tags: string[] }) | string> {
    const query = this.connection
      .from("Blog")
      .select("tag");
    const { data, error } = await query;
    if (error != null) return error.message;

    return {
      tags: data.map(tag => (tag.tag))
    }
  }

  //TODO: we can use the existing data of the page to filter the blogs 
  public async serachByTag(tag: string): Promise<BlogCardData[] | string> {
    const query = this.connection
      .from("Blog")
      .select(`
        id,
        title,
        shortDescription,
        image_uri,
        created_at,
        tag,
        user:Users!Blog_user_fkey(
          id,
          username,
          email
        )
      `)
      .order("created_at", { ascending: true })
      .eq("tag", tag);

    const { data, error } = await query;
    if (error != null) return error.message;

    return data.map(blog => ({
      ...blog,
      user: blog.user[0]
    })) as BlogCardData[];
  }
  public async serachByDescription(search: string): Promise<BlogCardData[] | string> {
    const query = this.connection
      .from("Blog")
      .select(`
        id,
        title,
        shortDescription,
        image_uri,
        created_at,
        tag,
        user:Users!Blog_user_fkey(
          id,
          username,
          email
        )
      `).textSearch("title", search, {
        type: "websearch",
        config: "english"
      })
      .order("created_at", { ascending: true })

    const { data, error } = await query;
    if (error != null) return error.message;

    return data.map(blog => ({
      ...blog,
      user: blog.user[0]
    })) as BlogCardData[];
  }


}

