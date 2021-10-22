echo Testing : running default values , should return success with false RETURNED_VALUE
node problem2-solution-tawfek-mohammed.js 
echo ---------------------------------

echo Testing : running ingredients number 3 , should return success with false RETURNED_VALUE
node problem2-solution-tawfek-mohammed.js -i 3
echo ---------------------------------

echo Testing : running ingredients number 2 , should return success with true RETURNED_VALUE
node problem2-solution-tawfek-mohammed.js --ingredients 2
echo ---------------------------------

echo Testing : running default ingredients [first one] ,with inputs file, should return success with false RETURNED_VALUE
node problem2-solution-tawfek-mohammed.js -f inputs.json
echo ---------------------------------

echo Testing : running ingredients number 4  ,with inputs file, should return success with true RETURNED_VALUE
node problem2-solution-tawfek-mohammed.js -f inputs.json -i 4
echo ---------------------------------

echo Testing : listing all ingredients 
node problem2-solution-tawfek-mohammed.js --list
echo ---------------------------------

echo End of test , this is not a unit testing
$SHELL