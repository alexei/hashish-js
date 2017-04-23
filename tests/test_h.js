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
    })
})
