const connection = require('../db_info');
const fs = require('fs');


let sql = '';

const findAll = (req, res) => {
   // sql = 'SELECT DISTINCT  a.*, b.userId, b.userRegion,b.userArea FROM products a, users b WHERE a.userNo = b.userNo;';
    sql = 'SELECT p.* ,'
            +     'u.userId ,'
            +     'u.userRegion ,'
            +     'u.userArea ,'
            +     '(SELECT ir.imgName '
            +     'FROM imagesRepo ir '
            +     'WHERE p.id = ir.pdId '
            +     'LIMIT 1) as imgName '
         + 'FROM products p '
         + 'INNER JOIN users u ON u.userNo  = p.userNo '
         + 'ORDER BY p.id  DESC;';
    connection.query(sql, (err, result) => {
        if (err) console.log("query is not excuted. select fail!\n" + err);
        else res.send(result);
    })

};

const insertProduct = (req, res, err) => {
    console.log(req.files)
    if(!req.files){ return res.status(400).json({success:false, err}) };

    let { userNo,category, title, price, desc } = req.body;
    sql = 'INSERT INTO products(userNo, pd_title, pd_desc, pd_category, pd_price) VALUES (?,?,?,?,?);';
    let values = [userNo, title, desc, category, price]
    console.log('values : ' , values);
    connection.query(sql, values, (err, result) => {
        if (err) {
            deleteImages(req.files);
            console.log("query is not excuted. insert to product fail!\n" + err)
            return res.json({success:false, err})
        }else{
            values = [];
            console.log("inserted_id : " , result.insertId);
            let inserted_id = result.insertId;
            req.files.forEach((e)=>{
                values.push([inserted_id, e.filename]);
            });
            console.log("images repo values : " , values)
            sql = 'INSERT INTO imagesRepo(pdId, imgName) VALUES ?;';
            connection.query(sql, [values], (err, result) => {
                if (err) {
                    deleteImages(req.files);
                    connection.rollback();
                    console.log("query is not excuted. insert to imagesRepo fail!\n" + err)
                    return res.json({success:false, err})
                }else{
                    connection.commit();
                    res.json({success:true, "result" : result});
                }
                
            })  
        } 
    });
};


const deleteImages = (files) => {
    files.forEach( (e) => {
        if(fs.existsSync("./imageRepository/"+ e.filename)){
            try {
              fs.unlinkSync("./imageRepository/" + e.filename);
              console.log("image delete  success");
            } catch (error) {
              console.log("image delete fail " , error);
            }
          }
    })
    
};


module.exports = { findAll , insertProduct}