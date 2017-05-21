const types = require('./types')
const hashish = {}

hashish.createElement = function(...args) {
    let selector = args.find((item) => types.isString(item)) || ''
    let props = args.find((item) => types.isObject(item) && !types.isArray(item)) || {}
    let children = args.find((item) => types.isArray(item)) || []

    let {tag, attrs} = hashish.utils.parse_selector(selector)

    let node = document.createElement(tag)

    attrs.className = hashish.utils.class_names(
        attrs.className,
        props['class'] || {},
        props['className'] || {}
    )
    ;['class', 'className'].forEach((key) => delete props[key])
    Object.assign(attrs, props)

    Object.keys(attrs).map((key) => {
        if (attrs[key]) {
            if (key == 'className') {
                node.className = attrs[key]
            }
            else if (key == 'style') {
                if (types.isString(attrs[key])) {
                    node.style.cssText = attrs[key]
                }
                else if (types.isObject(attrs[key])) {
                    Object.assign(node.style, attrs[key])
                }
                else {
                    throw new TypeError("Expecting string or object for style attribute. Found " + (typeof attrs[key]) + ".")
                }
            }
            else {
                node.setAttribute(key, attrs[key])
            }
        }
    })

    hashish.render(node, ...children)

    return node
}

hashish.render = function(root, ...children) {
    children.map((child) => {
        if (types.isString(child)) {
            child = document.createTextNode(child)
        }
        else if (types.isObject(child) && 'render' in child) {
            child = child.render()
        }
        if (child) {
            root.appendChild(child)
        }
    })
}

hashish.replace = function(node, child) {
    if (types.isObject(child) && 'render' in child) {
        child = child.render()
    }
    node.parentNode.replaceChild(child, node)
}

/**
 * Selectors parser
 */
hashish.utils = {}
hashish.utils.pseudo_tags = [
    'button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file',
    'hidden', 'image', 'month', 'number', 'password', 'radio', 'range',
    'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week']
hashish.utils.parse_selector = (selector) => {
    let result = {
        tag: 'div',
        attrs: {
            id: null,
            className: []
        }
    }

    let match
    while (selector) {
        if (match = /^\.([^\.\#\:]+)/.exec(selector)) {
            result.attrs.className.push(match[1])
        }
        else if (match = /^\#([^\.\#\:]+)/.exec(selector)) {
            result.attrs.id = match[1]
        }
        else if (match = /^\:([^\.\#\:]+)/.exec(selector)) {
            if (hashish.utils.pseudo_tags.indexOf(match[1]) > -1) {
                result.tag = 'input'
                result.attrs.type = match[1]
            }
            else {
                throw new TypeError("Unknown pseudo-selector " + match[1] + ".")
            }
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
hashish.utils.class_names = function(...args) {
    let class_names = {}
    Object.assign(class_names, ...args.map(hashish.utils.normalize_class_names))
    return Object
        .keys(class_names)
        .filter((class_name) => !!class_names[class_name])
        .join(' ')
}

hashish.utils.normalize_class_names = function(class_names) {
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

module.exports = hashish
