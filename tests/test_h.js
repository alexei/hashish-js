const assert = require('assert')
const h = require('../index.js')
const jsdom = require('mocha-jsdom')

describe('hashish', () => {
    jsdom()

    it("should return proper HTML code", () => {
        assert.equal(
            '<div></div>',
            h().outerHTML
        )

        assert.equal(
            '<br>',
            h('br').outerHTML
        )

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
})
