'use strict';

var transform = require('../lib/transform.js');
var expect = require('chai').expect;

describe('transfrom.js', function(){
	var testColor = {red: 30, green: 20, blue:25, alpha:255};

	console.log( testColor);
	console.log('dodge 1');
  	console.log(transform.dodge(testColor));
	console.log('dodge 100');
	console.log(transform.dodge(testColor, 100));
	console.dir('invert');
  	console.log(transform.invert(testColor));
	console.log('burn 1');
	console.log(transform.burn(testColor));
	console.log('burn 100');
	console.log(transform.burn(testColor, 100));
	console.log(transform.setRGBA(55,33	,55,255));
	var hsl = transform.rgbToHsl(testColor);
	console.log('rgbToHsl');
	console.log(hsl);
	console.log('hslToRgb');
	console.log(transform.hslToRgb(hsl));
});

