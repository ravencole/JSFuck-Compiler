/*---------------------------IMPORTS---------------------------*/

import decorate from './decorators'

import { compose } from './utils'

import { 
    CHAR_MAP, 
    SIMPLE
} from './encodingsMap'

import {
    replaceMap,
    replaceStrings,
    SIMPLE_TOKENS_REGEXP
} from './replacers'

import {
    fillMissingDigits,
    fillMissingChars
} from './fillers'

/*---------------------------EXPORTS---------------------------*/

export const compileCharacterMap = _map =>
    compose(
        replaceStrings,
        replaceMap,
        fillMissingChars,
        fillMissingDigits
    )(_map)

export default (() => {
    const COMPILED_CHAR_MAP = compileCharacterMap(CHAR_MAP),
          SIMPLE_TYPES      = SIMPLE

    function encode(input, wrapWithEval, runInParentScope){
        if (!input) {
            console.warn(`Input must me a truthy String`)
            return ""
        }

                                  /* /false|true|undefined|NaN|Infinity|./g */
                                  /*        catches every character         */
        const SIMPLE_OR_CHAR_RE = SIMPLE_TOKENS_REGEXP + '|.',
              OUTPUT = []

        input.replace(new RegExp(SIMPLE_OR_CHAR_RE, 'g'), c => {
            OUTPUT.push(
                SIMPLE_TYPES[c] ?
                    "[" + SIMPLE_TYPES[c] + "]+[]" :
                    COMPILED_CHAR_MAP[c] ?
                        COMPILED_CHAR_MAP[c] :
                        decorate.stringFromCharCode(c, encode)
            )
        })

        return decorate.jSFuckString(
            decorate.digit(
                OUTPUT.join('+'), 
                input
            ), 
            wrapWithEval, 
            runInParentScope,
            encode
        )
    }

    return encode
})()