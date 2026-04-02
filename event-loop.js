// event-loop.js: Demonstrates Node.js runtime phases and asynchronous execution timing
// - Synchronous top-level code runs immediately
// - setTimeout() callbacks run in timers phase
// - setImmediate() callbacks run in check phase
// - fs.readFile() is handled in poll phase and its callback runs asynchronously
// - crypto.pbkdf2() uses libuv thread pool workers and prints elapsed time
// - process.nextTick() executes before returning to event loop after current operation

const fs = require ('fs');
const crypto = require ('crypto')

const start = Date.now(); 
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout (() => console.log("Timer 1 finished"), 0)
setImmediate (() => console.log("Immediate 1 finished"))

fs.readFile ('test-file.txt', () => {
    console.log ('I/O finished')
    setTimeout (() => console.log("Timer 2 finished"), 0)
    setTimeout (() => console.log("Timer 3 finished"), 3000)
    setImmediate (() => console.log("Immediate 1 finished"))    

    process.nextTick(() => console.log ("Process.nextTick"))

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
})

console.log ("Hello from the top level code")