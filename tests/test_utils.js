const assert = require('assert')
const h = require('../index.js')

describe('selector parser', () => {
    it("should correctly parse simple tag, class, id selectors", () => {
        assert.deepEqual(
            {
                tag: 'div',
                id: null,
                classes: []
            },
            h.parse_selector()
        )

        assert.deepEqual(
            {
                tag: 'div',
                id: 'foo',
                classes: []
            },
            h.parse_selector('#foo')
        )

        assert.deepEqual(
            {
                tag: 'div',
                id: null,
                classes: ['foo']
            },
            h.parse_selector('.foo')
        )

        assert.deepEqual(
            {
                tag: 'div',
                id: null,
                classes: ['foo', 'bar']
            },
            h.parse_selector('.foo.bar')
        )

        assert.deepEqual(
            {
                tag: 'svg:circle',
                id: 'foo',
                classes: ['-bar', '--baz']
            },
            h.parse_selector('svg:circle#foo.-bar.--baz')
        )
    })
})
