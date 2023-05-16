import { connectdb } from "../../../lib/mongodb";
import user from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export default async function register(req, res) {
  connectdb().catch((err) => console.log(err));
  if (req.method == "POST") {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Data is missing" });
    }

    let users = await user.findOne({ email: req.body.email });
    if (users) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(req.body.password.length < 6){
      return res.status(400).json({ message: "Password is too short" });
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    users = await user.create({
      password: secpass,
      email: req.body.email,
      name: req.body.name,
    });
    const data = {
      id: users.id,
      email: users.email,
    };
    const authtoken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      user: {
        id: users.id,
        email: users.email,
        authtoken: authtoken,
        
      },
    });
  } else {
    res.status(405).json({ message: "Invalid Request" });
  }
}
