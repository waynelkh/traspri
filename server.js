// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module
var bodyParser = require("body-parser");
var cors = require('cors');
//initialize translation
var credentials = {
  clientId: 'Traspri',     /* Client ID from the registered app */
  clientSecret: 'QE/5f0OLfkVDJ7xAzdXMWHdwhhnd8WiV0rPQvJHzsNE='  /* Client Secret from the registered app */
}
var translator = require('bingtranslator');

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
// create application/json parser
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));
httpApp.use(bodyParser.urlencoded({ extended: false }));
httpApp.use(cors());
httpApp.post('/translation',function(req,res){
    //console.log(req.query.from+","+req.query.to+","+req.query.text);
  //  console.log(req);
    text = req.body.text;
    ft = req.body.ft;
    to = req.body.to;
  //  console.log(text+","+from+","+to);
    translator.translate(credentials, text, ft, to, function(err,translated){
        if (err) {
            console.log('error', err);
            res.send("error");
        }
 //     console.log(translated);
        res.send(translated);
    });
});
// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);