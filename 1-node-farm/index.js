const fs = require('fs');
const http = require("http");


///////////////////////////////////////////
// FILES

// Blocking and Synchronous
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
//
// const textOut = `This is what we know about Avocado : ${textIn} \nCreated At : ${Date.now()}`;
//
// fs.writeFileSync('./txt/output.txt', textOut);
//
// console.log("File Created Successfully");


// Non-blocking and Asynchronous

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) {
//         return console.log("ERROR : 💥", err);
//     }
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.readFile('./txt/final.txt', 'utf-8', (err, data4) => {
//                 console.log(data4);
//             });
//         });
//     });
// });


///////////////////////////////////////////
// SERVER


const server = http.createServer((req, res)=>{
    res.end('Hello from the Server.')
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on port : 8000');
})