export const compose = (cb, ...rest) =>
    rest.length === 0 ?
        cb :
        (...args) => cb(compose(...rest)(...args));

export const replace = (pattern, replacement) => 
    value => value.replace(new RegExp(pattern, "gi"), replacement)
