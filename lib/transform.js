'use strict';


exports.burn = function(colorDict, scaler){
	if(!scaler) scaler = 1;
	var result = {alpha:255};

	for (var key in colorDict){
		if (key != 'alpha') {
			result[key] = colorDict[key] + scaler;
			result[key] = this.checkRange(result[key]);
		}
	}
	return result;
};

exports.dodge = function(colorDict, scaler){
	if(!scaler) scaler = 1;
	var result = {alpha:255};
	for (var key in colorDict){
		if (key != 'alpha') {
			result[key] = colorDict[key] - scaler;
			result[key] = this.checkRange(result[key]);
		}
	}
	return result;
};

exports.checkRange = function(x,min,max){
	if (!min) min = 0;
	if (!max) max = 255;
	if (x < min ) return min;
	if (x > max ) return max;
	return x;
};

exports.invert = function(colorDict) {
	var result = {alpha:255};
	for (var key in colorDict){
		if (key != 'alpha'){
			result[key] = this.sumMod(colorDict[key], 128, 255);
		}
	}
	return result;
};

exports.setRGBA = function( r,g,b,a){
	return {red: this.checkRange(r), green:this.checkRange(g), blue: this.checkRange(b), alpha:this.checkRange(a)};
};

exports.sumMod = function(left, right, mod){
	return (left + right) % mod;
};

//rgb to hsl algorythm found on stack overflow http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion submitted by zeros-ones

exports.rgbToHsl = function(rgbObj) {
	var r = rgbObj.red;
	var g = rgbObj.green;
	var b = rgbObj.blue;
	r /= 255;
	g /= 255;
	b /= 255;

	var max = Math.max(r,g,b);
	var min = Math.min(r,g,b);
	var h, s, l = (min + max) / 2;
	
	if (max == min) {
		h = s = 0;
	} else {
		var d = max - min; 
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d; break;
			case g: h = 2 + ((b - r) / d); break;
			case b: h = 4 + ((r - g) / d); break;
		}
		h *= 60;
		if (h < 0) h += 360;
	}
	return {hue: h, saturation: s, lightness: l};
};


// hsl to hsv algorythm found from http://ariya.blogspot.com/2008/07/converting-between-hsl-and-hsv.html
exports.hslToHsv = function(hslObj){
	var h = hslObj.hue;
	var lightness = hslObj.lightness * 2;
	var mult =  (lightness <= 1)? lightness: 2 - lightness;
	var sat = hslObj.saturation * mult;
	var v = (lightness + sat) / 2;
	var s = (2 * sat) / (lightness + sat);
	return { h: h, s: s, v:v};
};

exports.hslToRgb = function(hslObj){
	var hsvObj = this.hslToHsv(hslObj);
	console.log(hsvObj);
	return this.hsvToRgb(hsvObj);
};

// hsv to rgb alorython found on stack overflow http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion submitted by Erik
exports.hsvToRgb = function (hsvObj){
	var h = hsvObj.h;
	var s = hsvObj.s;
	var v = hsvObj.v;
    var step = (h/360) / (1 / 6),
     pos = step - Math.floor(step), // the hue position within the current step
     m = (Math.floor(step) % 2) ? (1 - pos) * v : pos * v, // mix color value adjusted to the brightness(v)
     max = 1 * v,
     min = (1 - s) * v,
     med = m + ((1 - s) * (v - m)),
     r, g, b;
    switch (Math.floor(step))
    {
        case 0:
            r = max;
            g = med;
            b = min;
            break;
        case 1:
            r = med;
            g = max;
            b = min;
            break;
        case 2:
            r = min;
            g = max;
            b = med;
            break;
        case 3:
            r = min;
            g = med;
            b = max;
            break;
        case 4:
            r = med;
            g = min;
            b = max;
            break;
        case 5:
            r = max;
            g = min;
            b = med;
            break;
    }
	return {red: Math.round(r*255), green: Math.round(g*255), blue: Math.round(b*255), alpha: 255};
};
