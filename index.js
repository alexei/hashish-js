function h(selector, props={}) {
    if (is_object(selector)) {
        props = selector
        selector = 'div'
    }

    let {tag, id, classes} = h.parse_selector(selector)

    let node = document.createElement(tag)

    let attrs = {
        id: id,
        className: h.class_names(
            classes,
            props['class'] || {},
            props.className || {}
        )
    }
    ;['class', 'className'].forEach((key) => delete props[key])
    Object.assign(attrs, props)

    Object.keys(attrs).map((key) => {
        if (attrs[key]) {
            if (key == 'className') {
                node.className = attrs[key]
            }
            else {
                node.setAttribute(key, attrs[key])
            }
        }
    })
    return node
}

/**
 * Selectors parser
 */
h.parse_selector = (selector) => {
    let result = {
        tag: 'div',
        id: null,
        classes: []
    }

    let match
    while (selector) {
        if (match = /^\.([^\.\#]+)/.exec(selector)) {
            result.classes.push(match[1])
        }
        else if (match = /^\#([^\.\#]+)/.exec(selector)) {
            result.id = match[1]
        }
        else if (match = /^([^\.\#]+)/.exec(selector)) {
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
h.class_names = (...args) => {
    class_names = {}
    Object.assign(class_names, ...args.map(h.normalize_class_names))
    return Object
        .keys(class_names)
        .filter((class_name) => !!class_names[class_name])
        .join(' ')
}

h.normalize_class_names = (class_names) => {
    if (class_names) {
        if (is_string(class_names)) {
            class_names = class_names.split(/\s+/)
        }

        if (is_array(class_names)) {
            return class_names.reduce((ret, class_name) => {
                ret[class_name.trim()] = true
                return ret
            }, {})
        }

        if (is_object(class_names)) {
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

/**
 * Misc helpers
 */
function is_string(value) {
    return typeof value === 'string'
}

function is_array(value) {
    return Array.isArray(value)
}

function is_object(value) {
    return typeof value === 'object'
}

module.exports = h
