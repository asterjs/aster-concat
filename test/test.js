/* global describe, it */

'use strict';

var assert = require('assert'),
	aster = require('aster'),
	parse = require('esprima').parse,
	concat = require('..');

describe('Transformation', function () {
	function testConcat(givenFileName, expectedFileName) {
		return aster.parse([
			{code: {path: 'a.js', contents: new Buffer('var x = 1;')}},
			{code: {path: 'b.js', contents: new Buffer('var y = x + 1;')}}
		])
		.then(concat(givenFileName))
		.then(aster.wait)
		.then(function (asts) {
			assert.equal(asts.length, 1);

			var ast = asts[0];
			assert.equal(ast.loc.source, expectedFileName);

			return aster.traverse(ast.program, {
				enter: function (node, key) {
					if (key === 'loc') {
						return aster.traverse.REMOVE;
					}
				}
			}).then(function (program) {
				console.log(require('util').inspect({
					a: program,
					b: parse('var x = 1; var y = x + 1;')
				}, {colors: true, depth: 4}));
				assert.deepEqual(program, parse('var x = 1; var y = x + 1;'))
			});
		});
	}

	it('concatenates with given output name', function () {
		return testConcat('lib.js', 'lib.js');
	});

	it('concatenates with "built.js" as default name', function () {
		return testConcat(undefined, 'built.js');
	});
});
