const types = require('./types')

const pseudo_tags = [
    'button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file',
    'hidden', 'image', 'month', 'number', 'password', 'radio', 'range',
    'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week']

const patterns = {
    class: /^\.([^\.\#\:]+)/,
    id: /^\#([^\.\#\:]+)/,
    pseudoTag: /^\:([^\.\#\:]+)/,
    tag: /^([^\.\#]+)/
}

function parse_selector(selector) {
    let result = {
        tag: 'div',
        attrs: {
            id: null,
            className: []
        }
    }

    let match
    while (selector) {
        if (match = patterns.class.exec(selector)) {
            result.attrs.className.push(match[1])
        }
        else if (match = patterns.id.exec(selector)) {
            result.attrs.id = match[1]
        }
        else if (match = patterns.pseudoTag.exec(selector)) {
            if (pseudo_tags.indexOf(match[1]) > -1) {
                result.tag = 'input'
                result.attrs.type = match[1]
            }
            else {
                throw new TypeError("Unknown pseudo-selector " + match[1] + ".")
            }
        }
        else if (match = patterns.tag.exec(selector)) {
            result.tag = match[1]
        }
        selector = selector.substring(match[0].length)
    }

    return result
}

/**
 * Class names helpers
 * Inspired by https://github.com/JedWatson/classnames
 */
function class_names(...args) {
    let class_names = {}
    Object.assign(class_names, ...args.map(normalize_class_names))
    return Object
        .keys(class_names)
        .filter((class_name) => !!class_names[class_name])
        .join(' ')
}

function normalize_class_names(class_names) {
    if (class_names) {
        if (types.isString(class_names)) {
            class_names = class_names.split(/\s+/)
        }

        if (types.isArray(class_names)) {
            return class_names.reduce((ret, class_name) => {
                ret[class_name.trim()] = true
                return ret
            }, {})
        }

        if (types.isObject(class_names)) {
            Object.keys(class_names).forEach((class_name) => {
                class_names[class_name] = !!class_names[class_name]
            })
            return class_names
        }
        else {
            throw new TypeError("Expecting string, array or object for class names. Found " + (typeof class_names) + ".")
        }
    }
    else {
        return {}
    }
}

module.exports = {parse_selector, class_names, normalize_class_names}
