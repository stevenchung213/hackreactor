// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber){
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  if (cardNumber === null || cardNumber === undefined){
    return 'null';
  }
  var pref1 = cardNumber.slice(0,1); //prefix holder 1 digit
  var pref2 = cardNumber.slice(0,2); //prefix holder 2 digits
  var pref3 = cardNumber.slice(0,3); //prefix holder 3 digits
  var pref4 = cardNumber.slice(0,4); //prefix holder 4 digits
  var pref5 = cardNumber.slice(0,5); //prefix holder 5 digits
  var pref6 = cardNumber.slice(0,6); //prefix holder 6 digits
  var cardLength = cardNumber.length;

  if ((pref2 === '38' || pref2 === '39') && cardLength === 14){
    return `Diner's Club`;
  }
  if ((pref2 === '34' || pref2 === '37') && cardLength === 15){
    return 'American Express';
  }
  if (parseInt(pref2) >= 51 && parseInt(pref2) <= 55 && cardLength === 16){
    return 'MasterCard';
  }
  if ((pref4 === '4903' || pref4 === '4905' || pref4 === '4911' || pref4 === '4936' || pref6 === '564182' || pref6 === '633110' || pref4 === '6333' || pref4 === '6759') && (cardLength === 16 || cardLength === 18 || cardLength === 19)){
    return 'Switch';
  }
  if (pref1 === '4' && (cardLength === 13 || cardLength === 16 || cardLength === 19)){
    return 'Visa';
  }
  if ((pref4 === '6011' || (parseInt(pref3) >= 644 && parseInt(pref3) <= 649) || pref2 === '65') && (cardLength === 16 || cardLength === 19)){
    return 'Discover';
  }
  if ((pref4 === '5018' || pref4 === '5020' || pref4 === '5038' || pref4 === '6304') && (cardLength >= 12 && cardLength <= 19)){
    return 'Maestro';
  }
  if (((parseInt(pref6) >= 622126 && parseInt(pref6) <= 622925) || (parseInt(pref3) >= 624 && parseInt(pref3) <= 626) || (parseInt(pref4) >= 6282 && parseInt(pref4) <= 6288)) && (cardLength >= 16 && cardLength <= 19)){
    return 'China UnionPay';
  } else {
    return 'Unknown card network';
  }
};

// Once you've read this, go ahead and try to implement this function, then return to the console.