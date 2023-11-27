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

const signUp = (reql, res) => {

};

module.exports = { checkId , signUp}