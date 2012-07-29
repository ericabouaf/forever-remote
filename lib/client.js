/**
 * Simulates a forever-like API which connects to a distant forever-dnode server
 */


var dnode = require('dnode'),
	net = require('net');



exports.createClient = function(port, host, cb) {

	var d = dnode();
	d.on('remote', function (remote) {

		cb(null, {

			start: function(file, options, cb) {
				remote.start(file, options, cb);
			},

			list: function(p, cb) {
				remote.list(p, cb);
			},

			end: function() {
				d.end();
			},

			stop: function(index, cb) {
				remote.stop(index, cb);
			},

			tail: function(target, length, cb) {
				remote.tail(target, length, cb); 
			}

		});
	   	
	});
	
	d.on('error', function() {
		cb(null);
	});

	var c = net.connect(port, host);
	
	
	c.on('error', function(e) {
		cb(e, null);
	});
	
	c.pipe(d).pipe(c);

};
