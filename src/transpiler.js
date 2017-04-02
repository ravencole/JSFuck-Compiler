/*---------------------------IMPORTS---------------------------*/

import decorate from './decorators'

import { compose, replace } from './utils'

import { 
    CHAR_MAP, USE_CHAR_CODE, 
    MIN, MAX, SIMPLE,
    CONSTRUCTORS, GLOBAL
} from './encodingsMap'

import {
    digitReplacer,
    simpleReplacer,
    constructorReplacer,
    replaceMap,
    replaceStrings
} from './replacers'

import {
    fillMissingDigits,
    fillMissingChars
} from './fillers'

/*---------------------------EXPORTS---------------------------*/

export default (() => {
    const MAPPING = compose(
        replaceStrings,
        replaceMap,
        fillMissingChars,
        fillMissingDigits
    )(CHAR_MAP)

    function encode(input, wrapWithEval, runInParentScope){
        if (!input) return ""

        const SIMPLE_OR_CHAR_RE = Object.keys(SIMPLE).join('|') + '|.',
              OUTPUT = []

        input.replace(new RegExp(SIMPLE_OR_CHAR_RE, 'g'), c => {
            OUTPUT.push(
                SIMPLE[c] ?
                    "[" + SIMPLE[c] + "]+[]" :
                    MAPPING[c] ?
                        MAPPING[c] :
                        decorate.stringFromCharCode(c, encode)
            )
        })

        return decorate.jSFuckString(
            decorate.digit(OUTPUT.join('+'), input), 
            wrapWithEval, 
            runInParentScope,
            encode
        )
    }

    return {
        encode
    }
})()