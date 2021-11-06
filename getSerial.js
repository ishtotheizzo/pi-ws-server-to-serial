var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyGS0', {
   baudRate: 115200,
   dataBits: 8,
   parity: 'none',
   stopBits: 1,
   flowControl: false
});

var ByteLength = require('@serialport/parser-byte-length');
var parser = port.pipe(new ByteLength({length: 16}));

function doSomething(){
	port.write(new Date().getTime().toString(), function(err){
		if(err){
			console.log("e");
		}
	console.log("here");

	})
}

parser.on('data', function (data) {
    var dataUTF8 = data.toString('utf-8');
    if (dataUTF8.substring(0, 1) === ":") {
        console.log('Data: ' + data);
    }
});

setInterval(doSomething,1000);
