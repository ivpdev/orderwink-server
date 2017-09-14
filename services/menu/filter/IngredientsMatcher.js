const _ = require('lodash')

const defaultErrorTolerancePercent = 20

const equalsWithTolerance = (testee, desired, errorTolerancePercent) => {
    const desiredMax = testee + testee * (errorTolerancePercent / 100)
    const desiredMin = testee - testee * (errorTolerancePercent / 100)

    return desired >= desiredMin && desired <= desiredMax
}

const matches = (item, ingredients, errorTolerancePercent) => {
    const desiredFat = ingredients.fat
    const desiredProtein = ingredients.protein
    const desiredCarbohydrates = ingredients.carbohydrates
    const itemFat = item.ingredients && item.ingredients.fat
    const itemProtein = item.ingredients && item.ingredients.protein
    const itemCarbohydrates = item.ingredients && item.ingredients.carbohydrates

    const desiredButMissing = {}
    const matches = {}
    const notInterested = {}

    notInterested.fat = desiredFat == undefined
    desiredButMissing.fat = (desiredFat != undefined) && (itemFat == undefined)
    matches.fat = notInterested.fat || equalsWithTolerance(itemFat, desiredFat, errorTolerancePercent)

    notInterested.protein = desiredProtein == undefined
    desiredButMissing.protein = (desiredProtein != undefined) && (itemProtein == undefined)
    matches.protein = notInterested.protein || equalsWithTolerance(itemProtein, desiredProtein, errorTolerancePercent)

    notInterested.carbohydrates = desiredCarbohydrates == undefined
    desiredButMissing.carbohydrates = (desiredCarbohydrates != undefined) && (itemCarbohydrates == undefined)
    matches.carbohydrates = notInterested.carbohydrates || equalsWithTolerance(itemCarbohydrates, desiredCarbohydrates, errorTolerancePercent)

    const ingredientTypes = ['fat', 'protein', 'carbohydrates']

    const anyDoesntMatchMatch = !!_.find(ingredientTypes, ingredientType => {
        const thisMatches = matches[ingredientType]
        const thisDesiredButMissing = desiredButMissing[ingredientType]
        const thisNotInterested = notInterested[ingredientType]

        return !thisMatches && !thisDesiredButMissing && !thisNotInterested })

    const anyDesiredButMissing = !!_.find(ingredientTypes, ingredientType => desiredButMissing[ingredientType])
    const allDesiredButMissing = !!_.every(ingredientTypes, ingredientType => desiredButMissing[ingredientType])

    if (anyDoesntMatchMatch || allDesiredButMissing) {
        return 0
    } else if(anyDesiredButMissing) {
        return 0.5
    } else {
        return 1
    }
}

const IngredientsMatcher = {
    matches: function(item, ingredients, errorTolerancePercent) {
        var effectiveErrorTolerancePercent = errorTolerancePercent

        if (!_.isNumber(errorTolerancePercent)
            || errorTolerancePercent < 0
            || errorTolerancePercent > 100) {
            effectiveErrorTolerancePercent = defaultErrorTolerancePercent
        }

        return matches(item, ingredients, effectiveErrorTolerancePercent)
    }
}

module.exports = IngredientsMatcher