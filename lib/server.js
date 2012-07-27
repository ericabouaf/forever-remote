/**
 * Exposes forever functions through a dnode interface
 */
var dnode = require('dnode'),
    net = require('net'),
    forever = require('forever');

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
               /*console.log("server received", file);
               console.log(process.cwd() );
               // TODO: try / catch ?
               var mainProcess = forever.start(file, options); 
               forever.startServer(mainProcess, function() {
                  cb();
               });*/
               
               var utile = require('utile'), path = require('path');
               
               var uid = utile.randomString(4);
               
               var monitor = new forever.Monitor(file, {
                  uid: uid,
                  outFile: path.join(forever.config.get('root'), uid + '.log'),
				  errFile: path.join(forever.config.get('root'), uid + '-err.log'),
                  silent: true
               });
               
               
               monitor.start();
               
               /*monitor.on('start', function (_, data) {
                  console.log('Forever process started ' + file);
                  cb();
               });*/
            
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
   
      server.listen(port);
   
   });
};
