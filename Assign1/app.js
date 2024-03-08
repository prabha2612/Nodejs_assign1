// Import the 'http' module
const http = require("http");

// Import the request handling logic from the 'routes' module
const routes = require("./routes");

// Create an HTTP server using the request handling logic
const server = http.createServer(routes);

// Start the server and make it listen on either the PORT environment variable or port 3000
server.listen(process.env.PORT || 3000, () => {
  // Log a message to indicate that the server is running and listening on port 3000
  console.log("Server running on port 3000");
});
