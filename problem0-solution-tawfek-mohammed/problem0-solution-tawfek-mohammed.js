var fs = require('fs');
/**
 * How to use :
 *  options :
 *  [-i] [--item] : the item name to search in the fridge (required)
 * [-f] [--file] : the file name to search in (optional , default inputs.json)
 * the file MUST HAVE fridge object
 * 
 * examples : 
 *  node [filename].js --item banana
 *  node [filename].js -i banana 
 * 
 * node [filename].js -f inputs.json -item apple
 * node [filename].js -file inputs.json -i apple
 * 
 */

/**
 * whereIsMyFood return the item index in the fridge
 *
 * @param {Array.<string>} fridge The fridge data that contains the food
 * @param {String} item The name of the food to search for in the fridge
 *
 * @returns {integer} Returns the index of item in the fridge
 * @tawfek
 */
let whereIsMyFood = (fridge, item) => {
    var itemIndex = -1;
    var FridgeCap = fridge.length;
    while (FridgeCap--) {
        if (fridge[FridgeCap].toLowerCase() == item.toLowerCase()) {
            itemIndex = FridgeCap;
            break;
        }
    }
    return itemIndex;
}

class ErrorException extends Error {
    constructor(args, type, val = '',item) {
        super(args);
        this.ERROR_TYPE = type
        this.ITEM_NAME = item 
        this.RETURNED_VALUE = val
    }
}

class SuccessException extends Error {
  constructor(args, item ,i) {
      super(args);
      this.SUCCESS = "SUCCESS"
      this.ITEM_NAME = item ;
      this.ITEM_INDEX =  i ;
  }
}

let ReadInputFile = (path = 'input.json') => {
    try {
        var data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return false;
    }
}


// get arguments from command line - and skip first 2 item
var arguments = process
    .argv
    .slice(2);

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

    // Handle item to search arguments search for (-i,--item) arg
    var itemArg = arguments.indexOf('--item') == -1
        ? arguments.indexOf('-i')
        : arguments.indexOf('--item');

    // get item name to search for
    var itemNameArg = (itemArg != -1)
        ? arguments[itemArg + 1]
        : false;
    if (!itemNameArg) {
        throw new ErrorException('NO_ITEM_SELECTED', 'ITEM_ERROR')
    }

    // Read file by file name | path
    let data = ReadInputFile(fileName);

    // throw error if file not found or unable to read
    if (!data) {
        throw new ErrorException('FILE_NOT_FOUND_OR_INVALID', 'FILE_ERROR');
    }

    // get the first fridge food from data
    let firstFridge = data['fridge'];

    // find the item in the fridge
    let findItem = whereIsMyFood(firstFridge, itemNameArg);

    // if item not found throw exception
    if (findItem == -1) {
        throw new ErrorException('ITEM_NOT_FOUND_IN_FRIDGE', 'ITEM_ERROR', -1)
    } else {

        // the item found in the fridge return success message with item name and his
        // place in the fridge [index]
        throw new SuccessException('ITEM_FOUND',itemNameArg,findItem)
        

    }

} catch (error) {
  let response  ;
  if(error.SUCCESS){
    response = {
      'status': 'success' ,
      'item_name':error.ITEM_NAME ,
      'index' : error.ITEM_INDEX
    }
  }else{
    response = {
      'status': 'error',
      'error_name': error.ERROR_TYPE,
      'message': error.message,
      'RETURNED_VALUE': error.RETURNED_VALUE
  };
  }
    
    console.log(response);
}
