const assert = require('assert')
const hashish = require('../index.js')
const h = hashish.h
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
                ':email#foo.bar',
                {
                    className: 'baz',
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
            h(':checkbox', {checked: false}).outerHTML
        )

        assert.equal(
            '<option selected="true"></option>',
            h('option', {selected: true}).outerHTML
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

    it("should properly render component", () => {
        class ListComponent {
            constructor(list) {
                this.list = list
            }

            render() {
                return h('ol', this.list.map((item) => new ItemComponent(item)))
            }
        }

        class ItemComponent {
            constructor(item) {
                this.item = item
            }

            render() {
                return h('li', [this.item])
            }
        }

        var dummy = document.createElement('div')
        var list_component = new ListComponent(['Alpha', 'Beta', 'Gamma'])
        hashish.render(dummy, list_component)
        assert.equal(
            '<ol><li>Alpha</li><li>Beta</li><li>Gamma</li></ol>',
            dummy.innerHTML
        )

        list_component.list = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon']
        hashish.replace(dummy.children[0], list_component)
        assert.equal(
            '<ol><li>Alpha</li><li>Beta</li><li>Gamma</li><li>Delta</li><li>Epsilon</li></ol>',
            dummy.innerHTML
        )
    })
})
