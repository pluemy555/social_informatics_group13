function getProductDetails() {
  productDetails = {};
  productDetails["carrots"] = {};
  productDetails["carrots"]["image"] = "carrots.gif";
  productDetails["carrots"]["name"] = "Carrots";
  productDetails["carrots"]["description"] = "not just for rabbits";
  productDetails["carrots"]["units"] = "1kg";
  productDetails["carrots"]["price"] = 0.99;

  productDetails["bananas"] = {};
  productDetails["bananas"]["image"] = "bananas.gif";
  productDetails["bananas"]["name"] = "Bananas";
  productDetails["bananas"]["description"] = "Yellow and banana-shaped";
  productDetails["bananas"]["units"] = "500g";
  productDetails["bananas"]["price"] = 1.29;

  productDetails["coconut"] = {};
  productDetails["coconut"]["image"] = "coconut.gif";
  productDetails["coconut"]["name"] = "Coconut";
  productDetails["coconut"]["description"] = "That exotic stuff";
  productDetails["coconut"]["units"] = "1";
  productDetails["coconut"]["price"] = 2.99;

  productDetails["apples"] = {};
  productDetails["apples"]["image"] = "apples.gif";
  productDetails["apples"]["name"] = "Apples";
  productDetails["apples"]["description"] = "Red, sweet and juicy";
  productDetails["apples"]["units"] = "1kg";
  productDetails["apples"]["price"] = 1.49;

  productDetails["cherries"] = {};
  productDetails["cherries"]["image"] = "cherries.gif";
  productDetails["cherries"]["name"] = "Cherries";
  productDetails["cherries"]["description"] = "Cherry pancake anyone?";
  productDetails["cherries"]["units"] = "500g";
  productDetails["cherries"]["price"] = 1.99;

  productDetails["tomatoes"] = {};
  productDetails["tomatoes"]["image"] = "tomatoes.gif";
  productDetails["tomatoes"]["name"] = "Tomatoes";
  productDetails["tomatoes"]["description"] = "Red and ripe";
  productDetails["tomatoes"]["units"] = "500g";
  productDetails["tomatoes"]["price"] = 1.99;

  productDetails["potatoes"] = {};
  productDetails["potatoes"]["image"] = "potatoes.gif";
  productDetails["potatoes"]["name"] = "Potatoes";
  productDetails["potatoes"]["description"] = "Boil them, bake them, mash them...";
  productDetails["potatoes"]["units"] = "1kg";
  productDetails["potatoes"]["price"] = 0.99;

  productDetails["beans"] = {};
  productDetails["beans"]["image"] = "beans.gif";
  productDetails["beans"]["name"] = "Beans";
  productDetails["beans"]["description"] = "Green and healthy";
  productDetails["beans"]["units"] = "1kg";
  productDetails["beans"]["price"] = 1.29;

  return productDetails;
}

function getProductList() {
  var products = [];
  var productDetails = getProductDetails();

  for (var key in productDetails) {
    products.push(key);
  }

  return products;
}

function getProductQuantity(product) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + product + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function readBasket() {
  var basket = {};
  products = getProductList();
  var productcount = products.length;
  for (var i = 0; i < productcount; i++) {
    basket[products[i]] = getProductQuantity(products[i]);
  }

  return basket;
}

function calculateTotals() {
  var basket = readBasket();
  var productDetails = getProductDetails();

  total = 0;
  for (var product in basket) {
    total += parseInt(basket[product]) * parseFloat(productDetails[product]["price"]);
  }

  totals = {};
  totals["total"] = total.toFixed(2);
  totals["vat"] = (total - total / 1.175).toFixed(2);
  totals["totalnovat"] = (total / 1.175).toFixed(2);
  //stores the numeric value of total for the function "orderFunction"
  totals["total_num"] = total


  return totals;
}

function addToBasket(product, quantity) {
  if (document.cookie.indexOf(product) == -1) {
    createEmptyBasket();
  }

  oldquantity = parseInt(getProductQuantity(product));
  newquantity = oldquantity + parseInt(quantity);

  document.cookie = product + "=" + newquantity.toString() + ";path=/";
}

function removeProductFromBasket(product) {
  document.cookie = product + "=0;path=/";
}

function changeProductQuantity(product, newquantity) {
  document.cookie = product + "=" + newquantity.toString() + ";path=/";
}

function createEmptyBasket() {
  products = getProductList();
  var productcount = products.length;
  for (var i = 0; i < productcount; i++) {
    document.cookie=products[i] + "=0;path=/";
  }
}

function createEmptyOrder() {
  document.cookie="title=;path=/";
  document.cookie="firstname=;path=/";
  document.cookie="surname=;path=/";
  document.cookie="number=;path=/";
  document.cookie="street=;path=/";
  document.cookie="postcode=;path=/";
  document.cookie="city=;path=/";
  document.cookie="country=;path=/";
  document.cookie="cardtype=;path=/";
  document.cookie="cardnumber=;path=/";
  document.cookie="month=;path=/";
  document.cookie="year=;path=/";
}

function setName() {
  document.cookie="title=" + document.getElementById('title').value + ";path=/";
  document.cookie="firstname=" + document.getElementById('firstname').value + ";path=/";
  document.cookie="surname=" + document.getElementById('surname').value + ";path=/";
}

function getName() {
  var name = {};
  name["title"] = getCookieVariableValue('title');
  name["firstname"] = getCookieVariableValue('firstname');
  name["surname"] = getCookieVariableValue('surname');

  return name;
}

function setAddress() {
  document.cookie="number=" + document.getElementById('number').value + ";path=/";
  document.cookie="street=" + document.getElementById('street').value + ";path=/";
  document.cookie="postcode=" + document.getElementById('postcode').value + ";path=/";
  document.cookie="city=" + document.getElementById('city').value + ";path=/";
  document.cookie="country=" + document.getElementById('country').value + ";path=/";
}

function getAddress() {
  var address = {};
  address["number"] = getCookieVariableValue('number');
  address["street"] = getCookieVariableValue('street');
  address["postcode"] = getCookieVariableValue('postcode');
  address["city"] = getCookieVariableValue('city');
  address["country"] = getCookieVariableValue('country');

  return address;
}

function setCardDetails() {
  if (document.getElementById('solo').checked) {
    document.cookie="cardtype=Solo;path=/";
  }
  else if (document.getElementById('switch').checked) {
    document.cookie="cardtype=Switch;path=/";
  }
  else if (document.getElementById('mastercard').checked) {
    document.cookie="cardtype=Mastercard;path=/";
  }
  else if (document.getElementById('visa').checked) {
    document.cookie="cardtype=Visa;path=/";
  }
  document.cookie="cardnumber=" + document.getElementById('cardnumber').value + ";path=/";
  document.cookie="month=" + document.getElementById('month').value + ";path=/";
  document.cookie="year=" + document.getElementById('year').value + ";path=/";
}

function getCardDetails() {
  var cardDetails = {};
  cardDetails["cardtype"] = getCookieVariableValue('cardtype');
  cardDetails["cardnumber"] = getCookieVariableValue('cardnumber');
  cardDetails["month"] = getCookieVariableValue('month');
  cardDetails["year"] = getCookieVariableValue('year');

  return cardDetails;
}

function getCookieVariableValue(variable) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + variable + "=");
  if (parts.length == 2) return parts.pop().split(";").shift()
}


/*check if the basket is empty (total == 0)
Prompt warning message if trying to proceed to checkout with empty basket*/
function orderFunction() {
  var totals = calculateTotals(); 
  if (totals["total_num"] == 0){
    alert("Basket empty!");
  }
  else{
    //window.open('order.html');
    //self.close();
    location.href = "./order.html";
  }
  }

//clear textbox after value is submitted
function clearField(id){
  document.getElementById(id).value = "";
}


//check whether the value entered is between 0 and 20 and numeric
//prompt error messages otherwise
function verifyNumeric(product,newquantity){
  if (isNaN(newquantity)) {
    alert("Please enter numeric values only!");
  } else if (newquantity<0){
    alert("Please enter positive values only!");
  } else if (newquantity>50){
    alert("Cannot order more than 20 units!");
  }else{
    changeProductQuantity(product,newquantity);
  }
}

/*Reload the totals on click*/
function reload(){
    var container = document.getElementById("totals");
    var content = container.innerHTML;
    container.innerHTML= content; 
}
