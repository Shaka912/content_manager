import { connectdb } from "../../../lib/mongodb";

import Post from "../../../models/Posts";


export default async function handler(req, res) {
  if (req.method === "GET") {
    connectdb()
      .then((res) => console.log("db connected"))
      .catch((err) => console.log(err));
    const { query } = req;

    console.log(query);
   
    const tags1 = query.tags?.toLowerCase();
    const tags = tags1 ? tags1.split(",") : null;
    const subreddit1 = query.subreddits?.toLowerCase();
    const subreddit = subreddit1 ? subreddit1.split(",") :null;
    console.log(subreddit);
    if (tags?.length > 0 && subreddit === null) {
      const post = await Post.find({ tags: { $in: tags } });
      if (post.length > 0 ) {
        res.json(post);
      } else {
        res.status(400).json({ message: "No post found with this tags" });
      }
    } else if(subreddit?.length > 0 ){
        const subs = await Post.find({ status: { $in: subreddit } });
        console.log(subs)
        if( subs.length >0){
            res.json(subs);
        }else {
            res.status(400).json({ message: "No post found with this subreddits" });
        }
    } 
    else if(subreddit === null && tags === null){
        const posts = await Post.find({"status":{$size:0}});
        if(posts){
            res.json(posts);
        }else{
            res.status(400).json({message: "No post found"})
        }
    }
    else{
        return res.status(500).json({message: "Internal server error"})
    }
    
  }
  else{
    return res.status(400).json({message: "Invalid request"})
  }
}
