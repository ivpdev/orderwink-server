const _ = require('lodash')

const containsAll = (arrA, arrB) => {
    if (_.isEmpty(arrB)) {
        return true
    } else {
        for (var i=0; i < arrB.length; i++) {
           let elB = arrB[i]
           let found = _.includes(arrA, elB)

           if (!found) return false
        }

        return true
    }
}

const TraitsMatcher = {
    matches: function(item, traits) {
        const itemTraits = _.isArray(item.traits) ? item.traits.slice() : []
        const desiredTraits = _.isArray(traits) ? traits.slice() : []

        return containsAll(itemTraits, desiredTraits)
    }
}

module.exports = TraitsMatcher