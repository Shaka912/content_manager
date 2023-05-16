
import User from "../../../models/user";
import  { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
import {  deleteCookie } from 'cookies-next';
export default async function logout(req, res){
    // On client, also delete the accessToken
    if(req.method === 'POST' || req.method === 'PUT' ||req.method === 'DELETE'){
        return res.status(405).json({message: 'incorrect  method'});
    }
    let cookies = req.cookies;  
    // console.log(cookies['Set-Cookie']);
    if (!cookies) return res.status(200).json({message: 'No content'}); //No content
    const refreshToken = cookies['Set-Cookie'];
    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        //res.clear('Set-Cookie', { httpOnly: true, sameSite: 'None', secure: true });
        deleteCookie('Set-Cookie',{req,res})
        return res.status(200).json({message: 'deleted'});
    }
    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    const result = await foundUser.save();
    console.log(result);
    //res.clear('Set-Cookie', { httpOnly: true, sameSite: 'None', secure: true });
    deleteCookie('Set-Cookie',{req,res})
    res.status(200).json({message: 'deleted'});
}