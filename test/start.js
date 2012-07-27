
var createClient = require('../lib/client.js').createClient;

createClient(5004, "localhost", function(forever) {
   
   forever.start(["node", "../test/worker2.js", "ici un premier param", "ici un second"], {} , function (err) {
   //forever.start("../test/worker1.js", {} , function (err) {
      console.log("started !");
      forever.end();
   });
   
});

