/* global describe, it */

'use strict';

var assert = require('assert'),
	Rx = require('rx'),
	parseJS = require('aster-parse-js'),
	concat = require('..'),
	generate = require('escodegen').generate,
	input = Rx.Observable.fromArray([
		{path: '1.js', contents: 'var a = function () {\n    return 1;\n};'},
		{path: '2.js', contents: 'var b = function () {\n    return 2;\n};'},
		{path: '3.js', contents: 'var c = function () {\n    return a() + b();\n};'}
	]),
	expected = input.pluck('contents').toArray().map(function (strings) { return strings.join('\n') });

function testConcat(givenFileName, expectedFileName, done) {
	Rx.Observable.return(input)
	.map(parseJS({loc: false}))
	.map(concat(givenFileName))
	.concatAll() // flattening Obs<Obs<File>> to Obs<File> for easier testing (it contains one item anyway)
	.do(function (file) {
		assert.equal(file.loc.source, expectedFileName);
	})
	.pluck('program')
	.map(generate)
	.zip(expected, assert.equal)
	.subscribe(done, done);
}

it('concatenates with given output name', function (done) {
	testConcat('lib.js', 'lib.js', done);
});

it('concatenates with "built.js" as default name', function (done) {
	testConcat(undefined, 'built.js', done);
});
