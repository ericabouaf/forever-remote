/**
 * Exposes forever functions through a dnode interface
 */
var dnode = require('dnode'),
    net = require('net'),
    forever = require('forever'),
    utile = require('utile'), 
    path = require('path');

exports.createServer = function(port, host, cb) {
   
   forever.startServer(function () { 
      
      var server = net.createServer(function (c) {
         
         var d = dnode({
            list : function (s, cb) {
               forever.list(false, function(err, result){
                  cb(err, result);
               });
            },
            
            start: function(file, options, cb) {
               
               var uid = utile.randomString(4);
               
               var monitor = new forever.Monitor(file, {
                  uid: uid,
                  outFile: path.join(forever.config.get('root'), uid + '.log'),
                  errFile: path.join(forever.config.get('root'), uid + '-err.log'),
                  silent: true
               });
               
               monitor.start();
               
               var worker = new forever.Worker({
                  monitor: monitor,
                  sockPath: forever.config.get('sockPath'),
                  exitOnStop: true
               });
               
               worker.start(function (err) {
                  cb(err);
               });
            },
            
            stop: function(index, cb) {
               var ee = forever.stop(index); 
               // TODO: this seems to stop the whole forever-server process
               ee.on('stop', function() {
                  cb();
               });
            },
            
            tail: function(target, length, cb) {
               forever.tail(target, length, cb); 
            }
          });
          
          c.pipe(d).pipe(c);
       });
       
       server.listen(port, host);
       
    });
};
