var interval = null;
var fs = require('fs');

module.exports = {
	beProud: function(cb) {

		cb = cb || function() {};

		fs.readFile('./motd/mascot.ascii', function(err, data) {
			if(err) {
				console.log('Could not read ascii file!', err);
				return cb(err);
			}

			var currentLine = 0;
			var lineArray = data.toString().split('\n');

			interval = setInterval(function() {
				if(currentLine < lineArray.length) {
					printl(lineArray[currentLine]);
					currentLine++;
				}
				else {
					console.log('\n\n', 'Getting NPM Dependencies!');
					clearInterval(interval);
					cb();
				}
			}, 15);

		});

	}
}

function printl(line) {
	console.log(line);
}