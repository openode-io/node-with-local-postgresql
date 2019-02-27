
/**
 * Module dependencies.
 */

var app = require('./app');
var http = require('http');

const { Client } = require('pg')

setTimeout(() => {
  const client = new Client({
    user: 'postgres',
    host: 'postgres',
    database: 'mydbname',
    password: 'postgres',
    port: 5432
  })

  client.connect()

  client.query('CREATE TABLE if not exists mytable ( name text )', (err, res) => {
    console.log(err, res)
    client.query(`INSERT INTO mytable (name) VALUES ('hi')`, (err, res) => {
      console.log(err, res)
      client.query('SELECT * FROM mytable', (err, res) => {
        console.log(err, res)
        client.end()
      })

    })
  })
}, 5000)

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3002');
app.set('port', port);

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}
