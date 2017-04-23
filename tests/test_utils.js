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

describe('class names normalizer', () => {
    it("should normalize a set of class names", () => {
        assert.deepEqual(
            {
                foo: true
            },
            h.normalize_class_names('foo')
        )

        assert.deepEqual(
            {
                foo: true,
                bar: true,
                baz: true
            },
            h.normalize_class_names('foo bar  baz')
        )

        assert.deepEqual(
            {
                foo: true,
                'bar-1': true
            },
            h.normalize_class_names(['foo', 'bar-' + 1])
        )

        assert.deepEqual(
            {
                foo: true,
                bar: false
            },
            h.normalize_class_names({foo: true, bar: false})
        )

        assert.deepEqual(
            {
                foo: true,
                bar: false
            },
            h.normalize_class_names({foo: 1, bar: 0})
        )
    })
})
