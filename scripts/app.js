var ƒ = require('hdom');

var Painter = require('./modules/painter')(ƒ);
var isIE = /Trident\/(\d)/g.test(navigator.userAgent);

ƒ(function() {
   
   Painter.init();
     
});