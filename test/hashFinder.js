var md5 = require('md5'),
    fs = require('fs'),
    path = require('path');


fs.readFile(path.join(__dirname, './test/mergeSort.js'),'utf-8',(err, file) => {
    if (err) throw err;

    console.log(md5(file))
})