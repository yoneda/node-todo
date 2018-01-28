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

// nedb の初期化
var db = {}
db.users = new NeDB({filename:"taskfile"});
db.users.loadDatabase();

// トップ画面
app.get("/",function(req,res){
  db.users.find({}, function (err, docs) {
    res.render("index.ejs",{docs:docs});
  });
});

app.post("/add",function(req,res){
  var task = req.body.task;
  var checked = 0;
  db.users.insert({task:task,checked:checked});
  db.users.find({}, function (err, docs) {
    res.render("index.ejs",{docs:docs});
  });
});

app.post("/delete",function(req,res){
  var delete_id = req.body.delete_id;
  db.users.remove({_id:delete_id},{},function(err,num){
    console.log("%d task deleted!",num);
  });
  db.users.find({}, function (err, docs) {
    res.render("index.ejs",{docs:docs});
  });
});

app.listen(3000);
