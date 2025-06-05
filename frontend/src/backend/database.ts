import { createClient, SupabaseClient } from "@supabase/supabase-js" ;
import type { Database } from "./database.types";

export class Db {
  static _inst : Db;
  connection: SupabaseClient;

  private constructor(){
    this.connection = createClient<Database>(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  }

  public static get inst() : Db{
    if (!Db._inst){
      Db._inst = new Db();
    }
    return Db._inst;
  }

  public async login(email: string, password: string): Promise<boolean|string> {
    const { data, error } = await this.connection
     .from("Users")
     .select("email, password")
     .eq("email",email)
     .eq("password",password);

    if ( error != null ) return error.message;
    if ( data  != null ) return true;
  }
  public async signup(username: string, email: string, password: string): Promise<boolean|string> {
    const { error } = await this.connection
     .from("Users")
     .insert({username, email, password});

    if ( error != null ) return error.message;
    return true;
  }

}

