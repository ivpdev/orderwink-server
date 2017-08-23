
enum Trait {
    lowCalories,
    drinks,
    food, //non drinks
    cheap,
    vegan,
    vegetarian,
    kids,
    halal,
    kosher
    lactose-free
}

class Per100g {
    calories: integer
    fat: integer
    protein: integer
    carbohydrates: integer
}

class Item {
    name: string
    category: string
    traits: Set<Trait>
    per100g: Per100g
}