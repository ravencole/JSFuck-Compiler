import { assert } from 'chai'

import parse from '../src/parse'

describe('parse', () => {
    it('correctly replaces all numbers in a string', () => {
        const ADDITION_EXPRESSION = "122+8",
              EXPECTED = '(+(+[+!+[]]+[+!+[]+!+[]]+[+!+[]+!+[]]))+(+(+[+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]))'

        assert.equal(EXPECTED, parse(ADDITION_EXPRESSION))
        assert.equal(130, eval(parse(ADDITION_EXPRESSION)))
    })
})