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

//DB Router
const productRoutes = require('./routes/products');
app.use(productRoutes);



app.listen(5000, function(){
    console.log('listening on 5000')
});

//images
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