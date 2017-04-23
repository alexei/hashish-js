'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function h(selector) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _h$parse_selector = h.parse_selector(selector),
        tag = _h$parse_selector.tag,
        id = _h$parse_selector.id,
        classes = _h$parse_selector.classes;

    var node = document.createElement(tag);

    var attrs = {
        id: id,
        className: h.class_names(classes, props['class'] || {}, props.className || {})
    };['class', 'className'].forEach(function (key) {
        return delete props[key];
    });
    Object.assign(attrs, props);

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

/**
 * Selectors parser
 */
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

/**
 * Class names helpers
 * Inspired by https://github.com/JedWatson/classnames
 */
h.class_names = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
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
            throw new TypeError("Expecting string, array or object but found " + (typeof class_names === 'undefined' ? 'undefined' : _typeof(class_names)));
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