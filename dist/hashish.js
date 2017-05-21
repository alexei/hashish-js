var hashish =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function isString(value) {
    return typeof value === 'string';
}

module.exports = { isArray: isArray, isObject: isObject, isString: isString };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var types = __webpack_require__(0);
var utils = __webpack_require__(3);

module.exports = function makeHashish(document) {
    function createElement() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var selector = args.find(function (item) {
            return types.isString(item);
        }) || '';
        var props = args.find(function (item) {
            return types.isObject(item) && !types.isArray(item);
        }) || {};
        var children = args.find(function (item) {
            return types.isArray(item);
        }) || [];

        var _utils$parse_selector = utils.parse_selector(selector),
            tag = _utils$parse_selector.tag,
            attrs = _utils$parse_selector.attrs;

        var node = document.createElement(tag);

        attrs.className = utils.class_names(attrs.className, props.class || {}, props.className || {});['class', 'className'].forEach(function (key) {
            return delete props[key];
        });
        Object.assign(attrs, props);

        Object.keys(attrs).map(function (key) {
            if (attrs[key]) {
                if (key == 'className') {
                    node.className = attrs[key];
                } else if (key == 'style') {
                    if (types.isString(attrs[key])) {
                        node.style.cssText = attrs[key];
                    } else if (types.isObject(attrs[key])) {
                        Object.assign(node.style, attrs[key]);
                    } else {
                        throw new TypeError("Expecting string or object for style attribute. Found " + _typeof(attrs[key]) + ".");
                    }
                } else {
                    node.setAttribute(key, attrs[key]);
                }
            }
        });

        render.apply(undefined, [node].concat(_toConsumableArray(children)));

        return node;
    }

    function render(root) {
        for (var _len2 = arguments.length, children = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            children[_key2 - 1] = arguments[_key2];
        }

        children.map(function (child) {
            if (types.isString(child)) {
                child = document.createTextNode(child);
            } else if (types.isObject(child) && 'render' in child) {
                child = child.render();
            }
            if (child) {
                root.appendChild(child);
            }
        });
    }

    function replace(oldNode, newNode) {
        if (types.isObject(newNode) && 'render' in newNode) {
            newNode = newNode.render();
        }
        oldNode.parentNode.replaceChild(newNode, oldNode);
    }

    return { createElement: createElement, render: render, replace: replace };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var types = __webpack_require__(0);

var pseudo_tags = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'];

var patterns = {
    class: /^\.([^\.\#\:]+)/,
    id: /^\#([^\.\#\:]+)/,
    pseudoTag: /^\:([^\.\#\:]+)/,
    tag: /^([^\.\#]+)/
};

function parse_selector(selector) {
    var result = {
        tag: 'div',
        attrs: {
            id: null,
            className: []
        }
    };

    var match = void 0;
    while (selector) {
        if (match = patterns.class.exec(selector)) {
            result.attrs.className.push(match[1]);
        } else if (match = patterns.id.exec(selector)) {
            result.attrs.id = match[1];
        } else if (match = patterns.pseudoTag.exec(selector)) {
            if (pseudo_tags.indexOf(match[1]) > -1) {
                result.tag = 'input';
                result.attrs.type = match[1];
            } else {
                throw new TypeError("Unknown pseudo-selector " + match[1] + ".");
            }
        } else if (match = patterns.tag.exec(selector)) {
            result.tag = match[1];
        }
        selector = selector.substring(match[0].length);
    }

    return result;
}

/**
 * Class names helpers
 * Inspired by https://github.com/JedWatson/classnames
 */
function class_names() {
    var class_names = {};

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    Object.assign.apply(Object, [class_names].concat(_toConsumableArray(args.map(normalize_class_names))));
    return Object.keys(class_names).filter(function (class_name) {
        return !!class_names[class_name];
    }).join(' ');
}

function normalize_class_names(class_names) {
    if (class_names) {
        if (types.isString(class_names)) {
            class_names = class_names.split(/\s+/);
        }

        if (types.isArray(class_names)) {
            return class_names.reduce(function (ret, class_name) {
                ret[class_name.trim()] = true;
                return ret;
            }, {});
        }

        if (types.isObject(class_names)) {
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
}

module.exports = { parse_selector: parse_selector, class_names: class_names, normalize_class_names: normalize_class_names };

/***/ })
/******/ ]);