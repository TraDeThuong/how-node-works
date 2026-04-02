// event.js: Illustrates core Node.js EventEmitter and HTTP server event model
// - EventEmitter is base for async event patterns (custom and builtin)
// - http.createServer uses EventEmitter for request/close events

const EventEmitter = require("events");
const http = require("http")

// This mechanism basically extending the EventEmitter class is exactly how the different node modules
// like HTTP, file system, and many other node core modules implement events internally
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9);

//===========================================================================================================

const server = http.createServer();

server.on ("request", (req, res) => {
    console.log ("Request received!");
    console.log(req.url)
    res.end ("Request received");
})

server.on ("request", (req, res) => {
    console.log ("Another request 😒");
})

server.on ("close", () => {
    console.log ("Server closed");
})

server.listen (8000, "127.0.0.1", () => {
    console.log ("Waiting for request...")
})