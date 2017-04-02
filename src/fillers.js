/*---------------------------IMPORTS---------------------------*/

import decorate from './decorators'
import { USE_CHAR_CODE } from './encodingsMap'

/*---------------------------EXPORTS---------------------------*/

export function fillMissingDigits(_map){
    const COMPILED_NUMBERS = [...Array(10)].reduce((_a,_,_i) => {
        const NUMBER = _i < 1 ?
                       '+[]' :
                       [...Array(_i+1)].join('+!+[]')

        _a[`${_i}`] = decorate.number(NUMBER,_i)

        return _a
    }, {})

    return Object.assign({}, _map, COMPILED_NUMBERS)
}

export function fillMissingChars(_map){
    const ESCAPED_CHARACTERS = Object.keys(_map).reduce((a,b) => {
        if (_map[b] === USE_CHAR_CODE) {
            a[b] = decorate.escapeCharacters(b)
        }
        return a
    }, {})

    return Object.assign({}, _map, ESCAPED_CHARACTERS)
}