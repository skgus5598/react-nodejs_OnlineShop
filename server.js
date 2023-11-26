const express = require('express');
const app = express()
const path = require('path')
const fs = require('fs');

// ajax
app.use(express.json());
const cors = require('cors');
let corsOptions = {
    origin: "*",
    credential: true 
}
app.use(cors(corsOptions));

/*
// image process
const multer = require("multer");


//image upload setting
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("storage : " + file.filename),
      //fs.existsSync("./imageRepository/") ||
      // fs.mkdirSync("./imageRepository/", { recursive: !0 }),
      callback(null, "./imageRepository/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname+"_"+Date.now());
  }
});
const upload = multer({storage : storage});

//https://blog.naver.com/s_holmes25/222117471570
  //upload test
  app.post('/upload', upload.array('file'), (req, res, err) => {
    let { title, price, desc } = req.body;
    console.log("files", req.files);
    console.log("title :" , title)
    console.log("price :" , price)
    console.log("desc :" , desc)
    if(!req.files){
      return res.status(400).json({success:false, err})
    }else{
      //req.files안에 있는 path, filename 담아서ㅓ 리턴해줘야함. 업로드/삭제는 게시글 등록할때 한번에 하는걸로 ㅎㅏ자
      req.files.forEach((e)=>{
        console.log("e filename : " + e.filename);
      })
      return res.status(200).json({success:true})

    }
});
*/
 /* it works
  app.post('/image', upload.array('file'), (req, res, err) => {
      console.log("files", req.files);
      console.log("body", req.body);

      if(!req.files){
        return res.status(400).json({success:false, err})
      }else{
        //req.files안에 있는 path, filename 담아서ㅓ 리턴해줘야함. 업로드/삭제는 게시글 등록할때 한번에 하는걸로 ㅎㅏ자
        let obj = {};
        req.files.forEach((e)=>{
          console.log("e filename : " + e.filename);
        })
       // return res.json({success: true, filePath: req.files.path , fileName: req.files.filename})  

      }
  });
*/
  // app.delete('/image', (req, res) => {
  //   console.log("filename : " + req.filename)
  //   if(fs.existsSync("./imageRepository/"+ req.filename)){
  //     try {
  //       fs.unlinkSync("/uploads" + filename);
  //       console.log("image delete");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // });

  

//db router
const productRoutes = require('./routes/products');
app.use(productRoutes);





app.listen(5000, function(){
    console.log('listening on 5000')
});

//images
//app.use('/images/:imageName', express.static('./imageRepository/'));
app.get("/images/:imageName", (req, res) => {
  res.sendFile(__dirname + "/imageRepository/" + req.params.imageName);
})


/*
app.use(express.static(path.join(__dirname, 'managecomp_pj/build')));



app.get('/detail', function(req, res){
    res.sendFile(path.join(_dirname, 'managecomp_pj/build/index.html'));
})


app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'managecomp_pj/build/index.html'))
})
*/