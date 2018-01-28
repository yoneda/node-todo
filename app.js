var sys = require("sys");
var http = require("http");
var server = http.createServer(
  function(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("helloworld");
    response.end();
  }
).listen(3000);

sys.log("server running at http://localhost:3000/");
