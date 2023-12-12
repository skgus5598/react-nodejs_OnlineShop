const express = require('express');
const router = express.Router();
// image process
const multer = require("multer");
//image upload setting
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      //fs.existsSync("./imageRepository/") ||
      //fs.mkdirSync("./imageRepository/", { recursive: !0 }),
      callback(null, "./imageRepository/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname+"_"+Date.now());
  }
});
const upload = multer({storage : storage});


const {findAll, insertProduct, getImageNamesByPdId, getDetailByPdId,
        deleteList, updateProduct, 
        getListByParam_a, getListByParam_b,
        getLikeList, getLike, insertLike, deleteLike, addViewCnt, bumpMyList} = require('../controller/productController');

router.get('/getList', findAll);
router.post('/upload', upload.array('file'), insertProduct);

router.get('/getLikeList/:userNo', getLikeList);
router.get('/getLike', getLike);
router.post('/insertLike', insertLike);
router.delete('/deleteLike', deleteLike);

router.put('/addViewCnt', addViewCnt);


router.post('/getListByParam_a/',getListByParam_a);
router.get('/getListByParam_b/', getListByParam_b);
router.get('/getDetailByPdId/:pdId', getDetailByPdId);

router.get('/getImageNames/:pdId', getImageNamesByPdId);
router.delete('/deleteList/:id', deleteList);
router.put('/updateProduct', updateProduct);
router.put('/bumpMyList', bumpMyList);





module.exports = router;