function validateRecipe(fridge, ingredients) {
    // declare ValidRecipe as true 
    var ValidRecipe = true;
    try{
    // for each item in ingredients 
    ingredients.forEach((recipeItem, i) => {
        // Check if recipe item exists in fridge 
        validateRecipeC = fridge.indexOf(recipeItem.toLowerCase());
        if (validateRecipeC == -1) {

            // if not exist set ValidRecipe to false and break the loop
            ValidRecipe = false
            return
        }
    });
    return ValidRecipe
}catch(e){
    return false ;
}
}
var data = {
    "fridge": [
        "apple",
        "Berries",
        "Melons",
        "oranges",
        "raspberries",
        "blueberries",
        "kiwifruit",
        "onion",
        "lettuce",
        "tomato"
    ],
   "ingredients": [
        ["tomato", "apple", "onion"],
        ["tomato", "banana", "onion"],
        ["onion", "tomato"],
        ["banana", "32"],
        ["apple"]
    ]
}

test('validate recipe with first ingredients , should return true  ', () => {
    expect(validateRecipe(data['fridge'],data['ingredients'][0])).toBeTruthy();
  });

test('validate recipe with fourth ingredients , should return false  ', () => {
    expect(validateRecipe(data['fridge'],data['ingredients'][3])).toBeFalsy();
  });

test('validate recipe with wrong ingredients , should return false  ', () => {
    expect(validateRecipe(data['fridge'],data['ingredients'])).toBeFalsy();
  });

  test('validate recipe with last ingredients , should return true  ', () => {
    expect(validateRecipe(data['fridge'],data['ingredients'][4])).toBeTruthy();
  });
