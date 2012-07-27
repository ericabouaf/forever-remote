var createClient = require('../lib/client.js').createClient;

createClient(5004, "localhost", function(forever) {

	forever.stop(0 , function (err, processes) {
		console.log("Done !");
		forever.end();
	});


});









