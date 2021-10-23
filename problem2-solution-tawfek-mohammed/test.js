let validateRecipeWithQuantity = (fridge, ingredient) => {

    // check if all ingredients items are in fridge or not 
    let checkQuantity = true

    try {
    for (var item in ingredient) {
        // check item if exist in fridge else return false
        if (!fridge[item]) {
            checkQuantity = false
            break;

        } else {
            // the item found in fridge 
            let itemQuantityInFridge = fridge[item];
            let itemQuantityInIngredients = ingredient[item]
            // now checking for Quantity
            if (itemQuantityInIngredients > itemQuantityInFridge) {
                checkQuantity = false
                break;
            }
        }
    }
    return checkQuantity
}catch (e) {
    return false 
}
}

var data = {
    "fridge": {
      "tomato": 2,
      "onion": 2,
      "apple": 3,
      "banana": 5
    },
    "ingredients": [
      {
        "tomato": 1,
        "onion": 2
      },
      {
        "tomato": 3,
        "onion": 2,
        "apple": 3
      },
      {
        "tomato": 2,
        "onion": 2
      },
      {
        "sugar": 1,
        "milk": 2,
        "banana": 2
      },
      {
        "apple": 2
      }
    ]
  }  


test("validate small Quantity , should return true ", () => {
    expect(validateRecipeWithQuantity(data['fridge'],data['ingredients'][0])).toBeTruthy();
  });

test("validate large Quantity , should return false ", () => {
    expect(validateRecipeWithQuantity(data['fridge'],data['ingredients'][1])).toBeFalsy();
  });

  test("validate unavailable ingredients , should return false ", () => {
    expect(validateRecipeWithQuantity(data['fridge'],data['ingredients'][3])).toBeFalsy();
  });

  test("validate unvalid ingredients data , should return false ", () => {
    expect(validateRecipeWithQuantity(data['fridge'],data['ingredients'])).toBeFalsy();
  });

