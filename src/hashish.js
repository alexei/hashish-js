const types = require('./types')
const utils = require('./utils')

const hashish = Object.create(null)

hashish.document = null

hashish.createElement = function(...args) {
    let selector = args.find((item) => types.isString(item)) || ''
    let props = args.find((item) => types.isObject(item) && !types.isArray(item)) || {}
    let children = args.find((item) => types.isArray(item)) || []

    let {tag, attrs} = utils.parse_selector(selector)

    let node = hashish.document.createElement(tag)

    attrs.className = utils.class_names(
        attrs.className,
        props.class || {},
        props.className || {}
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
            child = hashish.document.createTextNode(child)
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

module.exports = function(document = this.document) {
    hashish.document = document
    return hashish
}
