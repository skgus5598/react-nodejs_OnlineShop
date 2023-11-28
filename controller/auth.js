const jwt = require('jsonwebtoken');
require("dotenv").config();
const ACCESS_TOKEN_SECRET  = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const getAccessToken = (obj) => {
    const accessToken = jwt.sign(
        obj,//   {userId},
        ACCESS_TOKEN_SECRET,
        {expiresIn : "2m"}
    );
    console.log("getAccesstoken : " , accessToken);
    return accessToken;
};

const getRefreshToken = (obj) => {
    const refreshToken = jwt.sign(
        obj,
        REFRESH_TOKEN_SECRET,
        {expiresIn : "24h"}
    );
    console.log("getrefreshToken : " , refreshToken);
    return refreshToken;
};

module.exports = {getAccessToken,  getRefreshToken };