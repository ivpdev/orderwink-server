enum Trait {
    lowCalories,
    drinks,
    food, //non drinks
    cheap,
    vegan,
    vegetarian,
    kids,
    halal,
    kosher,
    lactose_free
}

class Per100g {
    calories: number
    fat: number
    protein: number
    carbohydrates: number
}

class Item {
    name: string
    category: string
    traits: Array<Trait>
    ingredients: Array<String>
    per100g: Per100g
}

export { Trait, Per100g, Item }