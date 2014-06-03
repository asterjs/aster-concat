# aster-concat
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Concatenate scripts with aster.

## Usage

First, install `aster-concat` as a development dependency:

```shell
npm install --save-dev aster-concat
```

Then, add it to your build script:

```javascript
var aster = require('aster');
var concat = require('aster-concat');

aster.src('src/**/*.js')
.map(concat('output.js'))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

## API

### concat(fileName)

#### fileName
Type: `String`
Default: `'built.js'`

Name of output file.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-concat
[npm-image]: https://badge.fury.io/js/aster-concat.png

[travis-url]: http://travis-ci.org/asterjs/aster-concat
[travis-image]: https://secure.travis-ci.org/asterjs/aster-concat.png?branch=master
