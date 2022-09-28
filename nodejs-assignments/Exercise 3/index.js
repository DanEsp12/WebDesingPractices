const fs = require('fs');

let data = 'Hello World!';

fs.writeFile('helloworld.txt', data, err => {
	if(err){
		console.error(err);
	}
	else{
		console.log("File written successfully!");
	}
});