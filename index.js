import fs from 'fs'
import path from 'path'

import jsfuck from './src'

const [ SRC_FILE_NAME, ...rest ] = process.argv.slice(2)

fs.readFile(path.join(__dirname, SRC_FILE_NAME), 'utf-8', (err, file) => {
    if (err) throw console.log(err)
    fs.writeFile(path.join(__dirname,'./a.out.js'), `eval(${jsfuck(file)})`, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
})


