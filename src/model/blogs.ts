import mongoose, { Document, Model } from 'mongoose';
interface IBlog extends Document {
  blogTitle: string;
  blogDescription: string;
  blogImage: string;
  CreatedDate: Date;
  Likes: number;
  disLikes: mongoose.Types.ObjectId[];
}
const blogsSchema = new mongoose.Schema({
  blogTitle: { type: String, required: true},
  blogDescription: { type: String, required: true},
  blogImage: { type: String,required: true},
  CreatedDate: { type: Date, default: Date.now},
  Likes: {type: Number, default: 0},
  disLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "USER"}]
});
const Blog: Model<IBlog> = mongoose.model<IBlog>("Blogs", blogsSchema);
export { Blog };