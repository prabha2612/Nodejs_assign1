const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes);

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});