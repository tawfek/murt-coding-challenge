echo Testing : running default values , should return success with false RETURNED_VALUE
node problem1-solution-tawfek-mohammed.js 
 
echo Testing : running ingredients number 3 , should return success with false RETURNED_VALUE
node problem1-solution-tawfek-mohammed.js -i 3

echo Testing : running ingredients number 2 , should return success with true RETURNED_VALUE
node problem1-solution-tawfek-mohammed.js --ingredients 2

echo Testing : running default ingredients [first one] ,with inputs file, should return success with false RETURNED_VALUE
node problem1-solution-tawfek-mohammed.js -f inputs.json
 
echo Testing : running ingredients number 4  ,with inputs file, should return success with true RETURNED_VALUE
node problem1-solution-tawfek-mohammed.js -f inputs.json -i 4
 
echo Testing : listing all ingredients 
node problem1-solution-tawfek-mohammed.js --list
$SHELL