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
	    lineWidth = 2,
	    imageLoader = d.querySelector('.imageLoader');

	//Set up the canvas    
    function init() {
    	canvas = d.querySelector('canvas');
    	ctx = canvas.getContext('2d');
	    w = canvas.width;
	    h = canvas.height;
	    setUpColors();
	    eventListeners();
	}

	//Listen for events
    function eventListeners () {
    	//Set up the click events for the various colours.
    	var colorPallette = d.querySelectorAll('.color');

	    for (var i = 0; i < colorPallette.length; ++i) {
		  	colorPallette[i].addEventListener('click', function (e) {
		       var colorChosen = this.getAttribute('color');
		       colorChoose(colorChosen);
		    }, false);
		}

		//File upload
		imageLoader.addEventListener('change', imageUpload, false);

		//Save / clear
		var saveButton = d.querySelector('a.save'),
			clearButton = d.querySelector('a.clear');

		saveButton.addEventListener('click', saveImage, false);
		clearButton.addEventListener('click', clearImages, false);

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

	//Image uploader 
	function imageUpload(e) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var img = new Image();
			img.onload = function() {

				//To do, handle larger images, find aspect ratio and make the image smaller (with same aspect ratio)
				if (img.width > 500 || img.height >500 ) {
					alert('Please use an image of maximum 500x500');
					return;
				} else {
					console.log(img.width, img.height);
					//Center the uploaded image in the canvas
	            	var coOrds = calculatePos(img.width, img.height);
	           		ctx.drawImage(img,coOrds[0],coOrds[1]);
				} 	   			
			}
			img.src = e.target.result;
		}
		reader.readAsDataURL(e.target.files[0]); 
	}

	function calculatePos(w,h) {
    	var canvas = d.querySelector('canvas');
    		canvasWidth = canvas.width,
	    	canvasHeight = canvas.height,
	    	imageWidth = w,
	    	imageHeight = h;

	    var xPos = (canvasWidth - imageWidth)/2;
	    var yPos = (canvasHeight - imageHeight)/2;
	    return[xPos, yPos]
	}

	//To do, calculate the aspect ratio of image and resize accordingly.

	function calculateImage(image) {
		console.log(image);
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

	function findPos(i, e) {


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

	function dotDraw(i,e) {
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
		var image = new Image(500, 500),
			controls = d.querySelector('.upload-form'),
			dataURL = canvas.toDataURL();
		image.className = ' saved-image';
		image.style.display = 'block';
		image.src = dataURL;
		controls.appendChild(image);
	}

	function clearImages() {
		ctx.clearRect(0, 0, w, h);
        var images = d.querySelectorAll('.saved-image');
        for (var i = 0; i < images.length; ++i) {
		  	images[i].parentNode.removeChild(images[i]);
		}
	}


    return {
        init: init
    };

}