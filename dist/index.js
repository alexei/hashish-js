'use strict';

function h(selector) {
    var _h$parse_selector = h.parse_selector(selector),
        tag = _h$parse_selector.tag,
        id = _h$parse_selector.id,
        classes = _h$parse_selector.classes;

    var node = document.createElement(tag);
    var attrs = {
        id: id,
        className: classes.join(' ')
    };
    Object.keys(attrs).map(function (key) {
        if (attrs[key]) {
            if (key == 'className') {
                node.className = attrs[key];
            } else {
                node.setAttribute(key, attrs[key]);
            }
        }
    });
    return node;
}

h.parse_selector = function (selector) {
    var result = {
        tag: 'div',
        id: null,
        classes: []
    };

    var match = void 0;
    while (selector) {
        if (match = /^\.([^\.\#]+)/.exec(selector)) {
            result.classes.push(match[1]);
        } else if (match = /^\#([^\.\#]+)/.exec(selector)) {
            result.id = match[1];
        } else if (match = /^([^\.\#]+)/.exec(selector)) {
            result.tag = match[1];
        }
        selector = selector.substring(match[0].length);
    }

    return result;
};

module.exports = h;