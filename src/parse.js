import numberParser from './numberParser'

const REGEXPS = [
    {
        re: /\d+/g,
        callback: numberParser
    }
]

export default str => {
    return REGEXPS.reduce((a,b) => {
        return a.replace(b.re, b.callback)
    }, str)
}