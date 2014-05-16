'use strict';

var aster = require('aster'),
	map = aster.map,
	Promise = aster.Promise;

module.exports = function (fileName) {
	fileName = fileName || 'built.js';

	return function (asts) {
		var whenBody = Promise.reduce(
			map(asts, function (ast) { return ast.program.body }),
			function (body, bodyPart) { return body.concat(bodyPart) },
			[]
		);

		return whenBody.then(function (body) {
			return [{
				type: 'File',
				program: {
					type: 'Program',
					body: body
				},
				loc: {
					source: fileName
				}
			}];
		});
	};
};
