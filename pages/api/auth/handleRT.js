

import User from "@/models/user";

import jwt from "jsonwebtoken";

export default async function handleRT(req,res){
    if (req.method === 'GET'){
        const cookies = req.cookies;
        if (!cookies?.jwt) {return res.sendStatus(401)};
        const refreshToken = cookies.jwt;
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        const foundUser = await User.findOne({ refreshToken }).exec();
        // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                console.log('attempted refresh token reuse!')
                const hackedUser = await User.findOne({ email: decoded.email }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
                console.log(result);
            }
        )
        return res.sendStatus(403); //Forbidden
    }
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                console.log('expired refresh token')
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
                console.log(result);
            }
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

            // Refresh token was still valid
            // const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                   id: decoded._id,
                   email: decoded.email,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );

            const newRefreshToken = jwt.sign(
                { "email": foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({  accessToken })
        }
    );
    }else{
        res.status(405).json({message:"Method not allowed"})
    
    }

}
