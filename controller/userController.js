const bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');
require("dotenv").config();

const connection = require('../db_info');
const {getAccessToken,  getRefreshToken } = require('../controller/auth');

let sql = '';

const checkId = (req, res) => {
    sql = 'SELECT EXISTS( SELECT userId FROM users WHERE userId = ?) as result;';
    let param = req.params.inputId;
    console.log('param : ' , param);
    connection.query(sql, param, (err, result) => {
        console.log('result : ' , result) //If exist 1 , if not 0
        if (err) console.log("query is not excuted. checkId fail!\n" + err);
        else res.send(result[0]);
    })
};

const signUp = (req, res) => {
    let { userId, userPwd, userEmail } = req.body;
    let values = [userId, userPwd, userEmail];
    console.log('values : ' , values)
    sql = 'INSERT INTO users(userId, userPwd, userEmail) VALUES(?, ?, ? );';
    connection.query(sql, values, (err, result) => {
        if(err){
            console.log('query is not excuted. checkId fail!\n' + err);
            return res.json({success:false, err});
        }else{
            res.json({success:true, "result" : result});
        }
    })
};

const login = (req, res) => {
    let { userId, userPwd } = req.body;
    sql = 'SELECT userNo, userId , userPwd, userRegion, userArea FROM users WHERE userId = ?';
    connection.query(sql, userId, (err, result) => {
        if(err){
            console.log('query is not excuted. checkId fail!\n' + err);
            return res.json({success:false, err});
        }else{
            if(result.length > 0 && result[0].userPwd == userPwd){ //success
                const { userPwd, ...others} = result[0];
                let obj = {userId};
                const accessToken = getAccessToken(obj);
                const refreshToken = getRefreshToken(obj);
                res.cookie("accessToken", accessToken);
                res.cookie("refreshToken", refreshToken);
                res.json({"result" : 1, "user" : others});
            }else if(result.length == 0){ res.json({"result" : 2 })
            }else{   res.json({"result" : 3 }) }       
        }
    })
};

const refreshToken = (req, res) => {

}

module.exports = { checkId , signUp, login, refreshToken}