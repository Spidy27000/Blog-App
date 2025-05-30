import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { UserModel, User } from './database';
import { connect } from 'mongoose';
import cors from "cors";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.VITE_ORIGIN }));

app.use(bodyParser.json());

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

app.get(
  '/login/',
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
  '/signup/',
  async (req: Request<{}, {}, SignUpBody>, res: Response): Promise<any> => {
    const { username, email, password, image_uri} = req.body;

    const isVaild = await UserModel.findOne({ email: email });
    if (isVaild) {
      return res.status(400).json({ error: "Email Already exisits" });
    }
    const user = new UserModel({username: username, email: email, password: password, image_uri: image_uri});
    await user.save();
    res.json({ message: 'Signup successful', user });
  }
);

app.listen(PORT, async () => {
  try {
    await connect(process.env.MONGO_URI || "");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
  console.log(`Server running at http://localhost:${PORT}`);
});
