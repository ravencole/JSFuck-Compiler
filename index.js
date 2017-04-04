import fs from 'fs'
import path from 'path'
import colors from 'colors'

import jsfuck from './src'

const [ SRC_FILE_NAME, ...rest ] = process.argv.slice(2),
      MESSAGE = fs.readFileSync(path.join(__dirname,'./successMessage.txt'), 'utf-8')

fs.readFile(path.join(__dirname, SRC_FILE_NAME), 'utf-8', (err, file) => {
    if (err) throw err

    fs.writeFile(path.join(__dirname,'./a.out.js'), `eval(${jsfuck(file)})`, (err) => {
        if (err) {
            throw err
        }
        console.log(
            "\n" + 
            MESSAGE.split("").reduce((a,b) => {
                switch(true) {
                    case b === '/' || b === '\\':
                        return a + b.green
                    case b === '_':
                        return a + b.blue
                    default:
                        return a + b
                }
            }, '')
        )
        console.log(
            "\nYOUR COMPILED JSFUCK IS IN ".green
          + "a.out.js".blue
          + "!".green
        )
    })
})