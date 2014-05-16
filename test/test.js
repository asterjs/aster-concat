/* global describe, it */

'use strict';

var aster = require('aster'),
	Promise = aster.Promise,
	assert = require('chai').assert,
	parse = require('esprima').parse,
	concat = require('..');

Promise.longStackTraces();

describe('Transformation', function () {
	function testConcat(givenFileName, expectedFileName) {
		return aster.src('test/fixtures/+(a|b).js')
			.then(concat(givenFileName))
			.then(Promise.all)
			.then(function (asts) {
				assert.equal(asts.length, 1);

				var ast = asts[0];
				assert.equal(ast.loc.source, expectedFileName);

				return asts;
			})
			.then(aster.traverse({
				enter: function (node) {
					delete node.loc;
				}
			}))
			.then(Promise.all)
			.then(function (asts) {
				assert.deepEqual(asts[0].program, parse('var x = 1; var y = x + 1;'));
			});
	}

	it('concatenates with given output name', function () {
		return testConcat('lib.js', 'lib.js');
	});

	it('concatenates with "built.js" as default name', function () {
		return testConcat(undefined, 'built.js');
	});
});
