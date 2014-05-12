# aster-concat
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Concat with aster.

## Usage

First, install `aster-concat` as a development dependency:

```shell
npm install --save-dev aster-concat
```

Then, add it to your build script:

```javascript
var concat = require('aster-concat');

aster
    .src('src/**/*.js')
    .then(concat({
        from: /^p_(.*)$/,
        to: '$1'
    }))
    .then(aster.dest('dist'));
```

## API

### concat(options)

#### options.from
Type: `RegExp`

Pattern for identifiers you want to rename.

#### options.to
Type: `String` | `Function`

Replacement for given identifier patterns.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-concat
[npm-image]: https://badge.fury.io/js/aster-concat.png

[travis-url]: http://travis-ci.org/asterjs/aster-concat
[travis-image]: https://secure.travis-ci.org/asterjs/aster-concat.png?branch=master