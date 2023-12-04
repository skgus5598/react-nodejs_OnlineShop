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
const getListByCity = (req, res) => {
    console.log('param : ' , req.params.param);
    let param = req.params.param;
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
    if(param == 0){
         sql += 'ORDER BY p.id  DESC;';
    }else{
       sql += 'WHERE u.userRegion = ? '
       sql += 'ORDER BY p.id  DESC;';
    }
    connection.query(sql, param, (err, result) => {
        console.log("action sql : ", sql)
        if (err) console.log("query is not excuted. getUploadListById fail!\n" + err);
        else res.send(result);
    })
}

const getUploadListById = (req, res) => {
    console.log('userId : ' , req.params.userId);
    let param = req.params.userId;
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
    + 'WHERE u.userNo = (SELECT userNo FROM users WHERE userId = ?)'
    + 'ORDER BY p.id  DESC;';
    connection.query(sql, param, (err, result) => {
        if (err) console.log("query is not excuted. getUploadListById fail!\n" + err);
        else res.send(result);
    })
}

const deleteList = (req, res) => {
    console.log('boardID : ', req.params.id);
    let param = req.params.id;
    sql = 'SELECT imgName as filename FROM imagesRepo WHERE pdId= ?'
    connection.query(sql, param, (err, result) => {
        if (err) console.log("query is not excuted. select imagesRepo fail!\n" + err);
        else{
            console.log("result imagename : ", result)
            let files = result; 
            sql = 'DELETE FROM products WHERE id = ?';
            connection.query(sql, param, (err, result) => {
              if (err) console.log("query is not excuted. deleteList fail!\n" + err);
              else{
                deleteImages(files);
                res.send(result)
              }
            })  
        }
    })

}

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

const getImageNamesByPdId = (req, res) => {
    console.log('pdId : ' , req.params.pdId)
    sql = 'SELECT imgName FROM imagesRepo WHERE pdId = ?';
    let param = req.params.pdId;
    connection.query(sql, param, (err, result) => {
        if (err) console.log("query is not excuted. getImageNamesByPdId fail!\n" + err);
        else res.send(result);
    })
}

const updateProduct = (req, res) => {
    let { userNo,category, title, price, desc, filename, id } = req.body;
    console.log('id : ', req.body.id);
    console.log('title : ', req.body.title)
    console.log('price : ', req.body.price)
    console.log('desc : ', req.body.desc)
    console.log('filename : ', req.body.filename)

    let values = [title, desc, category, price, id]
    console.log('values? ' , values);
    sql = 'UPDATE products SET '
                +'pd_title = ? ,'
                +'pd_desc = ? ,'
                +'pd_category = ? ,'
                +'pd_price = ? '
          +'WHERE id = ?  ;';
    connection.query(sql, values, (err, result) => {
        if (err) console.log("query is not excuted. UPDATE products fail!\n" + err);
        else{
            if(filename !== undefined){
                sql = 'DELETE FROM imagesRepo WHERE pdId = ? AND imgName = ?';
                values = [id, filename];
                connection.query(sql, values, (err, result) => {
                    if (err) {
                        console.log("query is not excuted. DELETE imageRepo fail!\n" + err)
                        connection.rollback();
                        return res.json({success:false, err})
                    }else{
                        deleteImages(filename)
                        //connection.commit();
                        res.json({success:true, "result" : result});
                }
            })
            }else{
                res.json({success:true, "result" : result});
            }
            
        }
    })      
}



module.exports = { findAll , insertProduct, getImageNamesByPdId, getUploadListById, deleteList, updateProduct, getListByCity}