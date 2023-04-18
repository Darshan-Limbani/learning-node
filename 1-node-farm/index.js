const fs = require('fs')


const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textOut = `This is what we know about Avocado : ${textIn} \nCreated At : ${Date.now()}`

fs.writeFileSync('./txt/output.txt',textOut)

console.log("File Created Successfully");