// stream.js: Shows difference between full-file async read and streamed I/O
// - solution 1: readFile reads entire file into memory, then sends buffer
// - solution 2: readable stream + manual .on('data') for chunked streaming
// - solution 3: pipe() connects read stream to response (recommended for Node streams)

const fs = require ('fs')
const server = require ('http').createServer();

server.on ('request', (req, res) => {
    // //solution 1
    // fs.readFile ("test-file.txt", (err, data) => {
    //     if (err) console.log (err);
    //     res.end(data);
    // });

    // //solution 2: Streams
    // const readable = fs.createReadStream ("test-file.txt")
    // readable.on ("data", chunk => {
    //     res.write (chunk)
    // })
    // readable.on ("end", () => {
    //     res.end()
    // })
    // readable.on ("error", err => {
    //     console.log (err);
    //     res.statusCode = 500;
    //     res.end ("File not found")
    // })

    //solution 3
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
    //readableSource.pipe(writeableDest)
})

server.listen (8000, "127.0.0.1", () => {
    console.log ("Listening ... ")
})