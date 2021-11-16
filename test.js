const { EventEmitter } = require("events");

let eventEmitter = new EventEmitter();

eventEmitter.on("a", () => arguments.forEach());

eventEmitter.emit("a", 1, 2, 3);
