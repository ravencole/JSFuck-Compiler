import parsers from './parsers'

export default str => {
    return parsers.reduce((a,b) => {
        return a.replace(b.regexp, b.replacer)
    }, str)
}