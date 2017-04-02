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

export function replaceMap(_map){
    const CHAR_MAP = _map,
          SIMPLE_TOKENS_REGEXP = new RegExp(Object.keys(SIMPLE).join('|'), 'g'),
          CONSTRUCTOR_TOKENS_REGEXP = new RegExp(Object.keys(CONSTRUCTORS).join('|'), 'g'),
          numberReplacer = (_,y) => {
                const [head, ...values] = y.split(""),
                      output = head < 1 ? 
                                    "+[]" : 
                                    "+!+[]".repeat(+head).substr(+(head > 1))

                return [output,...values].join("+").replace(/(\d)/g, digitReplacer(CHAR_MAP));
          }

    const ENCODED_MAP = [...Array(MAX-MIN)].reduce((a,_,i) => {
        const CHARACTER = String.fromCharCode(i+MIN);

        if ( CHAR_MAP[CHARACTER] ){
            a[CHARACTER] = compose(
                replace('""', "[]+[]"),
                replace('\\+""', "+[]"),
                replace("GLOBAL", GLOBAL),
                replace('\\[(\\d)\\]', digitReplacer(CHAR_MAP)),
                replace('\\((\\d)\\)', digitReplacer(CHAR_MAP)),
                replace('(\\d\\d+)', numberReplacer),
                replace(SIMPLE_TOKENS_REGEXP, simpleReplacer(SIMPLE)),
                replace(CONSTRUCTOR_TOKENS_REGEXP, constructorReplacer(CONSTRUCTORS))
            )(CHAR_MAP[CHARACTER])
        }

        return a
    }, {})

    return Object.assign({}, CHAR_MAP, ENCODED_MAP)
}

export function replaceStrings(_map){
    var value, missing;

    const MAPPING = _map,
          UNENCODED_CHARACTERS = /[^\[\]\(\)\!\+]{1}/g,
          ASCII_COUNT = MAX - MIN,
          mappingReplacer = (_,b) => b.split("").join("+"),
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

    for (const CHAR in MAPPING){
        MAPPING[CHAR] = MAPPING[CHAR].replace(/\"([^\"]+)\"/gi, mappingReplacer);
    }

    while (findMissing()){
        for (const CHAR in missing){
            const VALUE = MAPPING[CHAR].replace(UNENCODED_CHARACTERS, valueReplacer);

            MAPPING[CHAR] = VALUE;
            missing[CHAR] = VALUE;
        }

        if (ASCII_COUNT - 1 === 0){
            console.error("Could not compile the following chars:", missing);
        }
    }

    return MAPPING
}