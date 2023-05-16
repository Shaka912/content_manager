import { connectdb } from "../../../lib/mongodb";
import user from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {  setCookie, deleteCookie } from "cookies-next";
const JWT_SECRET = process.env.JWT_SECRET;

export default async function login(req, res) {
  connectdb().catch((err) => console.log(err));

  if (req.method == "POST") {
    const cookies = req.cookies;
    console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
    let users = await user.findOne({ email: req.body.email });
    if (!req.body.email || !req.body.password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    if (!users) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    //comparing user password with password in database

    let passcompare = await bcrypt.compare(req.body.password, users.password);
    if (passcompare == false) {
      return res.status(401).json({ error: "Invalid Email or password" });
    }
    const data = {
      id: users.id,
      email: users.email,
    };

    const authtoken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    // const authtoken = await new jose.SignJWT(data, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: "10s",
    //    });
    const newRefreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "2d",
    });
    // const newRefreshToken =await  new jose.SignJWT(data, process.env.REFRESH_TOKEN_SECRET, {
    //   expiresIn: "2d",
    // });
    let newRefreshTokenArray = !cookies?.jwt
      ? // if there is not cookie with jwt, it happens to be true then newFreshtokenArry will be qual to refreshtoken in database
        users.refreshToken
      : users.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies) {
      /* 
                  Scenario added here: 
                      1) User logs in but never uses RT and does not logout 
                      2) RT is stolen
                      3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
                  */
      const refreshToken = cookies.jwt;
      const foundToken = await user.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log("attempted refresh token reuse at login!");
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      
      deleteCookie('Set-Cookie',{req,res})
    }

    // Saving refreshToken with current user
    users.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await users.save();
    console.log(result);
    setCookie("Set-Cookie", newRefreshToken, {
      req,
      res,
      maxAge: 48 * 60 * 60 ,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    // Send authorization roles and access token to user

    res.json({
      user: {
        id: users.id,
        email: users.email,
        authtoken: newRefreshToken,
        name: users.name,
      },
    });
  } else {
    res.status(405).json({ message: "Invalid Request" });
  }
}
