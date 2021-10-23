function whereIsMyFood(fridge, item) {
  var itemIndex = -1;
  try{
  var FridgeCap = fridge.length;
  while (FridgeCap--) {
    if (fridge[FridgeCap].toLowerCase() == item.toLowerCase()) {
      itemIndex = FridgeCap;
      break;
    }
  }
  return itemIndex;
}catch(e){
    return -1
}
}
let data = {
  fridge: ["banana","apple","Berries","Melons","oranges","raspberries","blueberries","kiwifruit","onion","lettuce","tomato","تفاح"]
};

test("search apple in fridge , should return 1", () => {
  expect(whereIsMyFood(data['fridge'],'apple')).toBe(1);
});


test("search car in fridge , should return -1", () => {
    expect(whereIsMyFood(data['fridge'],'car')).toBe(-1);
  });


test("search apple in wrong fridge data , should return -1", () => {
    expect(whereIsMyFood(data,'apple')).toBe(-1);
  });

  test("search تفاح in fridge  , should return 11", () => {
    expect(whereIsMyFood(data['fridge'],"تفاح")).toBe(11);
  });