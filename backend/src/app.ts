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

//TODO: Remove if not needed
// const toObjectId = (id:string) : Types.ObjectId =>{
//   return new Types.ObjectId(id);
// }

app.get(
  '/login',
  async (req: Request<{}, {}, {}, LoginQuery>, res: Response): Promise<any> => {
    const { email, password } = req.query;
    const user = await UserModel.findOne({ email: email });
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

    const isVaild = await UserModel.findOne({ email: email });
    if (isVaild) {
      return res.status(400).json({ error: "Email Already exisits" });
    }
    const user = new UserModel({ username: username, email: email, password: password, image_uri: image_uri });
    await user.save();
    res.json({ message: 'Signup successful', user });
  }
);


// /blog/:blogid (get)
app.get(
  '/blog/:blogId',
  async (req: Request<{ blogId: string }>, res: Response): Promise<any> => {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    const user = await UserModel.findById(blog.userId);
    res.json({ blog, user });
  }
);

// /blogs/:userId (get)
app.get(
  '/blogs/:userId',
  async (req: Request<{ userId: string }>, res: Response): Promise<any> => {
    // TODO : also give user info with the each data
    const { userId } = req.params;
    const blogs = await BlogModel.find({ userId: userId });
    if (!blogs) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    res.json({ blogs });
  }
);

// /blogs
//TODO: remove content from the response
app.get(
  '/blogs/',
  async (_req: Request, res: Response): Promise<any> => {
    // TODO : also give user info with the each data
    const blogs = await BlogModel.find();
    if (!blogs) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    res.json({ blogs });
  }
);

app.post(
  "/blog/create",
  async (req: Request<{}, {}, BlogCreateBody>, res: Response): Promise<any> => {
    const { title, content, image_uri, userId } = req.body;
    const shortDescription = generateShortDescription(content);
    const blog = new BlogModel({ title, content, image_uri, userId, shortDescription });
    await blog.save();
    res.json({ message: "blog saved", blog });
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

    res.json({ message: "updated Successfull", blog })
  }
)
app.get(
  "/blog/delete/:blogId",
  async (req: Request<{ blogId: string }>, res: Response) : Promise<any> => {
    const { blogId } = req.params;
    const deleted = await BlogModel.findByIdAndDelete(blogId);
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted', blog: deleted });
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
