function h() {
    return document.createElement('div')
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
