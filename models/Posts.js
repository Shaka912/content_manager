import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  //user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    
  },
  status: {
    type: [String],
    
  },
  subreddit: {
    type: [String],
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  url:{
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  timestamps: { type: Date, default: Date.now },
});

const Posts = mongoose.models.Post1 || mongoose.model("Post1", postSchema);

export default Posts;
