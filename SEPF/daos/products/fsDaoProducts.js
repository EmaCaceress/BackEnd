const fsContainer = require('../../containers/fsContainer')

class fsDaoProducts extends fsContainer {
	constructor() {
		console.log('You are in fsDaoProducts')
		super('eccomerce')
	}
}

module.exports = fsDaoProducts