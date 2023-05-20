import { connectdb } from "../../../lib/mongodb";
import Tags from "../../../models/tags";
// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
export default async function tags(req, res) {
  connectdb()
    .then((res) => console.log("db connected"))
    .catch((err) => console.log(err));
    const { query } = req;
    const userid = query.userid
  if (req.method === "POST") {
    if (!req.body.name || !req.body.userid) {
      return res.status(400).json({ message: "Name / userid is required" });
    }
    Tags.create({ name: req.body.name, userid: req.body.userid })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  }  else if (req.method === "GET") {
   const data =  await Tags.find({userid:userid})
      if (data.length >0){
        res.status(200).json(data)
      
      }else{
        res.status(500).json({message:"No Tags found"})
      }

  } else {
    res.status(500).json({ message: "Invalid Route" });
  }
}
