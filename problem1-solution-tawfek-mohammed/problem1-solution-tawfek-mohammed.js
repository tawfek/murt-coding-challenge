var fs = require('fs');

/**
 * How to use 
 * options :
 * [-i][--ingredients] : select the ingredients , we have 5 ingredients , and we can list them (optional , default : 1)
 * [-f][--file] : select the file that contains the fridge data (optional : default : inputs.json)
 * [-l][--list] : list all ingredients with ingredients number and items (optional)
 * 
 * commands examples : 
 *  node [filename].js 
 * 
 * node [filename].js -i 3
 * node [filename].js --ingredients 2
 * 
 * node [filename].js -f inputs.json
 * node [filename].js --file inputs.json
 * 
 * node [filename].js -f inputs.json -i 4
 * 
 * node [filename].js -l
 * node [filename].js --list
 */


/**
 * 
 * @param {Array.<String>} fridge  array contains list of strings | food name
 * @param {Array.<String>} ingredients - array contins list of strings | Recipe food name
 * @returns {bool} ValidRecipe
 */

 ingredients = [['tomato','apple', 'onion'], ['tomato','banana', 'onion'],['onion','tomato'], ['banana','32'],['apple']]


function validateRecipe(fridge,ingredients){
    // declare ValidRecipe as true 
    var ValidRecipe = true ;
    // for each item in ingredients 
    ingredients.forEach((recipeItem,i) => {
        // Check if recipe item exists in fridge 
        validateRecipeC = fridge.indexOf(recipeItem.toLowerCase());
        if(validateRecipeC == -1){

            // if not exist set ValidRecipe to false and break the loop
            ValidRecipe = false 
            return 
        }
    });
    return ValidRecipe 
}


let ReadInputFile = (path = 'inputs.json') => {
    try {
        var data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return false;
    }
}
class ErrorException extends Error {
    constructor(args, type) {
        super(args);
        this.ERROR_TYPE = type
    }
}

class SuccessException extends Error {
  constructor(args,response) {
      super(args);
      this.SUCCESS = "SUCCESS"
      this.VALID_RECIPE = (response)?"RECIPE FOUND IN THE FRIDGE":"ingredients are not found in the fridge"
      this.RETURNED_VALUE = response
  }
}
var arguments = process.argv.slice(2);
try {

    // Handle file name arguments search for (-f,--file) arg
    var fileArg = arguments.indexOf('--file') == -1
        ? arguments.indexOf('-f')
        : arguments.indexOf('--file');;

    // get the file name
    var fileName = (fileArg !== -1)
        ? arguments[fileArg + 1]
        : 'inputs.json';

    // throw error exception when call file argument and not typed the file name
    if (!fileName) {
        throw new ErrorException('NO_FILE_SELECTED', 'FILE_ERROR')
    }
        

        // display the list of ingredients
        var listArg = arguments.indexOf('--list') == -1
        ? arguments.indexOf('-l')
        : arguments.indexOf('--list');;



        // Handle ing
        var ingredientsArg = arguments.indexOf('--ingredients') == -1
        ? arguments.indexOf('-i')
        : arguments.indexOf('--ingredients');;

    // get the file name
    var ingredientsDataArg = (ingredientsArg !== -1)
        ? arguments[ingredientsArg + 1]
        : ingredients;

        // check is list command called
      if(listArg ==-1){

    var selectIngredients = (ingredientsDataArg<=5 && ingredientsDataArg>0)?ingredientsDataArg:1 ;

    if(!selectIngredients){
     
            throw new ErrorException('ingredients_not_found : there are 5 ingredients , choose one ingredients at least  ', 'ingredients_error');
        
    }
    // Read file by file name | path
    var data = ReadInputFile('inputs.json');

    // throw error if file not found or unable to read
    if (!data) {
        throw new ErrorException('FILE_NOT_FOUND_OR_INVALID', 'FILE_ERROR');
    }
    
    // get the first fridge food from data
    let firstFridge = data['fridge'];
    if((validateRecipe(firstFridge,ingredients[selectIngredients]))){
        throw new SuccessException('success',true)
    }else{
        throw new SuccessException('success',false)

    }

}else{


    // display ingredients lists
    ingredients.forEach((item,i)=>{
        let listItems = '' 
        item.forEach((itemList,i)=>{
            // check its not the last item in the list 
            if((item.length-1) !=i){
                itemList+=','
            }
            listItems+= itemList
        })
        console.log(i,'-',listItems)
    })

}

}catch(e){
    if(e.SUCCESS){
        response = {
            'status': 'success' ,
            'message':e.VALID_RECIPE ,
            'RETURNED_VALUE' : e.RETURNED_VALUE
          }
    }else{
        response = {
            'status': 'error',
            'error_name': e.ERROR_TYPE,
            'message': e.message,
        }

        response = e 
    }

    console.log(response)
}