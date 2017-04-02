export const compose = (fn, ...rest) =>
    rest.length === 0 ?
        fn :
        (...args) => fn(compose(...rest)(...args));

export const replace = (pattern, replacement) => {
    return value => {
        return value.replace(
            new RegExp(pattern, "gi"),
            replacement
        )
    }
}