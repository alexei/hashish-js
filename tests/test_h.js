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

        assert.equal(
            '<div style="font-size: 12px; color: rgb(252, 0, 0);"></div>',
            h({style: 'font-size: 12px; color: #fc0000;'}).outerHTML
        )

        assert.equal(
            '<div style="font-size: 12px; color: rgb(252, 0, 0);"></div>',
            h({style: {fontSize: '12px', color: '#fc0000'}}).outerHTML
        )
    })

    it("should return proper node with children", () => {
        assert.equal(
            '<div>Hello world!</div>',
            h(['Hello world!']).outerHTML
        )

        assert.equal(
            '<div class="foo">Hello world!</div>',
            h({className: 'foo'}, ['Hello world!']).outerHTML
        )

        assert.equal(
            '<p>Hello world!</p>',
            h('p', ['Hello world!']).outerHTML
        )

        assert.equal(
            '<p>Hello <b>world</b>!</p>',
            h('p', ['Hello ', h('b', ['world']), '!']).outerHTML
        )
    })
})
