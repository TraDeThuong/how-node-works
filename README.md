# HOW NODE JS WORKS: A LOOK BEHIND THE SCENES

This repository is a hands-on set of concise Node.js examples to explain core concepts in Node’s runtime, module system, event emitter model, streams, and the event loop with libuv and threadpool behavior.

## Project files

- `event-loop.js`: event loop phases + timers + I/O + threadpool + process.nextTick
- `event.js`: EventEmitter mechanism + server request/close events
- `module.js`: module exports/imports, destructuring, and caching
- `stream.js`: file I/O solutions with `fs.readFile`, streams, and `pipe`
- `test-file.txt`: sample text for stream file delivery

## Key Concepts Covered

1. Event loop and phases (`event-loop.js`)
   - Macro-tasks: timers, I/O callbacks, close callbacks, check (setImmediate)
   - Micro-tasks: `process.nextTick`, Promises (not shown but same layer).
   - `UV_THREADPOOL_SIZE`: controls how many worker threads are used for crypto and fs operations requiring threadpool.

2. Event emitters and HTTP events (`event.js`)
   - Extend `EventEmitter` to create custom event emitters.
   - Each listener executes on emit; the order is listener registration order.
   - `http.createServer()` uses EventEmitter and emits `request`, `close`.

3. Module system (`module.js` + `test-module-*`)
   - `module.exports` vs `exports`: both point to the same object initially.
   - Require caching means repeated `require('./test-module-3')` returns the same module instance.
   - Destructuring import (`const {add, multiply, divide} = require(...)`) is supported.

4. Streams and performance (`stream.js`)
   - `fs.readFile` is easy but loads entire file into memory.
   - `createReadStream` streams data in chunks.
   - `.pipe(res)` is the recommended streaming pattern for efficient backpressure-aware flow.

## Run examples

1. Event loop sample

```bash
node event-loop.js
```

2. Event emitter and HTTP server (open browser at http://127.0.0.1:8000)

```bash
node event.js
```

3. Module export caching and usage

```bash
node module.js
```

4. HTTP streaming server

```bash
node stream.js
```

## File-level notes (inline documentation already included in files)

- `event-loop.js`: covers `setTimeout`, `setImmediate`, `fs.readFile`, `crypto.pbkdf2`, `process.nextTick`, and uses `UV_THREADPOOL_SIZE=1` to show single threadpool scheduling.
- `event.js`: includes custom `Sales` emitter and built-in `http` emitter behavior.
- `module.js`: comments explain module wrapper, exports, and caching.
- `stream.js`: switch from `fs.readFile` to stream to pipe.
- `test-module-1.js`: a class module with methods and annotation explaining usage.

## What to look for

- How call order is established with timers, immediates, I/O, and nextTick.
- How heavy tasks in `crypto.pbkdf2` are processed by worker threads.
- How EventEmitter can be used as the foundation for many Node APIs.
- How module caching is a key feature for performance and singleton behavior.
- How streams can drastically reduce memory overhead for large files.

---

## Quick tips

- Add `console.log('tick')` around points in `event-loop.js` to experiment with phase timing.
- In `event.js`, add `server.close()` after a request to observe the `close` event.
- Make an enormous `test-file.txt` and test with `stream.js` plus `ab` load testing to see streaming advantages.
