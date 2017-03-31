export default (() => {
    const replacer = i => {
        const CONVERTED = i.split('').map(n => {
            if (n === "0")
                return "[+[]]"
            return [...Array(+n)].reduce(a => a+"+!+[]",'[')+']'
        },'')

        return "(+(+" + 
                CONVERTED.join('+') +
                "))"
    }

    return {
        replacer,
        regexp: /\d+/g
    }
})()