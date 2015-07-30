//
// Main app requirements
//

var qr = require('qr-image');
var gui = require('nw.gui');
var win = gui.Window.get();

gui.Screen.Init();

var currentScreen = 0;
var screens = gui.Screen.screens;

win.setVisibleOnAllWorkspaces(true);

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

	var ssidPlaceholder = document.getElementById('wifiName');
	server.getSSID(ssidPlaceholder);

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

	window.addEventListener('keydown', function(ev){
		if(ev.keyCode === 186) {
			//win.leaveFullscreen();
			win.moveTo(screens[0].bounds.x, screens[0].bounds.y);
		}
		else if(ev.keyCode === 222) {
			//win.leaveFullscreen();
			win.moveTo(screens[1].bounds.x, screens[1].bounds.y);
		}

		if(ev.keyCode === 27) {
			win.close();
		};
	}, true);
});  


