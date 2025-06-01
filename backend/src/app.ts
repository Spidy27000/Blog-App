import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { UserModel, BlogModel } from './database';
import { connect } from 'mongoose';
import cors from "cors";
import "dotenv/config";
import { load } from 'cheerio';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());

function generateShortDescription(htmlContent: string) {
  const maxLenght = 200;
  let $ = load("<div class='a'><div>")(".a");
  $.append(htmlContent);
  let text = $.text().trim();

  if (text.length <= maxLenght) return text;

  text = text.slice(0, maxLenght);
  let lastspace = text.lastIndexOf(" ");
  return text.slice(0, lastspace) + "...";

}

type LoginQuery = {
  email: string,
  password: string
};

type SignUpBody = {
  username: string,
  email: string,
  image_uri?: string,
  password: string
};

type BlogCreateBody = {
  title: string,
  content: string,
  image_uri?: string,
  userId: string
}
type BlogUpdateBody = {
  blogId: string,
  title?: string,
  content?: string,
  image_uri?: string,
  userId: string
}
type BlogResponse = {
  title: string,
  blogId: string,
  author: string,
  shortDescription: string,
  creationDate: number,
  image_uri: string
};

app.get(
  '/login',
  async (req: Request<{}, {}, {}, LoginQuery>, res: Response): Promise<any> => {
    const { email, password } = req.query;
    const user = await UserModel.findOne({ email: email }).select({ password: 1 }).lean();
    if (!user || password != user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ message: 'Login successful', user });
  }
);

app.post(
  '/signup',
  async (req: Request<{}, {}, SignUpBody>, res: Response): Promise<any> => {
    const { username, email, password, image_uri } = req.body;

    const isVaild = await UserModel.exists({ email: email });
    if (isVaild) {
      return res.status(400).json({ error: "Email Already exisits" });
    }
    const user = await UserModel.create({ username, password, email, image_uri });
    res.json({ message: 'Signup successful', user });
  }
);

// /blog/:blogid (get)
app.get(
  '/blog/:blogId',
  // TODO: clean the response of this endpoint 
  async (req: Request<{ blogId: string }>, res: Response): Promise<any> => {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId).lean();
    if (!blog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    const user = await UserModel.findById(blog.userId).lean();
    res.json({ blog, user });
  }
);


// /blogs/:userId (get)
app.get(
  '/blogs/:userId',
  async (req: Request<{ userId: string }>, res: Response): Promise<any> => {
    const { userId } = req.params;
    const blogs = await BlogModel.find({ userId: userId }).populate("userId", "username").lean();

    if (!blogs) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    let resBlogs: BlogResponse[] = blogs.map(({ _id, title, shortDescription, creationDate, image_uri, userId }) => {
      return <BlogResponse>{
        blogId: _id.toString(),
        title,
        author: (userId as any).username,
        shortDescription,
        creationDate,
        image_uri
      };
    });

    res.json({ blogs: resBlogs });
  }
);

// /blogs
app.get(
  '/blogs/',
  async (_req: Request, res: Response): Promise<any> => {
    const blogs = await BlogModel.find().populate("userId", "username");
    if (!blogs) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    let resBlogs: BlogResponse[] = blogs.map(({ _id, title, shortDescription, userId, creationDate, image_uri }): BlogResponse => {
      return <BlogResponse>{
        blogId: _id.toString(),
        title,
        author: (userId as any).username,
        shortDescription,
        creationDate,
        image_uri
      };
    });

res.json({ blogs: resBlogs });
  }
);

app.post(
  "/blog/create",
  async (req: Request<{}, {}, BlogCreateBody>, res: Response): Promise<any> => {
    const { title, content, image_uri, userId } = req.body;
    const shortDescription = generateShortDescription(content);
    const blog = new BlogModel({ title, content, image_uri, userId, shortDescription });
    await blog.save();
    res.json({ message: "blog saved" });
  }
)

app.post(
  "/blog/update",
  async (req: Request<{}, {}, BlogUpdateBody>, res: Response): Promise<any> => {

    const { blogId, title, content, image_uri } = req.body;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }

    blog.updateDate = Date.now();
    if (title) blog.title = title;
    if (content) {
      blog.content = content;
      blog.shortDescription = generateShortDescription(content);
    }
    if (image_uri) blog.image_uri = image_uri;

    res.json({ message: "updated Successfull" })
  }
)
app.get(
  "/blog/delete/:blogId",
  async (req: Request<{ blogId: string }>, res: Response): Promise<any> => {
    const { blogId } = req.params;
    const deleted = await BlogModel.findByIdAndDelete(blogId);
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  }
)

app.listen(PORT, async () => {
  try {
    await connect(process.env.MONGO_URI || "");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
  console.log(`Server running at http://localhost:${PORT}`);
});
