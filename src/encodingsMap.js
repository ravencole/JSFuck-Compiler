export const USE_CHAR_CODE = 
    "USE_CHAR_CODE"

export const MIN = 32

export const MAX = 126

export const GLOBAL = 'Function("return this")()'

export const SIMPLE = {
    'false':      '![]',
    'true':       '!![]',
    'undefined':  '[][[]]',
    'NaN':        '+[![]]',
    'Infinity':   '+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])'
}

export const CONSTRUCTORS = {
    'Array':    '[]',
    'Number':   '(+[])',
    'String':   '([]+[])',
    'Boolean':  '(![])',
    'Function': '[]["fill"]',
    'RegExp':   'Function("return/"+false+"/")()'
}

export let CHAR_MAP = {
    'a':   '(false+"")[1]',
    'b':   '([]["entries"]()+"")[2]',
    'c':   '([]["fill"]+"")[3]',
    'd':   '(undefined+"")[2]',
    'e':   '(true+"")[3]',
    'f':   '(false+"")[0]',
    'g':   '(false+[0]+String)[20]',
    'h':   '(+(101))["to"+String["name"]](21)[1]',
    'i':   '([false]+undefined)[10]',
    'j':   '([]["entries"]()+"")[3]',
    'k':   '(+(20))["to"+String["name"]](21)',
    'l':   '(false+"")[2]',
    'm':   '(Number+"")[11]',
    'n':   '(undefined+"")[1]',
    'o':   '(true+[]["fill"])[10]',
    'p':   '(+(211))["to"+String["name"]](31)[1]',
    'q':   '(+(212))["to"+String["name"]](31)[1]',
    'r':   '(true+"")[1]',
    's':   '(false+"")[3]',
    't':   '(true+"")[0]',
    'u':   '(undefined+"")[0]',
    'v':   '(+(31))["to"+String["name"]](32)',
    'w':   '(+(32))["to"+String["name"]](33)',
    'x':   '(+(101))["to"+String["name"]](34)[1]',
    'y':   '(NaN+[Infinity])[10]',
    'z':   '(+(35))["to"+String["name"]](36)',

    'A':   '(+[]+Array)[10]',
    'B':   '(+[]+Boolean)[10]',
    'C':   'Function("return escape")()(("")["italics"]())[2]',
    'D':   'Function("return escape")()([]["fill"])["slice"]("-1")',
    'E':   USE_CHAR_CODE  /*  '(RegExp+"")[12]'  */,
    'F':   '(+[]+Function)[10]',
    'G':   '(false+Function("return Date")()())[30]',
    'H':   USE_CHAR_CODE,
    'I':   '(Infinity+"")[0]',
    'J':   USE_CHAR_CODE,
    'K':   USE_CHAR_CODE,
    'L':   USE_CHAR_CODE,
    'M':   '(true+Function("return Date")()())[30]',
    'N':   '(NaN+"")[0]',
    'O':   '(NaN+Function("return{}")())[11]',
    'P':   USE_CHAR_CODE,
    'Q':   USE_CHAR_CODE,
    'R':   USE_CHAR_CODE  /*  '(+[]+RegExp)[10]'  */,
    'S':   '(+[]+String)[10]',
    'T':   '(NaN+Function("return Date")()())[30]',
    'U':   '(NaN+Function("return{}")()["to"+String["name"]]["call"]())[11]',
    'V':   USE_CHAR_CODE,
    'W':   USE_CHAR_CODE,
    'X':   USE_CHAR_CODE,
    'Y':   USE_CHAR_CODE,
    'Z':   USE_CHAR_CODE,

    ' ':   '(NaN+[]["fill"])[11]',
    '!':   USE_CHAR_CODE,
    '"':   '("")["fontcolor"]()[12]',
    '#':   USE_CHAR_CODE,
    '$':   USE_CHAR_CODE,
    '%':   'Function("return escape")()([]["fill"])[21]',
    '&':   '("")["link"](0+")[10]',
    '\'':  USE_CHAR_CODE,
    '(':   '(undefined+[]["fill"])[22]',
    ')':   '([0]+false+[]["fill"])[20]',
    '*':   USE_CHAR_CODE,
    '+':   '(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[2]',
    ',':   '([]["slice"]["call"](false+"")+"")[1]',
    '-':   '(+(.+[0000000001])+"")[2]',
    '.':   '(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]',
    '/':   '(false+[0])["italics"]()[10]',
    ':':   USE_CHAR_CODE  /*  '(RegExp()+"")[3]'  */,
    ';':   '("")["link"](")[14]',
    '<':   '("")["italics"]()[0]',
    '=':   '("")["fontcolor"]()[11]',
    '>':   '("")["italics"]()[2]',
    '?':   USE_CHAR_CODE  /* '(Function("return /false/")()["constructor"]()+[])[2]' */,
    '@':   USE_CHAR_CODE,
    '[':   '([]["entries"]()+"")[0]',
    '\\':  USE_CHAR_CODE,
    ']':   '([]["entries"]()+"")[22]',
    '^':   USE_CHAR_CODE,
    '_':   USE_CHAR_CODE,
    '`':   USE_CHAR_CODE,
    '{':   '(true+[]["fill"])[20]',
    '|':   USE_CHAR_CODE,
    '}':   '([]["fill"]+"")["slice"]("-1")',
    '~':   'Function("return unescape")()("%7e")'
}