export const jSFuckString = (output, _eval, scope) => {
    return _eval ? 
                scope ?
                    "[][" + encode("fill") + "]" + "[" + encode("constructor") + "]" + "(" + encode("return eval") +  ")()" +"(" + output + ")" :
                    "[][" + encode("fill") + "]" + "[" + encode("constructor") + "]" + "(" + output + ")()" :
           output
}
export const digit = (output, input) => {
    return /^\d$/.test(input) ?
           output += "+[]" :
           output
}
export const number = ( str,num ) => {
    return num > 1 ? 
                '[' + str.substr(1) + ']' : 
                '[' + str + ']'
}

export const stringFromCharCode = c => {
    // String["constructor"]["fromCharCode"](c)
    return  "([]+[])[" 
            + encode("constructor") 
                                 + "]" 
            + "[" 
            + encode("fromCharCode") 
                                 + "]" 
            + "(" 
            + encode(c.charCodeAt(0) + "") 
                                       + ")"
}

export const escapeCharacters = key => {
    return 'Function("return unescape")()("%"'
           + key.charCodeAt(0).toString(16).replace(/(\d+)/g, "+($1)+\"") 
           + '")'
}

export default {
    jSFuckString,
    number,
    stringFromCharCode,
    escapeCharacters,
    digit
}