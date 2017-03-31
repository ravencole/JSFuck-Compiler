import { assert } from 'chai'

import numberParser from '../src/parsers/numberParser'

describe('numberParser', () => {
    it('parses 6', () => {
        assert.equal("6", eval(numberParser.replacer("6")))
    })
    it('parses 66', () => {
        assert.equal("66", eval(numberParser.replacer("66")))
    })
    it('parses 6123212', () => {
        assert.equal("6123212", eval(numberParser.replacer("6123212")))
    })
    describe('integrations',() => {
        it('can help calculate a charCode', () => {
            const charCode = `String.fromCharCode(${numberParser.replacer("97")})`
            assert.equal("a", eval(charCode))   
        })
        it('works as a callback from string.replace', () => {
            const STR = "12+120".replace(/\d+/g, numberParser.replacer)

            assert.equal(132, eval(STR))
        })
    })
})