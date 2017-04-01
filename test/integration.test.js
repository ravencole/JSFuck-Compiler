import { assert } from 'chai'

import { encode } from '../src/transpiler'

describe('JSFuck', () => {
    describe('encode', () => {
        it('can encode false', () => {
            assert.equal(encode('false'),'[![]]+[]')
        })
        it('can encode true', () => {
            assert.equal(encode('true'),'[!![]]+[]')
        })
        it('can encode undefined', () => {
            assert.equal(encode('undefined'),'[[][[]]]+[]')
        })
        it('can encode NaN', () => {
            assert.equal(encode('NaN'),'[+[![]]]+[]')
        })
        it('can encode Infinity', () => {
            assert.equal(encode('Infinity'),'[+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])]+[]')
        })
        'abcdefghijklmnopqrstuvwxyz'.split('').map(e => {
            it(`can encode ${e}`, () => {
                assert.equal(e,eval(encode(e)))  
            })
        })
        it('can encode a "test"',() => {
            assert.equal('test', eval(encode('test')))
        })
        describe('can do addition', () => {
            [
                {
                    desc: '2+2',
                    input: '2+2',
                    expected: '[+!+[]+!+[]]+(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[+!+[]+!+[]]+[+!+[]+!+[]]'
                },
                {
                    desc: '4+2',
                    input: '4+2',
                    expected: '[+!+[]+!+[]+!+[]+!+[]]+(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[+!+[]+!+[]]+[+!+[]+!+[]]'
                },
                {
                    desc: '12+2',
                    input: '12+2',
                    expected: '[[+!+[]]+[+!+[]+!+[]]]+(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[+!+[]+!+[]]+[+!+[]+!+[]]'
                }
            ].map(test => {
                it(`can perform ${test.desc}`, () => {
                    assert.equal(test.expected, encode(test.input))
                })
            })
            
        })
        xit('can do multiplication', () => {
            // console.log(eval(encode('conosle.log(6)')))
            // assert.equal(2*2, eval(encode('conosle.log("ok")')))
        })
    })
})