import { connectdb } from "../../../../lib/mongodb";

import Post from "../../../../models/Posts";
//this route is to get posts which subreddits are not posted
export default async function handler(req, res) {
  if (req.method === "GET") {
    connectdb()
      .then((res) => console.log("db connected"))
      .catch((err) => console.log(err));
    const { query } = req;
    const userid = query.userid;
    const subreddit1 = query.subreddits?.toLowerCase();
    if (!userid || !subreddit1) {
      res.status(400).json({ error: "bad request" });
    }
    const subreddit = subreddit1 ? subreddit1.split(",") : null;
    if (subreddit.length > 0) {
      const posts = await Post.find({
        userid: userid,
        subreddit: { $in: subreddit },
      })
      const filteredPosts = posts.filter(post => !subreddit.some(tag => post.status.includes(tag)));
      if (filteredPosts.length > 0) {
        res.json(filteredPosts);
      } else {
        res.status(404).json({ error: "no posts found with notposted subs" });
      }
    }
  } else {
    res.status(405).json({ error: "method not allowed" });
  }
}
