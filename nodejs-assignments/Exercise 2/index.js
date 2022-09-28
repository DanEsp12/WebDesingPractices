const fs = require('fs');

fs.readFile("file1.txt", "utf8", function(err, data){
	console.log(data);
});