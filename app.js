var express = require('express');
var bodyParser = require("body-parser");
var NeDB = require("nedb");
var app = express();

// 静的ファイル(image,css,javascript) をpublic フォルダに格納。
// test.pngにアクセスしたいときは、
// http://localhost:3000/test.png
app.use(express.static(__dirname+"/public"));

// bodyParser の初期化
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// ejs の初期化
app.set("views",__dirname + "/views");
app.set("view engine","ejs");

// nedb のテスト
var db = {}
db.users = new NeDB({filename:"testfile"});
db.users.loadDatabase();
db.users.insert({name:"hoge"});
db.users.insert({name:"fuga"});
db.users.insert({name:"uga"});

// トップ画面
app.get("/",function(req,res){
  res.render("index.ejs");
});

app.listen(3000);
