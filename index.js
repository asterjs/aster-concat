'use strict';

var Rx = require('rx');

module.exports = function (fileName) {
	fileName = fileName || 'built.js';

	return function (files) {
		return files
			.flatMap(function (file) { return Rx.Observable.fromArray(file.program.body) })
			.toArray()
			.map(function (body) {
				return {
					type: 'File',
					program: {
						type: 'Program',
						body: body
					},
					loc: {
						source: fileName
					}
				};
			});
	}
};
