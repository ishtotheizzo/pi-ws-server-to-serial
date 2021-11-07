var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyGS0', {
   baudRate: 115200,
   dataBits: 8,
   parity: 'none',
   stopBits: 1,
   flowControl: false
});


function write(str){
	port.write(str + '\n',function(err){
		if(err){
			console.log("e");
		}
	console.log("here");

	})
}

const express = require("express");
const app = express();
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000})

wss.on('connection', ws => {
  ws.on('message', message => {
	var x = `${message}`;
	  console.log(x)
	  write(x)
	  try{
		    db.collection("dataWS").insert(JSON.parse(x), function(err, result){
		    });
	  }
	  catch(e){}
  })
})
