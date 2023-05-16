import { connectdb } from "../../../lib/mongodb";
import Subreddit from "../../../models/subreddit";
// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
export default function subreddit(req, res) {
  connectdb()
    .then((res) => console.log("db connected"))
    .catch((err) => console.log(err));

  if (req.method === "POST") {
    if (!req.body.name || !req.body.userid) {
      return res.status(400).json({ message: "Name / userid is required" });
    }

    Subreddit.create({ name: req.body.name, userid: req.body.userid })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  } else if (req.method === "DELETE") {
    Subreddit.findByIdAndDelete(req.body.id)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  } else if (req.method === "GET") {
    Subreddit.find()
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(500).json({ message: "Invalid Route" });
  }
}