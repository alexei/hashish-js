function h(selector, props={}) {
    let {tag, id, classes} = h.parse_selector(selector)
    let node = document.createElement(tag)
    let attrs = {
        id: id,
        className: classes.join(' ')
    }
    props.className = [attrs.className, props.className || '']
        .filter((classes) => !!classes.trim())
        .join(' ')
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
            throw new TypeError("Expecting string, array or object but found " + (typeof class_names))
        }
    }
    else {
        return {}
    }
}

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
