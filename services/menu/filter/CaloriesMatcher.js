const _ = require('lodash')

const toNumber = (val) => {
    try {
        return parseFloat(val)
    } catch(e) {
        return NaN
    }
}

//TODO return possibly matched
//TODO augmentation

const CaloriesMatcher = {
    matches: function(item, calories) {
        const itemCalories = toNumber(item.calories)
        const desiredCalories = toNumber(calories)

        if (isNaN(desiredCalories)) return true
        if (!isNaN(desiredCalories) && isNaN(itemCalories)) return false
        if (itemCalories <= desiredCalories) return true
        return false
    }
}

module.exports = CaloriesMatcher
