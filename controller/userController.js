const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const connection = require('../db_info');



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
    sql = 'SELECT userId , userPwd FROM users WHERE userId = ?';
    connection.query(sql, userId, (err, result) => {
        if(err){
            console.log('query is not excuted. checkId fail!\n' + err);
            return res.json({success:false, err});
        }else{
            if(result.length > 0 && result[0].userPwd == userPwd){ //success
                const ACCESS_TOKEN_SECRET  = process.env.ACCESS_TOKEN_SECRET;
                const accessToken = jwt.sign(
                    {userId},
                    ACCESS_TOKEN_SECRET,
                    {expiresIn : "15m"}
                );
                res.cookie("userToken", accessToken);
                res.json({"result" : 1, accessToken});
            }else if(result.length == 0){
                res.json({"result" : 2 })
            }else{
                res.json({"result" : 3 })
            }
            
        }
    })
};

module.exports = { checkId , signUp, login}