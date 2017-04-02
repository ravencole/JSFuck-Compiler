export const jSFuckString = (output, _eval, scope, encode) => {
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

export const number = ( str,num ) => '[' + str.substr(+(num > 1)) + ']'

export const stringFromCharCode = (c, encode) => {
    // String["constructor"]["fromCharCode"](c)
    return `([]+[])[${ encode("constructor" )}]` 
         + `[${encode("fromCharCode")}]`
         + `(${encode(c.charCodeAt(0) + "")})`
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