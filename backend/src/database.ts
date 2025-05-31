import { model, ObjectId, Schema } from "mongoose";

export type User = Document & {
  username: string,
  email: string,
  password: string,
  image_uri?: string
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image_uri: { type: String }
});

export const UserModel = model<User>("User", UserSchema)
UserModel.createCollection();

export type Blog = Document & {
  title: string,
  shortDescription: string,
  image_uri: string,
  content: string,
  creationDate: Date,
  updateDate: Date,
  userId: ObjectId
}

const BlogSchema = new Schema<Blog>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  image_uri: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true , ref: "User" },
  content: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now},
  updateDate: { type: Date, required: true, default: Date.now},

});

export const BlogModel = model<Blog>("Blog", BlogSchema)
BlogModel.createCollection();
