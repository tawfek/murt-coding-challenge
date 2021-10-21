var fs = require('fs');
/**
 * How to use : 
 *  options : 
 * [-i] [--item] : the item name to search in the fridge (required)
 * [-f] [--file] : the file name to search in (optional , default inputs.json)
 * the file MUST HAVE at least one array that contains fridge object 
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
let whereIsMyFood =  (fridge,item)=>{
  var itemIndex = -1  ;
  var FridgeCap = fridge.length ;
  while (FridgeCap--) {
      if(fridge[FridgeCap]==item){
          itemIndex = FridgeCap ;
          break ;
      } }    
  return itemIndex ;
}




class Exception extends Error{
  constructor(args,type,val=''){
    super(args);
    this.ERROR_TYPE = type
    if(val!=''){
    this.RETURNED_VALUE = val
    }
  }
}


let ReadInputFile = (path='input.json')=>{
  try {  
    var data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);    
} catch(e) {
    return false ;
}
}

var arguments = process.argv.slice(2); 


try {
  


// Handle file name arguments search for (-f,--file) arg
var fileArg = arguments.indexOf('--file')==-1 ? arguments.indexOf('-f') : arguments.indexOf('--file') ; ;

// get the file name 
var fileName=(fileArg !== -1)?arguments[fileArg+1]:'inputs.json';

// throw error exception when call file argument and not typed the file name
if(!fileName){
  throw new Exception('NO_FILE_SELECTED','FILE_ERROR')
}


// Handle item to search arguments search for (-i,--item) arg
var itemArg = arguments.indexOf('--item')==-1 ? arguments.indexOf('-i') : arguments.indexOf('--item') ;

// get item name to search for
var itemNameArg = (itemArg != -1)?arguments[itemArg+1]: false ;
  if(!itemNameArg){
  throw new Exception('NO_ITEM_SELECTED','ITEM_ERROR')
  }
  

  // Read file by file name | path
  let data = ReadInputFile(fileName) ;

  // throw error if file not found or unable to read 
  if(!data){throw new Exception('FILE_NOT_FOUND_OR_INVALID','FILE_ERROR');}


  // get the first fridge food from data 
  let firstFridge = data[0]['fridge'] ;


  // find the item in the fridge 
  let findItem = whereIsMyFood(firstFridge, itemNameArg);


  // if item not found throw exception 
  if(findItem==-1){
    throw new Exception('ITEM_NOT_FOUND','ITEM_ERROR',-1)
  }else{

    // the item found in the fridge return sucess message with item name and his place 
    // in the fridge [index] 
    let RESPONSE = {'status':'success','item':itemNameArg,'index':findItem} ;
    console.log(RESPONSE) ;

  }
  

} catch (error) {
    let errorAr = {'status':'error','error_type':error.ERROR_TYPE,'message':error.message,'RETURNED_VALUE':error.RETURNED_VALUE} ;
    console.log(errorAr) ;
}






