// Import the 'fs' module for file system operations
const fs = require("fs");

// Define a request handler function
const requesthandler = (req, res) => {
  // Extract the URL and HTTP method from the request
  const url = req.url;
  const method = req.method;

  // Handle requests to the root URL
  if (url === "/") {
    // Send a simple HTML response
    res.write("<html>");
    res.write("<head><title>Assignment1</title></head>");
    res.write("<body><h1>This is MY NodeJs Assignment1</h1></body>");
    res.write("</html>");
    return res.end();
  }

  // Handle requests to create a user
  if (url === "/create") {
    // Send a form to create a user
    res.write("<html>");
    res.write("<head><title>Create a User</title></head>");
    res.write(
      '<body><form action="/add" method="POST"><input type="text" name="user" placeholder="Enter user name"><button type="submit">Add User</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  // Handle POST requests to add a user
  if (url === "/add" && method === "POST") {
    // Parse the request body to extract the username
    const body = [];
    req.on("data", (user) => {
      body.push(user);
    });
    req.on("end", () => {
      const bodyString = Buffer.concat(body).toString();
      const userName = bodyString.split("=")[1];
      console.log(bodyString);

      // Append the username to the users.txt file
      fs.appendFile("users.txt", userName + "\n", (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/users");
        return res.end();
      });
    });
  }

  // Handle requests to view users
  if (url === "/users") {
    // Read the contents of the users.txt file
    fs.readFile("users.txt", "utf8", (err, data) => {
      // Redirect to create page if file is empty
      if (data.length == 0) {
        res.statusCode = 302;
        res.setHeader("Location", "/create");
        return res.end();
      } else {
        // Send HTML response with list of users
        res.write("<html>");
        res.write("<head><title>Users</title></head>");
        res.write("<body><ul>");

        // Split data into lines and display each user
        const users = data.trim().split("\n");
        users.forEach((user) => {
          const trimmeddata = user.trim();
          if (trimmeddata) {
            res.write("<li>");
            res.write(user);
            res.write("</li>");
          }
        });

        // Close HTML tags and end response
        res.write("</ul></body>");
        res.write("</html>");
        return res.end();
      }
    });
  }
};

// Export the request handler function
module.exports = requesthandler;
