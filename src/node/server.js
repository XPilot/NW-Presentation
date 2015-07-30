var http = require('http');
var htmlPackage = {};
var fs = require('fs');
var wifi = require('wifi-name');

var ip =require('ip');

var allowAccessControl = true;

var handlers = {
	slideHandler: {},
	onRequest: function(request, response) {
		//response.end('It Works!! Path Hit: ' + request.url);

		var cmd = request.url.slice(1);

		switch (cmd) {
			case 'left': handlers.slideHandler('left'); break;
			case 'right': handlers.slideHandler('right'); break;
			case 'up': if(allowAccessControl) { handlers.slideHandler('up'); } break;
			case 'down': if(allowAccessControl) { handlers.slideHandler('down'); } break;
			case 'stop': allowAccessControl = false; break;
		}

		if(cmd === 'destroy') {
			request.connection.unref(); 
			localServer.close(); 
			return void (0);
		}

		response.writeHead(200,{"Content-Type":"text/html"})
		if(cmd === 'admiN') {
			response.end(htmlPackage.admin);
		}
		else {
			response.end(htmlPackage.client);
		}
	}
};

var localServer = null;

module.exports = {
	init: function (slideHandler) {
		localServer = http.createServer(handlers.onRequest);
		localServer.listen(1337);

		// load client page
		fs.readFile('./src/node/controller.html', 'utf8', function(err, data){
			if(err) {
				console.log(err);
			}

			htmlPackage.client = data.toString('utf8');
		});

		// load admin page
		fs.readFile('./src/node/controllerAdmin.html', 'utf8', function(err, data){
			if(err) {
				console.log(err);
			}

			htmlPackage.admin = data.toString('utf8');
		});


		if(slideHandler) {
			handlers.slideHandler = slideHandler;
		}
	},
	
	getIP: function() {
		return ip.address();
	},

	getSSID: function(domElement){
		wifi(function(err, name) {
			if(err) {
				domElement.innerHTML = 'Unable to get WIFI address';
			}

			domElement.innerHTML = name;
		});	
	}
}