'use strict';

var aster = require('aster'),
	map = aster.map,
	Promise = aster.Promise;

module.exports = function (fileName) {
	fileName = fileName || 'built.js';

	return function (asts) {
		return [{
			type: 'File',
			program: {
				type: 'Program',
				body: Promise.reduce(
					map(asts, function (ast) {
						return Promise.cast(ast.program).then(function (program) {
							return program.body;
						});
					}),
					function (body, bodyPart) { return body.concat(bodyPart) },
					[]
				)
			},
			loc: {
				source: fileName
			}
		}];
	};
};
