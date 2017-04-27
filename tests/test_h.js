const assert = require('assert')
const h = require('../index.js')
const jsdom = require('mocha-jsdom')

describe('hashish', () => {
    jsdom()

    it("should return proper node for simple selectors", () => {
        assert.equal(
            '<div></div>',
            h().outerHTML
        )

        assert.equal(
            '<br>',
            h('br').outerHTML
        )
    })

    it("should return proper node for mixed selectors", () => {
        assert.equal(
            '<div id="foo"></div>',
            h('#foo').outerHTML
        )

        assert.equal(
            '<div class="foo"></div>',
            h('.foo').outerHTML
        )

        assert.equal(
            '<div id="foo" class="bar"></div>',
            h('#foo.bar').outerHTML
        )
    })

    it("should return proper node with attributes", () => {
        assert.equal(
            '<input id="foo" class="bar baz" type="email" placeholder="Email">',
            h(
                'input#foo.bar',
                {
                    className: 'baz',
                    type: 'email',
                    placeholder: "Email"
                }
            ).outerHTML
        )

        assert.equal(
            '<div class="foo baz qux"></div>',
            h(
                '.foo',
                {
                    'class': ['bar', 'baz'],
                    className: {
                        bar: false,
                        qux: true
                    }
                }
            ).outerHTML
        )

        assert.equal(
            '<input type="checkbox">',
            h('input', {type: 'checkbox', checked: false}).outerHTML
        )

        assert.equal(
            '<input type="checkbox" checked="true">',
            h('input', {type: 'checkbox', checked: true}).outerHTML
        )
    })
})
