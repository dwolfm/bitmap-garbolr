var Bitmap = require('./lib/bitmap.js');
var FSControler = require('./lib/fs_controller.js');
var ColorTranformer = require('./lib/transform.js');
var EventEmitter = require('events').EventEmitter;
var fsCntrl = new FSControler();
var ee = new EventEmitter();


var bitmap = null;

fsCntrl.loadBitmap('./img/bitmap1.bmp', function(err, data){
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
	for (var index in bitmap.colorTable){
		bitmap.colorTable[index] = ColorTranformer.invert(bitmap.colorTable[index]);
		console.log(bitmap.colorTable[index]);
	}
});
