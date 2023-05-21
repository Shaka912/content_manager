import { connectdb } from "../../../lib/mongodb";
import Post from "../../../models/Posts";

export default async function handler(req, res) {
  connectdb()
    .then((res) => console.log("db connected"))
    .catch((err) => console.log(err));
  if (req.method === "GET") {
    const {
      query: { id },
    } = req;
    const post = await Post.findOne({ _id: id });

    res.json(post);
  } else if (req.method === "DELETE") {
    const {
      query: { id },
    } = req;
    const post = await Post.findOneAndDelete({_id:id});
    if (!post) {
      res.status(404).json({ error: "post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  }
   else {
    res.status(405).json({ error: "method not allowed" });
  }
}
