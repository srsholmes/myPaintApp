module.exports = function(ƒ) {

	var w = window;
	var d = document;
	//set up some variables
    	var canvas, ctx, drawing = false,

    	//Default coordinates
	    prevX = 0,
	    currX = 0,
	    prevY = 0,
	    currY = 0,
	    dotDrawing = false, 
	    color = 'black', 
	    lineWidth = 2;

	//Set up the canvas    

    function init() {
    	canvas = d.querySelector('canvas');
    	ctx = canvas.getContext('2d');
	    w = canvas.width;
	    h = canvas.height;
	    setUpColors();
	    eventListeners();
	}

    function eventListeners () {



    	//Set up the click events for the various colours.
    	var colorPallette = d.querySelectorAll('.color');

	    for (var i = 0; i < colorPallette.length; ++i) {
		  	colorPallette[i].addEventListener('click', function (e) {
		       var colorChosen = this.getAttribute('color');
		       colorChoose(colorChosen);
		    }, false);
		}

		//Save / clear

		var saveButton = d.querySelector('a.save');
		saveButton.addEventListener('click', saveImage, false);

		//Canvas events
	    canvas.addEventListener('mousemove', function (e) {
	        findPos('move', e)
	    }, false);
	    canvas.addEventListener('mousedown', function (e) {
	        findPos('down', e)
	    }, false);
	    canvas.addEventListener('mouseup', function (e) {
	        findPos('up', e)
	    }, false);
	    canvas.addEventListener('mouseout', function (e) {
	        findPos('out', e)
	    }, false);

	    

	}

	//Set up the color nubbins and put them in the DOM.
	function setUpColors () {
		var colors = [
			'red',
			'orange',
			'yellow',
			'blue',
			'green',
			'purple',
			'cyan',
			'brown',
			'black',
			'white'
		];

		var wrapper = d.querySelector('.colors-wrapper');

		for (i = 0; i < colors.length; i++) { 
		    var a = d.createElement('a');
		    a.className = colors[i] + ' color';
		    a.setAttribute('color', colors[i]); 
		    a.style.backgroundColor = colors[i];
		    wrapper.appendChild(a);
		}
	}

	function colorChoose(c) {
	    color = c;
	    if (color == 'white') lineWidth = 10;
	    else lineWidth = 2;
	}

	function findPos (i, e) {


	    //Deal with user just clicking and not moving mouse
	    if (i == 'down') {
	    	drawing = true;
	    	dotDraw(i,e);
	    }

	   	//Deal with the user letting go of mouse or going outside the canvas.
	    if (i == 'up' || i == 'out') {
	        flag = false;
	        drawing = false;
	    }

	    //If the user clicks and drags the mouse...

		if (i == 'move') {
	        if (drawing) {
	            prevX = currX;
	            prevY = currY;
	            currX = e.clientX - canvas.offsetLeft;
	            currY = e.clientY - canvas.offsetTop;
	            draw();
	        }
	    }
	}

	function dotDraw (i,e) {
		prevX = currX;
    	prevY = currY;
    	currX = e.clientX - canvas.offsetLeft;
    	currY = e.clientY - canvas.offsetTop;
    	dotDrawing = true;

		if (dotDrawing) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dotDrawing = false;
        }
	}

	function draw() {
	    ctx.beginPath();
	    ctx.moveTo(prevX, prevY);
	    ctx.lineTo(currX, currY);
	    ctx.strokeStyle = color;
	    ctx.lineWidth = lineWidth;
	    ctx.stroke();
	    ctx.closePath();
	}

	function saveImage () {
		console.log('save')
		var image = new Image(500, 500),
			controls = d.querySelector('.controls'),
			dataURL = canvas.toDataURL();

		image.className = ' saved-image';
		image.src = dataURL;
		controls.appendChild(image);

	}


    return {
        init: init
    };

}