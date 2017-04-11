const fs = require('fs');
const path = __dirname + "/notes.json"

let output = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', function(err, data) {
			if (err) {
				reject(err); 
				return;
			}
			var obj = JSON.parse(data);
			resolve(obj);
		});
	})
}

let save = (data) => {
	return new Promise((resolve, reject) => {
		data = JSON.stringify(data, null, 4);
		fs.writeFile(path, data, function(err) {
			if (err) {
				reject(err);
				return;
			}
			resolve("Done\n" + data);
		});
	})
}

module.exports = {
	output: output,
	save: save
}



