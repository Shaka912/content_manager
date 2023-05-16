import { connectdb } from "../../../../../lib/mongodb";

import Post from "../../../../../models/Posts";

export default async function handler(req, res) {
  connectdb()
    .then((res) => console.log("db connected"))
    .catch((err) => console.log(err));
  if (req.method === "PATCH") {
    const {
      query: { id },
    } = req;
    try {
      const posts = await Post.findOne({ _id: id });
      if (!posts) {
        res.status(404).json({ error: "post not found" });
      }
      if (!req.body.status) {
        res.status(404).json({ error: "status is required" });
      }
      const status = req.body.status.toLowerCase()
      const add = await Post.updateOne(
        { _id: id },
        { $push: { status: status } }
      );
      if (!add) {
        res.status(404).json({ error: "Status was not updated Try again " });
      }
      res.status(200).json({ message: "Status updated" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "something went wrong" });
    }
  } else {
    res.status(404).json({ error: "Method not allowed" });
  }
}
