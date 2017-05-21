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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var hashish = {};

hashish.createElement = function () {
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

    var _hashish$utils$parse_ = hashish.utils.parse_selector(selector),
        tag = _hashish$utils$parse_.tag,
        attrs = _hashish$utils$parse_.attrs;

    var node = document.createElement(tag);

    attrs.className = hashish.utils.class_names(attrs.className, props['class'] || {}, props['className'] || {});['class', 'className'].forEach(function (key) {
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

    hashish.render.apply(hashish, [node].concat(_toConsumableArray(children)));

    return node;
};

hashish.render = function (root) {
    for (var _len2 = arguments.length, children = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        children[_key2 - 1] = arguments[_key2];
    }

    children.map(function (child) {
        if (is_string(child)) {
            child = document.createTextNode(child);
        } else if (is_object(child) && 'render' in child) {
            child = child.render();
        }
        root.appendChild(child);
    });
};

hashish.replace = function (node, child) {
    if (is_object(child) && 'render' in child) {
        child = child.render();
    }
    node.parentNode.replaceChild(child, node);
};

/**
 * Selectors parser
 */
hashish.utils = {};
hashish.utils.pseudo_tags = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'];
hashish.utils.parse_selector = function (selector) {
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
            if (hashish.utils.pseudo_tags.indexOf(match[1]) > -1) {
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
hashish.utils.class_names = function () {
    var class_names = {};

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    Object.assign.apply(Object, [class_names].concat(_toConsumableArray(args.map(hashish.utils.normalize_class_names))));
    return Object.keys(class_names).filter(function (class_name) {
        return !!class_names[class_name];
    }).join(' ');
};

hashish.utils.normalize_class_names = function (class_names) {
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

module.exports = hashish;

/***/ })
/******/ ]);