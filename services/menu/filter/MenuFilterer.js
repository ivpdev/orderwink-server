const _ = require('lodash')
const TraitsMatcher = require('./TraitsMatcher')
const CaloriesMatcher = require('./CaloriesMatcher')
const IngredientsMatcher = require('./IngredientsMatcher')

const MenuFilterer = {
    filter: function(menu, traits, categories, calories) {
        const categoriesWithFilteredItems = _.map(menu, category => {
            const result = _.cloneDeep(category)

            result.items = _.filter(category.items, item => {
                return TraitsMatcher.matches(item, traits)
                       && CaloriesMatcher.matches(item, calories)
                       && IngredientsMatcher.matches(item, null)
            })

            return result
        })

        return _.filter(categoriesWithFilteredItems, category => !_.isEmpty(category.items))
    }
}

module.exports = MenuFilterer