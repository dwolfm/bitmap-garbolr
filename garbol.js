var Bitmap = require('./lib/bitmap.js');
var FSControler = require('./lib/fs_controller.js');
var ColorTranformer = require('./lib/transform.js');
var EventEmitter = require('events').EventEmitter;
var fsCntrl = new FSControler();
var ee = new EventEmitter();


var bitmap = null;

fsCntrl.loadBitmap('./img/town.bmp', function(err, data){
	if (err) throw err;
	ee.emit('bufferLoaded', data);	
});

ee.on('bufferLoaded', function(buffer){
	console.log('buffer loaded :)');
	bitmap = new Bitmap(buffer);
	ee.emit('transform');
});

ee.on('transform', function(){
	console.log('inititate transform');
	for (var i in bitmap.colorTable){
		var curCol = bitmap.colorTable[i];
		curCol = bitmap.colorTable[i]; 
		console.log(i);
		bitmap.colorTable[i] = ColorTranformer.invert(curCol);
		bitmap.colorTable[i] = ColorTranformer.setHue(curCol, 100);
	}
	ee.emit('write');
});

ee.on('write', function(){
	var finalBMP = bitmap.toBuffer();
	fsCntrl.writeBitmap(finalBMP, './img/testtest.bmp', function(err){
		if (err) throw err;
	});
	console.log('hurray');
});

function randomNum(){
	return Math.floor(Math.random() * 255);
}
