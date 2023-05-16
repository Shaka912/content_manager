import { connectdb } from "../../../lib/mongodb";
import Tags from "../../../models/tags";
// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
export default function tags(req, res) {
  connectdb()
    .then((res) => console.log("db connected"))
    .catch((err) => console.log(err));

  if (req.method === "POST") {
    if (!req.body.name || !req.body.userid) {
      return res.status(400).json({ message: "Name / userid is required" });
    }
    Tags.create({ name: req.body.name, userid: req.body.userid })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  }  else if (req.method === "GET") {
    Tags.find()
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(500).json({ message: "Invalid Route" });
  }
}
