import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { UserModel, BlogModel } from './database';
import { connect } from 'mongoose';
import cors from "cors";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.VITE_ORIGIN }));

app.use(bodyParser.json());

function generateShortDescription(htmlContent: string) {

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
  image_uri: string,
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
    res.json({ blog });
  }
);

// /blogs/:userId (get)
app.get(
  '/blogs/:userId',
  async (req: Request<{ userId: string }>, res: Response): Promise<any> => {
    const { userId } = req.params;
    const blog = await BlogModel.find({ userId: userId });
    if (!blog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    res.json({ blog });
  }
);

// /blogs
app.get(
  '/blogs/',
  async (_req: Request, res: Response): Promise<any> => {
    const blogs = await BlogModel.find();
    if (!blogs) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    res.json({ blogs });
  }
);


// /blog/create (post)
//   args
//     title : string
//     content :  markdown
//     image_uri : stirng
//     userId : string
//   note short desciption to be generated from the content
//

app.post(
  "/blog/create",
  async (req: Request<{}, {}, BlogCreateBody>, res: Response) =>{
    const { title, content, image_uri, userId } = req.body;
    const shortDescription = generateShortDescription(content);
    const blog = new BlogModel({ title, content, image_uri, userId, shortDescription });
    await blog.save();
    res.json({message: "blog saved"});
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
