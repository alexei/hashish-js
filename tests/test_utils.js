const assert = require('assert')
const h = require('../index.js')

describe('selector parser', () => {
    it("should correctly parse simple tag, class, id selectors", () => {
        assert.deepEqual(
            {
                tag: 'div',
                attrs: {
                    id: null,
                    className: []
                }
            },
            h.parse_selector()
        )

        assert.deepEqual(
            {
                tag: 'div',
                attrs: {
                    id: 'foo',
                    className: []
                }
            },
            h.parse_selector('#foo')
        )

        assert.deepEqual(
            {
                tag: 'div',
                attrs: {
                    id: null,
                    className: ['foo']
                }
            },
            h.parse_selector('.foo')
        )

        assert.deepEqual(
            {
                tag: 'div',
                attrs: {
                    id: null,
                    className: ['foo', 'bar']
                }
            },
            h.parse_selector('.foo.bar')
        )

        assert.deepEqual(
            {
                tag: 'svg:circle',
                attrs: {
                    id: 'foo',
                    className: ['-bar', '--baz']
                }
            },
            h.parse_selector('svg:circle#foo.-bar.--baz')
        )
    })

    it("should correctly parse simple tag, class, id selectors", () => {
        ;['button', 'checkbox', 'color', 'date', 'datetime-local', 'email',
        'file', 'hidden', 'image', 'month', 'number', 'password', 'radio',
        'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url',
        'week'].forEach((type) => {
            assert.deepEqual(
                {
                    tag: 'input',
                    attrs: {
                        id: null,
                        className: [],
                        type: type
                    }
                },
                h.parse_selector(':' + type)
            )
        })
    })
})

describe('class names helpers', () => {
    it("should return a list of class names", () => {
        assert.equal(
            'foo',
            h.class_names('foo')
        )

        assert.equal(
            'foo baz qux',
            h.class_names('foo', ['bar', 'baz'], {bar: false, qux: true})
        )

        assert.equal(
            '',
            h.class_names('foo', ['bar', 'baz'], {foo: 0, bar: null, baz: undefined})
        )
    })

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
