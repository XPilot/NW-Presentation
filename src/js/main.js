//
// Main app requirements
//

var qr = require('qr-image');
var gui = require('nw.gui');
var win = gui.Window.get();

// define a global presentation controller
var presentationController = function(dir) {
	if(Reveal) {
		Reveal[dir]();
	}
};

//
// Trigger when dom is ready
//

win.on('document-end', function(){
	var server = require('./node/server');
	
	server.init(presentationController);

	var serverUrl = 'http://' + server.getIP() + ':1337';
	var pngString = qr.imageSync('Take control -> ' + serverUrl, {type: 'png', size: 12});
	var pngBase64 = new Buffer(pngString, 'binary').toString('base64');

	var imgPlaceholder = document.getElementById('qrImage');
	imgPlaceholder.src = 'data:image/png;base64,' + pngBase64;

	Reveal.initialize({
		width: 1280,
		height: 720,
		maxScale: 1.5,

		controls: true,
		progress: true,
		history: true,
		mouseWheel: false,

		keyboard: true,

		autoSlide: 0,
		autoSlideStoppable: true,

		rollingLinks: false,
		center: false,
		loop: false,
		rtl: false
	});
});  
