// initializing the batscream-pi server

var http = require("http");
var Gpio = require('onoff').Gpio;
var pir = new Gpio(17, 'in');
var batScreamServer = http.createServer();
var listener = function(request, response) {

  var method = request.method;
  var url = request.url;
  var i = 0;
  var count = 0;

  if (method === 'GET' && url === '/pir') {

    console.log("Processing request");
    request.on("data",function(){})

    request.on("end", function() {
      response.write("Response from BatScream PI - PIR motion Sensor at Batscream's table:<br/>");
      console.log("Querying sensor");
      while (i < 100) {
        count += pir.readSync();
        i++;
      }
      console.log("Writing response");
      response.end("Sampling latest 100 sensor inputs: " + count);
    })

    request.on("error", function(err) {
      console.log(err);
    })


    response.on("error", function(err) {
      console.log("error");
    })


  } else {
    response.statusCode = "404";
    response.end("Batscream does not serve what you want !! :)");
  }
}

batScreamServer.on("request", listener);

batScreamServer.listen(8080, function() {
  console.log("BatScream Server Initiated");
});


