/*---------------------------IMPORTS---------------------------*/

import {
    SIMPLE, CONSTRUCTORS,
    MIN, MAX
} from './encodingsMap'

import {
    compose, 
    replace 
} from './utils'

/*---------------------------EXPORTS---------------------------*/

export const UNENCODED_CHARACTERS_RE = 
    /[^\[\]\(\)\!\+]{1}/g

export const SIMPLE_TOKENS_REGEXP = 
    new RegExp(Object.keys(SIMPLE).join('|'), 'g')
          
export const CONSTRUCTOR_TOKENS_REGEXP =
    new RegExp(Object.keys(CONSTRUCTORS).join('|'), 'g')

export const valueReplacer = (MAPPING, MISSING) =>
    c => MISSING[c] ? c : MAPPING[c]

export const digitReplacer = CHAR_MAP => 
    (_,x) => CHAR_MAP[x]

export const simpleReplacer = SIMPLE => 
    c => SIMPLE[c]

export const constructorReplacer = CONSTRUCTORS => 
    c => CONSTRUCTORS[c] + '["constructor"]'

export const joinAllCharactersWithPlus = (_,b) => 
    b.split("").join("+")

export const numberReplacer = CHAR_MAP => {
    return (_,y) => {
        const [head, ...values] = y.split(""),
              output = head < 1 ? 
                            "+[]" : 
                            "+!+[]".repeat(+head).substr(+(head > 1))

        return [
            output,
            ...values
        ].join("+").replace(/(\d)/g, digitReplacer(CHAR_MAP));
    }
}

export function replaceMap(_map){
    const CHAR_MAP = _map,
          ENCODE_CONSTRUCTOR_TOKENS 
              = replace(CONSTRUCTOR_TOKENS_REGEXP, constructorReplacer(CONSTRUCTORS)),
          ENCODE_SIMPLE_TOKENS      
              = replace(SIMPLE_TOKENS_REGEXP, simpleReplacer(SIMPLE)),
          ENCODE_LARGE_NUMBERS      
              = replace(/(\d\d+)/g, numberReplacer(CHAR_MAP)),
          ENCODE_PAREN_NUMBERS      
              = replace(/\((\d)\)/g, digitReplacer(CHAR_MAP)),
          ENCODE_BRACKETED_NUMBERS  
              = replace(/\[(\d)\]/g, digitReplacer(CHAR_MAP)),
          ENCODE_GLOBAL             
              = replace(/GLOBAL/g, GLOBAL),
          ENCODE_TO_STRING          
              = replace(/\+""/g, "+[]"),
          ENCODE_SIDE_BY_SIDE_DOUBLE_QUOTES 
              = replace(/""/g, "[]+[]")

    const ENCODED_MAP = [...Array(MAX-MIN)].reduce((a,_,i) => {
        const CHAR = String.fromCharCode(i+MIN)

        if ( CHAR_MAP[ CHAR ] ){
            a[ CHAR ] = compose(
                ENCODE_SIDE_BY_SIDE_DOUBLE_QUOTES,
                ENCODE_TO_STRING,
                ENCODE_GLOBAL,
                ENCODE_BRACKETED_NUMBERS,
                ENCODE_PAREN_NUMBERS,
                ENCODE_LARGE_NUMBERS,
                ENCODE_SIMPLE_TOKENS,
                ENCODE_CONSTRUCTOR_TOKENS
            )(CHAR_MAP[ CHAR ])
        }

        return a
    }, {})

    return Object.assign({}, CHAR_MAP, ENCODED_MAP)
}

export function replaceCharacters(char, CHAR_MAP) {

  /*  We might end up using a while loop here to avoid stack overflows
   *  from recursing this much
   * 
   * while(char.match(UNENCODED_CHARACTERS_RE)) {
   *   char = char.replace(UNENCODED_CHARACTERS_RE,simpleReplacer(CHAR_MAP))
   * }
   * 
   * return char
   */
    return char.match(UNENCODED_CHARACTERS_RE) ?
           replaceCharacters(
                char.replace(
                    UNENCODED_CHARACTERS_RE,
                    simpleReplacer(CHAR_MAP)
                ),
                CHAR_MAP
            ) :
           char
}

export function replaceStrings(_map){
    const CHAR_MAP = Object.keys(_map).reduce((a,b) => {
                a[b] = _map[b].replace(/\"([^\"]+)\"/gi, joinAllCharactersWithPlus)
                return a
          },{})

    const MISSING = Object.keys(CHAR_MAP).reduce((a,char) => {
        if (CHAR_MAP[ char ].match(UNENCODED_CHARACTERS_RE)) {
            a[ char ] = replaceCharacters(CHAR_MAP[ char ], CHAR_MAP)
        }

        return a
    },{})

    return Object.assign({}, CHAR_MAP, MISSING)
}