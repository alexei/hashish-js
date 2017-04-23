function h(selector) {
    let {tag, id, classes} = h.parse_selector(selector)
    let node = document.createElement(tag)
    let attrs = {
        id: id
    }
    Object.keys(attrs).map(function(key) {
        if (attrs[key]) {
            node.setAttribute(key, attrs[key])
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

module.exports = h
