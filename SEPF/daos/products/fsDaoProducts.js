import fsContainer from '../../containers/fsContainer'

class fsDaoProducts extends fsContainer {
    constructor() {
        console.log('You are in fsDaoProducts')
        super('products.json')
    }
}

export default fsDaoProducts