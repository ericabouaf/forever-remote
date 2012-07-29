# Forever remote



## install

````sh
$ [sudo] npm install forever-remote -g
````


## Create a server programmatically

````javascript
var createServer = require('forever-remote').createServer;

createServer(5004);
````



## Using a remote client

````javascript
var createClient = require('../lib/client.js').createClient;

createClient(5004, "localhost", function(err, forever) {
   
   // use forever commands here
   
});
````


## forever-remote API

#### List processes

````javascript
forever.list(null , function (err, processes) {
	console.log(err, processes);
	forever.end();
});
````


#### start a new process

````javascript
forever.start(["node", "test/worker2.js", "ici un premier param", "ici un second"], {} , function (err) {
	console.log("started !");
	forever.end();
});
````



#### stop a  process

````javascript
forever.stop(0 , function (err, processes) {
	console.log("Done !");
	forever.end();
});
````


#### tail log
	
````javascript
forever.tail( 0, 50 , function (err, processes) {
	console.log(err, processes);
	forever.end();
});
````

