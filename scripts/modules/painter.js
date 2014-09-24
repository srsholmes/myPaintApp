module.exports = function(ƒ) {

	var w = window;
	var d = document;
	//set up some variables
    	var canvas, ctx, flag = false,
	    prevX = 0,
	    currX = 0,
	    prevY = 0,
	    currY = 0,
	    dot_flag = false, 
	    colour = "black", 
	    y = 2;

	//Set up the canvas    

    function init() {

    	canvas = d.querySelector('canvas');
    	

    }

    return {
        init: init
    };

}