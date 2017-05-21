function isArray(value) {
    return Array.isArray(value)
}

function isObject(value) {
    return typeof value === 'object'
}

function isString(value) {
    return typeof value === 'string'
}

module.exports = {isArray, isObject, isString}
