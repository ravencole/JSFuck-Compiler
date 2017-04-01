import { SIMPLE, CHARACTERS, CONSTRUCTORS } from './encodingsMap'

const compose = function(...args) {
          return (result) => {
            for (let i = args.length - 1; i > -1; i--) {
              result = args[i].call(this, result)
            }

            return result
          }
        },
      SIMPLE_KEYWORDS_OR_ALL_RE = /false|true|Infinity|NaN|undefined|./g,
      SIMPLE_BRACKETS = n => `[${  SIMPLE[n]  }]+[]`,
      REPLACE_DIGITS = num => {
            const NUM = num.split('').map(n => {
                const ZERO = '+[]',
                      ONE = '+!+[]'

                return +n === 0 ?
                    ZERO :
                    [...Array(+n+1)].join(ONE)
            })

            return NUM.length <= 1 ?
                `[${NUM[0]}]` :
                '[' + NUM.map(n => {
                    return `[${n}]`
                }).join('+') + ']'
        },
      replaceSimples = s => s.replace(/(false|true|undefined|NaN|Infinity)(\+"")?/g, (_,b,quote) => {
        return `${ SIMPLE[b] }${ quote ? '+[]' : '' }`
      }),
      replaceConstructors = s => s.replace(/String|Number/g, c => CONSTRUCTORS[c] + '["constructor"]'),
      replaceNumbers = s => s.replace(/\d+/g, REPLACE_DIGITS),
      replaceQuotes = s => s.replace(/""/g, '[]'),
      replaceString = s => s.replace(/"[^"]+"/g, k => {
            return k.substr(1,k.length - 2).split('').map(e => {
                return transpile([CHARACTERS[e]])
            }).join('+')
        })

export const encode = str => {
    const OUTPUT = []

    str.replace(SIMPLE_KEYWORDS_OR_ALL_RE, c => {
        OUTPUT.push(SIMPLE[c] ? SIMPLE_BRACKETS(c) : CHARACTERS[c] || c)
    })

    return transpile(OUTPUT)
}

export const transpile = src => {
    return src.map(c => {
        return compose(
            replaceString,
            replaceNumbers,
            replaceConstructors,
            replaceQuotes,
            replaceSimples
        )(c)
    }).join('+')
}
