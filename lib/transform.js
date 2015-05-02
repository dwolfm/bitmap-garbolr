'use strict';


exports.dodge = function(colorDict, scaler){
	if(!scaler) scaler = 1;
	for (var key in colorDict){
		colorDict[key] += scaler;
		colorDict[key] = this.checkRange(colorDict[key]);
	}
	return colorDict;
};

exports.burn = function(colorDict, scaler){
	if(!scaler) scaler = 1;
	for (var key in colorDict){
		colorDict[key] -= scaler;
		colorDict[key] = this.checkRange(colorDict[key]);
	};
	return colorDict;
}
exports.checkRange = function(x,min,max){
	if (!min) min = 0;
	if (!max) max = 255;
	if (x < min ) return min;
	if (x > max ) return max;
	return x;
};

