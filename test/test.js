var gitClone = require('../index')

gitClone(
	'https://github.com/SeedyROM/test_document',
	'./',
	{},
	function(err) {
		console.log(err)
	}
)
