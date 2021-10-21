echo Testing : search an exist item using -i argument  - should return success
node problem0-solution-tawfek-mohammed.js -i banana
echo ---------------------------------
echo Testing : search an exist item using --item argument  - should return success
node problem0-solution-tawfek-mohammed.js --item apple
echo ---------------------------------
echo Testing : search not exist item using --item argument  - should return error
node problem0-solution-tawfek-mohammed.js --item meat
echo ---------------------------------
echo Testing : search a numeric item using --item argument  - should return error
node problem0-solution-tawfek-mohammed.js --item 33233
echo ---------------------------------
echo Testing : search an exist item with file name inputs.json using -f argument - should return success
node problem0-solution-tawfek-mohammed.js -f inputs.json -i onion
echo ---------------------------------
echo Testing : search exist item with file name inputs.json  using --file argument  - should return success
node problem0-solution-tawfek-mohammed.js --file inputs.json -i Melons
echo ---------------------------------
echo Testing : search in a file that not exist using -f  - should return error
node problem0-solution-tawfek-mohammed.js -f not_a_file.json -i banana
echo ---------------------------------
echo End of test  , this is not a unit testing 
$SHELL