/*
 *   Primary file for API
 *
 */

// Dependencies

const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// The server should respond to all requests with a string

const server = http.createServer(function(req, res) {
  // Get URL and Parse it
  const parsedUrl = url.parse(req.url, true);

  // Get path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toUpperCase();

  // Get the headers as an object
  const headers = req.headers;

  // Send the response
  res.end("Hello World\n");

  // Get the payload, if there is any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();
  });

  // Choose the handler the request should go to. if one is not found, use the not found handler.

  const chosenHandler =
    typeof router[trimmedpath] !== "undefined"
      ? router[trimmedPath]
      : handlers.notfound;

  // Construct the data object to send to the handler
  const data = {
    trimmedPath: trimmedPath,
    queryStringObject: queryStringObject,
    method: method,
    headers: headers,
    payload: buffer
  };

  // Route the request to the handler specified in the router
  chosenHandler(data, function(statusCode, payload) {
    // Use the status code called back by the handler, or default to 200
    statusCode = typeof statusCode == "number" ? statusCode : 200;
    // Use the payload called back by the handler, or default to an empty object
    payload = typeof payload == "object" ? payload : {};
  });

  //Log the request path
  console.log("Request received with this payload: ", buffer);
});

// Start the server, and listen on port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000 now");
});

// Define handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
  // Callback HTTP status code, and a payload object
  callback(406, { name: "sample handler" });
};

// Not found handlers
handlers.notfound = function(data, callback) {
  callback(404);
};

// Define a request router
const router = {
  sample: handlers.sample
};
