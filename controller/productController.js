const connection = require('../db_info');
const fs = require('fs');


let sql = '';

const findAll = (req, res) => {
    const { pageNum, limit }  = req.query;
    sql = 'SELECT p.* ,'
            +     'u.userId ,'
            +     'u.userRegion ,'
            +     'u.userArea ,'
            +     '(SELECT ir.imgName '
            +     'FROM imagesRepo ir '
            +     'WHERE p.id = ir.pdId '
            +     'LIMIT 1) as imgName, '
            +     '(SELECT COUNT(*) '
            +     'FROM likeHit li '
            +     'WHERE li.pd_id = p.id '
            +     ') as likeTot '
         + 'FROM products p '
         + 'INNER JOIN users u ON u.userNo  = p.userNo '
         + 'WHERE 1 = 1 '
         + 'ORDER BY p.update_date  DESC '
         + `LIMIT ${pageNum}, ${limit} ;` ;
    connection.query(sql, (err, result) => {
        if (err) console.log("query is not excuted. select fail!\n" + err);
        else res.send(result);
    })
};

const getLikeList = (req, res) => {
    const userNo = req.params.userNo;
    sql = 'SELECT p.* ,'
            +     'u.userId ,'
            +     'u.userRegion ,'
            +     'u.userArea ,'
            +     '(SELECT ir.imgName '
            +     'FROM imagesRepo ir '
            +     'WHERE p.id = ir.pdId '
            +     'LIMIT 1) as imgName, '
            +     '(SELECT COUNT(*) '
            +     'FROM likeHit li '
            +     'WHERE li.pd_id = p.id '
            +     ') as likeTot '
         + 'FROM products p '
         + 'INNER JOIN users u ON u.userNo  = p.userNo '
         + 'WHERE 1 = 1 '
         + `AND p.id IN ( SELECT pd_id FROM likeHit WHERE user_no = ${userNo}  ) `
         + 'ORDER BY p.update_date  DESC '
     connection.query(sql, (err, result) => {
        console.log("action sql : ", sql);
        if (err) console.log("query is not excuted. getLikeList fail!\n" + err);
        else res.send(result);
    }) 
}

const getLike = (req, res) => {
    const { pdId, userNo }  = req.query;
    sql = 'SELECT IF(EXISTS( ' 
             + `SELECT like_hit FROM likeHit WHERE pd_id=${pdId} AND user_no = ${userNo} `
        + '), 1, 0 ) AS result; ' ;
    connection.query(sql, (err, result) => {
        console.log("action sql : ", sql);
        if (err) console.log("query is not excuted. getLike fail!\n" + err);
        else res.send(result[0]);
    })    
}

const insertLike = (req, res) => {
    const { pdId, userNo } = req.body;
    sql = 'INSERT INTO likeHit(pd_id, user_no, like_hit) '
        + `VALUES ( ${pdId}, ${userNo}, 1 );` ;
    connection.query(sql, (err, result) => {
        console.log("action sql : ", sql);
        if (err) console.log("query is not excuted. insertLike fail!\n" + err);
        else res.send(result);
    })
}

const deleteLike = (req, res) => {
    const { pdId, userNo } = req.query;
    sql = `DELETE FROM likeHit WHERE pd_id = ${pdId} AND user_no = ${userNo} ;`; 
    connection.query(sql, (err, result) => {
        console.log("action sql : ", sql);
        if (err) console.log("query is not excuted. deleteLike fail!\n" + err);
        else res.send(result);
    })
}

const addViewCnt = (req, res) => {
    let pdId = req.body.pdId
    sql = `UPDATE products SET pd_views = pd_views + 1 WHERE id = ${pdId} ; ` ;
    connection.query(sql, (err, result) => {
        console.log("action sql : ", sql);
        if (err) console.log("query is not excuted. addViewCnt fail!\n" + err);
        else res.send(result);
    })
}

//post 
const getListByParam_a = (req, res) => {
    console.log('param : ' , req.body);
    let { category, city, town } = req.body;
    let conditions = '';
    if(category != 0){
        conditions += `AND p.pd_category = '${category}' `
    }
    if(city != 0){
        conditions += `AND u.userRegion = '${city}' `
        if(town != 0){
            conditions += `AND u.userArea = '${town}' `
        }
    }
    sql = 'SELECT p.* ,'
        +     'u.userId ,'
        +     'u.userRegion ,'
        +     'u.userArea ,'
        +     '(SELECT ir.imgName '
        +     'FROM imagesRepo ir '
        +     'WHERE p.id = ir.pdId '
        +     'LIMIT 1) as imgName, '
        +     '(SELECT COUNT(*) '
        +     'FROM likeHit li '
        +     'WHERE li.pd_id = p.id '
        +     ') as likeTot '
        + 'FROM products p '
        + 'INNER JOIN users u ON u.userNo  = p.userNo '
        + 'WHERE 1=1 '
    if(conditions != ''){   sql += conditions  }
    sql += 'ORDER BY p.update_date  DESC;';

    connection.query(sql, (err, result) => {
        console.log("action sql : ", sql);
        if (err) console.log("query is not excuted. getUploadListById fail!\n" + err);
        else res.send(result);
    })
}

//get :id & :keyword
const getListByParam_b = (req, res) => {
    const { userNo, keyword }  = req.query;
    console.log('getListByParam_b(params) : ' , req.query);
    sql = 'SELECT p.* ,'
        +     'u.userId ,'
        +     'u.userRegion ,'
        +     'u.userArea ,'
        +     '(SELECT ir.imgName '
        +     'FROM imagesRepo ir '
        +     'WHERE p.id = ir.pdId '
        +     'LIMIT 1) as imgName, '
        +     '(SELECT COUNT(*) '
        +     'FROM likeHit li '
        +     'WHERE li.pd_id = p.id '
        +     ') as likeTot '
    + 'FROM products p '
    + 'INNER JOIN users u ON u.userNo  = p.userNo '
    + 'WHERE 1=1 '
    if(userNo != null || userNo != undefined){
        //sql += `AND u.userNo = (SELECT userNo FROM users WHERE userId = '${userId}' ) `
        sql += `AND u.userNo = '${userNo}' `
    }
    if(keyword != null || keyword != undefined){
        sql += `AND p.pd_title LIKE '%${keyword}%' OR p.pd_desc LIKE '%${keyword}%' `
    }
    sql+= 'ORDER BY p.update_date  DESC;';

    connection.query(sql,(err, result) => {
        console.log("sql : " + sql)
        if (err) console.log("query is not excuted. getUploadListById fail!\n" + err);
        else res.send(result);
    })
}

const getDetailByPdId = (req, res) => {
    const pdId =  req.params.pdId;

    sql = 'SELECT p.* ,'
        +     'u.userId ,'
        +     'u.userRegion ,'
        +     'u.userArea ,'
        +     '(SELECT ir.imgName '
        +     'FROM imagesRepo ir '
        +     'WHERE p.id = ir.pdId '
        +     'LIMIT 1) as imgName, '
        +     '(SELECT COUNT(*) '
        +     'FROM likeHit li '
        +     'WHERE li.pd_id = p.id '
        +     ') as likeTot '
    + 'FROM products p '
    + 'INNER JOIN users u ON u.userNo  = p.userNo '
    + `WHERE p.id = ${pdId}  ; `;

    connection.query(sql,(err, result) => {
        console.log("sql : " + sql)
        if (err) console.log("query is not excuted. getDetailByPdId fail!\n" + err);
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

const bumpMyList = (req, res) => {
    let pdId = req.body.pdId
    sql = `UPDATE products SET update_date  = NOW() WHERE id = ${pdId} ; ` ;
    connection.query(sql, (err, result) => {
        console.log("action sql : ", sql);
        if (err) console.log("query is not excuted. bumpMyList fail!\n" + err);
        else res.send(result);
    })
}


module.exports = { findAll , insertProduct, getImageNamesByPdId, 
                     deleteList, updateProduct, getDetailByPdId,
                    getListByParam_a, getListByParam_b,
                    getLikeList, getLike, insertLike, deleteLike,
                    addViewCnt, bumpMyList}