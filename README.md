# Hashish

HyperScript template language for JavaScript.

## Example

    const hashish = require('@alexei/hashish')(document)
    const h = hashish.createElement

    h('form', {action: '/auth', method: 'post'}, [
      h('.form-group', [
        h('label', {'for': 'auth-email'}, "Email address"),
        h(':email.form-control#auth-email', {placeholder: "Email"})
      ]),
      h('.form-group', [
        h('label', {'for': 'auth-password'}, "Password"),
        h(':password.form-control#auth-password', {placeholder: "Password"})
      ]),
      h('.checkbox', [
        h('label', [h(':checkbox', {name: 'remember_me'}), "Keep me logged in"])
      ]),
      h(':submit.btn btn-default', {value: "Log in"})
    ])

Yields:

    <form action="/auth" method="post">
      <div class="form-group">
        <label for="auth-email"></label>
        <input id="auth-email" class="form-control" type="email" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="auth-password"></label>
        <input id="auth-password" class="form-control" type="password" placeholder="Password">
      </div>
      <div class="checkbox">
        <label><input type="checkbox" name="remember_me">Keep me logged in</label>
      </div>
      <input class="btn btn-default" type="submit" value="Log in">
    </form>

Hashish should run in any environment where a DOM implementation is available. If you're on NodeJS, you might need a third party package like [tmpvar/jsdom](https://github.com/tmpvar/jsdom).

## API

### createElement(tag[, attrs[, children]])

Creates a new `HTMLElement`.

The `tag` argument specifies the tag name, a list of class names, an ID and possibly a type if one intends to create input tags. If left empty, it defaults to `div`.

    h('')
    > <div></div>

    h('.foo.bar#baz')
    > <div class="foo bar" id="baz"></div>

    h(':email')
    > <input type="email">

The `attrs` argument allows one to specify a dictionary of attributes the resulting node should have:

    h('form', {method: 'post'})
    > <form method="post"></form>

Any value that evaluates to `false` will be omitted:

    h(':checkbox', {checked: false})
    > <input type="checkbox">

The `children` argument represents an array of children that should be appended to the resulting node. See explanation on [children](#children) below.

#### Selectors

Hashish supports tag (defaults to `div`), class and ID selectors.

Additionally, the following nonstandard pseudo-elements are supported: `:button`, `:checkbox`, `:color`, `:date`, `:datetime-local`, `:email`, `:file`, `:hidden`, `:image`, `:month`, `:number`, `:password`, `:radio`, `:range`, `:reset`, `:search`, `:submit`, `:tel`, `:text`, `:time`, `:url`, `:week`. Each results in an `input` tag with the appropriate `type` attribute. They are provided as syntactic sugar i.e. instead of:

    h('input', {type: 'number'})

One would write:

    h(':number')
    > <input type="number">

#### Class names

Class names can be specified alongside the `tag` name or in the `attrs` argument. The `class` (or `className`) attribute can either be string:

    h('.foo', {class: 'bar baz'})
    > <div class="foo bar baz"></div>

An array:

    var bazClass = 'baz'
    h('div.foo', {class: ['bar', bazClass]})
    > <div class="foo bar baz"></div>

Or an object:

    var includeBaz = false
    h('.foo.bar', {class: {baz: includeBaz})
    > <div class="foo bar"></div>

#### Children

A child can either be a string, an `HTMLElement`, or any other object that implements a `render` and returns a value of a similar type:

    class List {
      constructor(list) {
        this.list = list
      }

      render() {
        return h('ol', this.list.map((item) => new Item(item)))
      }
    }

    class Item {
      constructor(item) {
        this.item = item
      }

      render() {
        return this.item ? h('li', [this.item]): false
      }
    }

    h('.listing', [new List(['Alpha', 'Beta', null, 'Gamma'])])

Yields:

    <div class="listing">
      <ol>
        <li>Alpha</li>
        <li>Beta</li>
        <li>Gamma</li>
      </ol>
    </div>

Children that evaluate to `false` will be omitted.

### render(root, child1[, child2[, child3[, ...]]])

Helper method to append each of `children` to `root`.

### replace(oldNode, newNode)

Helper method to replace `oldNode` with `newNode`.

## Acknowledgements

Hashish was obviously inspired by [hyperhype/hyperscript](https://github.com/hyperhype/hyperscript) and [JedWatson/classnames](https://github.com/JedWatson/classnames).
