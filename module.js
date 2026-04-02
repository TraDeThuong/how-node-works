// module.js: Demonstrates Node module loading, exports, destructuring, and cache behavior
// - require() resolves and executes module once, then caches the exported value
// - module.exports and exports patterns are for exposing APIs
// - requiring same module multiple times returns cached exports (no re-execute)

// console.log (arguments);
// console.log (require ("module").wrapper)

//module.exports
const C = require ("./test-module-1");
const calc1 = new C ();
console.log (calc1.add (2, 5))

//exports
const calc2 = require ("./test-module-2");
console.log (calc2.multiply (2,5))

const {add, multiply, divide} = require ("./test-module-2");
console.log (divide (10, 2))

//caching
require("./test-module-3") ();
require("./test-module-3") ();
require("./test-module-3") ();