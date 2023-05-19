import { connectdb } from "../../../lib/mongodb";
import fs from "fs";
import Post from "../../../models/Posts";
import user from "../../../models/user";
import { ObjectId } from "mongodb";
import xpath from "path";
import formidable from "formidable";
import aws from "aws-sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new aws.S3({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export default async function create(req, res) {
  connectdb()
    .then((res) => console.log("db connected"))
    .catch((err) => console.log(err));
  
  const form = formidable({ multiples: true });
  if (req.method === "POST") {
    form.parse(req, async (err, fields, files) => {
      
      const user1 = await user.findOne({ _id: fields.userid });
      if (!user1) {
        return res.status(405).json({ message: "Request not Allowed" });
      }
      if (
        !fields.title ||
        !fields.type ||
        !fields.tags ||
        
        !fields.subreddit ||
        !fields.userid
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      try {
        let filename =
          files.file.newFilename +
          "-" +
          Date.now() +
          xpath.extname(files.file.originalFilename);
        const parms = {
          Bucket: "content0123",
          Key: filename,
          Body: fs.createReadStream(files.file.filepath),
          ACL: "public-read",
        };
        s3.upload(parms, async (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          const tagsArray = fields.tags.toLowerCase().split(",");

          let key = data.key;
          const post = await Post.create({
            _id: new ObjectId(),
            title: fields.title,
            type: fields.type,
            tags: tagsArray,
            status: fields.status,
            subreddit: fields.subreddit,
            userid: fields.userid,
            url:fields.url,
            path: `http://d1dp5nanfre15g.cloudfront.net/${key}`,
          });
          if (post) {
            res.status(200).json({ message: post });
          }else{
            res.status(500).json({ message: "Something went wrong" });
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  } else if (req.method === "GET") {
    const { query } = req;
    const userid = query.userid
    const posts = await Post.find({userid:userid});
    if(posts.length>0){
      res.json(posts);
    }else{
      res.status(404).json({ message: "No posts found" });
    
    }
  } else {
    res.status(405).json({ message: "Request not Allowed" });
  }
}

// export default apiRoute;
