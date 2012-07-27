
var createClient = require('../lib/client.js').createClient;

createClient(5004, "localhost", function(forever) {
   
   forever.list(null , function (err, processes) {
      console.log(err, processes);
      forever.end();
   });
   
});

