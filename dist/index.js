'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function h() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var selector = args.find(function (item) {
        return is_string(item);
    }) || '';
    var props = args.find(function (item) {
        return is_object(item) && !is_array(item);
    }) || {};
    var children = args.find(function (item) {
        return is_array(item);
    }) || [];

    var _h$parse_selector = h.parse_selector(selector),
        tag = _h$parse_selector.tag,
        attrs = _h$parse_selector.attrs;

    var node = document.createElement(tag);

    attrs.className = h.class_names(attrs.className, props['class'] || {}, props.className || {});['class', 'className'].forEach(function (key) {
        return delete props[key];
    });
    Object.assign(attrs, props);

    Object.keys(attrs).map(function (key) {
        if (attrs[key]) {
            if (key == 'className') {
                node.className = attrs[key];
            } else if (key == 'style') {
                if (is_string(attrs[key])) {
                    node.style.cssText = attrs[key];
                } else if (is_object(attrs[key])) {
                    Object.assign(node.style, attrs[key]);
                } else {
                    throw new TypeError("Expecting string or object for style attribute. Found " + _typeof(attrs[key]) + ".");
                }
            } else {
                node.setAttribute(key, attrs[key]);
            }
        }
    });

    h.render.apply(h, [node].concat(_toConsumableArray(children)));

    return node;
}

h.render = function (root) {
    for (var _len2 = arguments.length, children = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        children[_key2 - 1] = arguments[_key2];
    }

    children.map(function (child) {
        if (is_string(child)) {
            child = document.createTextNode(child);
        }
        root.appendChild(child);
    });
};

/**
 * Selectors parser
 */
var pseudo_tags = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'];
h.parse_selector = function (selector) {
    var result = {
        tag: 'div',
        attrs: {
            id: null,
            className: []
        }
    };

    var match = void 0;
    while (selector) {
        if (match = /^\.([^\.\#\:]+)/.exec(selector)) {
            result.attrs.className.push(match[1]);
        } else if (match = /^\#([^\.\#\:]+)/.exec(selector)) {
            result.attrs.id = match[1];
        } else if (match = /^\:([^\.\#\:]+)/.exec(selector)) {
            if (pseudo_tags.indexOf(match[1]) > -1) {
                result.tag = 'input';
                result.attrs.type = match[1];
            } else {
                throw new TypeError("Unknown pseudo-selector " + match[1] + ".");
            }
        } else if (match = /^([^\.\#]+)/.exec(selector)) {
            result.tag = match[1];
        }
        selector = selector.substring(match[0].length);
    }

    return result;
};

/**
 * Class names helpers
 * Inspired by https://github.com/JedWatson/classnames
 */
h.class_names = function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    class_names = {};
    Object.assign.apply(Object, [class_names].concat(_toConsumableArray(args.map(h.normalize_class_names))));
    return Object.keys(class_names).filter(function (class_name) {
        return !!class_names[class_name];
    }).join(' ');
};

h.normalize_class_names = function (class_names) {
    if (class_names) {
        if (is_string(class_names)) {
            class_names = class_names.split(/\s+/);
        }

        if (is_array(class_names)) {
            return class_names.reduce(function (ret, class_name) {
                ret[class_name.trim()] = true;
                return ret;
            }, {});
        }

        if (is_object(class_names)) {
            Object.keys(class_names).forEach(function (class_name) {
                class_names[class_name] = !!class_names[class_name];
            });
            return class_names;
        } else {
            throw new TypeError("Expecting string, array or object for class names. Found " + (typeof class_names === 'undefined' ? 'undefined' : _typeof(class_names)) + ".");
        }
    } else {
        return {};
    }
};

/**
 * Misc helpers
 */
function is_string(value) {
    return typeof value === 'string';
}

function is_array(value) {
    return Array.isArray(value);
}

function is_object(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

module.exports = h;