const assert = require('assert')
const IngredientsMatcher = require('../../../../services/menu/filter/IngredientsMatcher') //TODO configure correct root

describe('IngredientsMatcher', function() {
  describe('#match', function() {
    it('should return 1 if *all* of desired ingredients *match* correspondent item ingredients withing given error range',
        function() {

        //TODO check how ingredients are written on real food
        //TODO all ingredients singular
        //TODO Nutrition Facts

            const item = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                    fat: 10,
                    carbohydrates: 15,
                    protein: 10
                },
                price: 5.99
            }

            const exactlyMatchingIngs = {
                fat: 10,
                carbohydrates: 15,
                protein: 10
            }

            const roughlyMatchingIngs = {
                fat: 11,
                carbohydrates: 16,
                protein: 11
            }

            assert.equal(IngredientsMatcher.matches(item, exactlyMatchingIngs), 1)
            assert.equal(IngredientsMatcher.matches(item, roughlyMatchingIngs, 10), 1)
            assert.equal(IngredientsMatcher.matches(item, roughlyMatchingIngs, 30), 1)
            assert.equal(IngredientsMatcher.matches(item, roughlyMatchingIngs, 5), 0)
    });

    //TODO test error

    it('should return 0.5 if *some* of desired ingredients *match* correspondent item ingredients' +
            "and *some* of them *don't have* corresponding ingredients defined for the item.",
        function() {
            const desired = {
                fat: 10,
                carbohydrates: 15,
                protein: 10
            }

            const itemWithMissing = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                    fat: 10,
                    protein: 10
                },
                price: 5.99
            }

            const itemWithMissingAndSmallError = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                    fat: 11,
                    protein: 10
                },
                price: 5.99
            }

            const itemWithMissingAndBigError = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                    fat: 15,
                    protein: 10
                },
                price: 5.99
            }

            const itemWithTwoMissing = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                    fat: 10
                },
                price: 5.99
            }

            assert.equal(IngredientsMatcher.matches(itemWithMissing, desired), 0.5)
            assert.equal(IngredientsMatcher.matches(itemWithMissingAndSmallError, desired), 0.5)
            assert.equal(IngredientsMatcher.matches(itemWithMissingAndBigError, desired), 0)
            assert.equal(IngredientsMatcher.matches(itemWithTwoMissing, desired), 0.5)
    });

    it('should return 0 if *all* of desired ingredients has *non-matching* correspondent ingredients',
        function() {
            const desired = {
                fat: 10,
                carbohydrates: 15,
                protein: 10
            }

            const item = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                    fat: 15,
                    carbohydrates: 35,
                    protein: 2
                },
                price: 5.99
            }


            assert.equal(IngredientsMatcher.matches(item, desired), 0)

    });

    it('should return 0 if *any* of desired ingredients has *non-matching* correspondent ingredients',
        function() {
            const desired = {
                fat: 10,
                carbohydrates: 15,
                protein: 10
            }

            const item = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                    fat: 10,
                    carbohydrates: 35,
                    protein: 10
                },
                price: 5.99
            }

            assert.equal(IngredientsMatcher.matches(item, desired), 0)

    });

    it("should return 0 if *all* of desired ingredients *don't have* corresponding ingredients defined for an item.",
        function() {
            const desired = {
                fat: 10,
                carbohydrates: 15,
                protein: 10
            }

            const item = {
                name: 'Pizza Panna',
                description: 'mit Salami',
                calories: 300,
                ingredients: {
                },
                price: 5.99
            }

            assert.equal(IngredientsMatcher.matches(item, desired), 0)
    });


  });
});

