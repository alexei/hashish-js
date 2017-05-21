const assert = require('assert')
const hashish = require('../dist/index.js')
const utils = hashish.utils

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
            utils.parse_selector()
        )

        assert.deepEqual(
            {
                tag: 'div',
                attrs: {
                    id: 'foo',
                    className: []
                }
            },
            utils.parse_selector('#foo')
        )

        assert.deepEqual(
            {
                tag: 'div',
                attrs: {
                    id: null,
                    className: ['foo']
                }
            },
            utils.parse_selector('.foo')
        )

        assert.deepEqual(
            {
                tag: 'div',
                attrs: {
                    id: null,
                    className: ['foo', 'bar']
                }
            },
            utils.parse_selector('.foo.bar')
        )

        assert.deepEqual(
            {
                tag: 'svg:circle',
                attrs: {
                    id: 'foo',
                    className: ['-bar', '--baz']
                }
            },
            utils.parse_selector('svg:circle#foo.-bar.--baz')
        )
    })

    it("should correctly parse input tags", () => {
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
                utils.parse_selector(':' + type)
            )
        })
    })
})

describe('class names helpers', () => {
    it("should return a list of class names", () => {
        assert.equal(
            'foo',
            utils.class_names('foo')
        )

        assert.equal(
            'foo baz qux',
            utils.class_names('foo', ['bar', 'baz'], {bar: false, qux: true})
        )

        assert.equal(
            '',
            utils.class_names('foo', ['bar', 'baz'], {foo: 0, bar: null, baz: undefined})
        )
    })

    it("should normalize a set of class names", () => {
        assert.deepEqual(
            {
                foo: true
            },
            utils.normalize_class_names('foo')
        )

        assert.deepEqual(
            {
                foo: true,
                bar: true,
                baz: true
            },
            utils.normalize_class_names('foo bar  baz')
        )

        assert.deepEqual(
            {
                foo: true,
                'bar-1': true
            },
            utils.normalize_class_names(['foo', 'bar-' + 1])
        )

        assert.deepEqual(
            {
                foo: true,
                bar: false
            },
            utils.normalize_class_names({foo: true, bar: false})
        )

        assert.deepEqual(
            {
                foo: true,
                bar: false
            },
            utils.normalize_class_names({foo: 1, bar: 0})
        )
    })
})
