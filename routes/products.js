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






const {findAll, insertProduct} = require('../controller/productController');

router.get('/getList', findAll);
router.post('/upload', upload.array('file'), insertProduct);





module.exports = router;