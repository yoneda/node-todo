var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// 静的ファイル(image,css,javascript など)をpublicフォルダに格納するよ
// publicフォルダにtest.pngがあった場合、"http://localhost:3000/images/test.png"でアクセスできるようになる
app.use(express.static(__dirname+"/public"));

// MEMO: 下記の※1と※2のコードはなくても動いた。本当に必要なのだろうか
// urlencodedとjsonを初期化(※1)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// ejsを使う設定(※2)
app.set("views",__dirname + "/views");
app.set("view engine","ejs");

// トップ画面
app.get("/",function(req,res){
  res.render("index.ejs");
});

app.listen(3000);
