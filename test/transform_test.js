'use strict';

var transform = require('../lib/transform.js');
var expect = require('chai').expect;

describe('transfrom.js', function(){
	var testColor = {red: 110, green: 200, blue:222, alpha:1};

	console.log('org obj: ' + testColor);
	console.log('dodge 1: ' + transform.dodge(testColor));
	console.log('dodge 100: ' + transform.dodge(testColor, 100));
});
