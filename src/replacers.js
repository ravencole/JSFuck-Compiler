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

export const digitReplacer = CHAR_MAP => {
    return (_,x) => CHAR_MAP[x]
}

export const simpleReplacer = SIMPLE => {
    return c => SIMPLE[c]
}

export const constructorReplacer = CONSTRUCTORS => {
    return c => CONSTRUCTORS[c] + '["constructor"]'
}

export const mappingReplacer = (_,b) => b.split("").join("+")

export const numberReplacer = CHAR_MAP => {
    return (_,y) => {
        const [head, ...values] = y.split(""),
              output = head < 1 ? 
                            "+[]" : 
                            "+!+[]".repeat(+head).substr(+(head > 1))

        return [output,...values].join("+").replace(/(\d)/g, digitReplacer(CHAR_MAP));
    }
}

export function replaceMap(_map){
    const CHAR_MAP = _map,
          SIMPLE_TOKENS_REGEXP = new RegExp(Object.keys(SIMPLE).join('|'), 'g'),
          CONSTRUCTOR_TOKENS_REGEXP = new RegExp(Object.keys(CONSTRUCTORS).join('|'), 'g'),
          ENCODE_CONSTRUCTOR_TOKENS = replace(CONSTRUCTOR_TOKENS_REGEXP, constructorReplacer(CONSTRUCTORS)),
          ENCODE_SIMPLE_TOKENS = replace(SIMPLE_TOKENS_REGEXP, simpleReplacer(SIMPLE)),
          ENCODE_LARGE_NUMBERS = replace(/(\d\d+)/g, numberReplacer(CHAR_MAP)),
          ENCODE_PAREN_NUMBERS = replace(/\((\d)\)/g, digitReplacer(CHAR_MAP)),
          ENCODE_BRACKETED_NUMBERS = replace(/\[(\d)\]/g, digitReplacer(CHAR_MAP)),
          ENCODE_GLOBAL = replace(/GLOBAL/g, GLOBAL),
          ENCODE_TO_STRING = replace(/\+""/g, "+[]"),
          ENCODE_SIDE_BY_SIDE_DOUBLE_QUOTES = replace(/""/g, "[]+[]")

    const ENCODED_MAP = [...Array(MAX-MIN)].reduce((a,_,i) => {
        const CHARACTER = String.fromCharCode(i+MIN)

        if ( CHAR_MAP[CHARACTER] ){
            a[CHARACTER] = compose(
                ENCODE_SIDE_BY_SIDE_DOUBLE_QUOTES,
                ENCODE_TO_STRING,
                ENCODE_GLOBAL,
                ENCODE_BRACKETED_NUMBERS,
                ENCODE_PAREN_NUMBERS,
                ENCODE_LARGE_NUMBERS,
                ENCODE_SIMPLE_TOKENS,
                ENCODE_CONSTRUCTOR_TOKENS
            )(CHAR_MAP[CHARACTER])
        }

        return a
    }, {})

    return Object.assign({}, CHAR_MAP, ENCODED_MAP)
}

export function replaceStrings(_map){
    var missing;

    const MAPPING = Object.keys(_map).reduce((a,b) => {
                a[b] = _map[b].replace(/\"([^\"]+)\"/gi, mappingReplacer)
                return a
          },{}),
          UNENCODED_CHARACTERS = /[^\[\]\(\)\!\+]{1}/g,
          ASCII_COUNT = MAX - MIN,
          valueReplacer = c =>  missing[c] ? c : MAPPING[c]

    function findMissing(){
        missing = {};

        for (const CHAR in MAPPING){
            const VALUE = MAPPING[CHAR]

            if (VALUE.match(UNENCODED_CHARACTERS)){
                missing[CHAR] = VALUE;
                return true
            }
        }

        return false
    }

    while (findMissing()){
        for (const CHAR in missing){
            const VALUE = MAPPING[CHAR].replace(UNENCODED_CHARACTERS, valueReplacer);

            MAPPING[CHAR] = VALUE;
            missing[CHAR] = VALUE;
        }
        // if (ASCII_COUNT - 1 === 0){
        //     console.error("Could not compile the following chars:", missing);
        // }
    }

    return MAPPING
}