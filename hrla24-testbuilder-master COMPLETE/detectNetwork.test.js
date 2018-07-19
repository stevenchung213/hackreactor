var detectNetwork = function(cardNumber){
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
/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var assert = chai.assert;
function assertObjectsEqual(actual, expected, testName) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log('Test passed');
    return true;
  } else {
    console.log('Test ['+testName+'] failed: expected ', expected, ' but got, ', actual );
    return false;
  }
}
 
// describe('Introduction to Mocha Tests - READ ME FIRST', function() {
//   // A Mocha test is just a function!
//   // If the function throws an error when run, it fails.
//   // If it doesn't throw an error when run, it doesn't fail. 
//   // To read more about mocha, visit mochajs.org

//   // Once you've read and understood this section, please comment it out. 
//   // You will not be able to proceed with a failing test. 

//   it('Throws an error so it fails', function() {
//     throw new Error('Delete me!');
//   });

//   it('Doesn\'t throw an error, so it doesn\'t fail', function() {
//     // This test doesn't really test anything at all! It will pass no matter what.
//     var even = function(num){
//       return num/2 === 0;
//     }
//     return even(10) === true;
//   });

//   // In tests, we want to compare the expected behavior to the actual behavior.
//   // A test should only fail if the expected behavior doesn't match the actual.
//   it('Throws an error when expected behavior does not match actual behavior', function() {
//     var even = function(num){
//       return num/2 === 0;
//     }

//     if(even(10) !== true) {
//       throw new Error('10 should be even!');
//     }
//   });
// });
// describe('Diner\'s Club', function() {
//   // Be careful, tests can have bugs too...

//   it('has a prefix of 38 and a length of 14', function() {
//     // throw new Error('Delete me!');
 
//     if (detectNetwork('38345678901234') !== 'Diner\'s Club') {
//       throw new Error('Test failed');
//     }
//   });

//   it('has a prefix of 39 and a length of 14', function() {
//     if (detectNetwork('3934567890123') !== 'Diner\'s Club') {
//       throw new Error('Test failed');
//     }
 
//   });
// });

// describe('American Express', function() {
//   // It can get annoying to keep typing the if/throw, so here is a
//   // helper function to throw an error if the input statement isn't true. 
//   var assert = function(isTrue) {
//     if(isTrue) {
//       throw new Error('Test failed');
//     }
 
//   };

//   it('has a prefix of 34 and a length of 15', function() {
//     assert(detectNetwork('343456789012345') === 'American Express');
//   });

//   it('has a prefix of 37 and a length of 15', function() {
//     assert(detectNetwork('373456789012345') === 'American Express');
//   });
// });

describe('Visa', function() {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it. 
  //   http://chaijs.com/
  var assert = chai.assert;
 

  it('has a prefix of 4 and a length of 13', function() {
    assert(detectNetwork('4123456789012') === 'Visa');
  });

  it('has a prefix of 4 and a length of 16', function() {
    assert(detectNetwork('4123456789012345') === 'Visa');
  });

  it('has a prefix of 4 and a length of 19', function() {
    assert(detectNetwork('4123456789012345678') === 'Visa');
  });
});

describe('MasterCard', function() {
  // Chai lets you write more human-readable tests that throw helpful errors.
  // Expect syntax is one way to do this, but there are others. 
  // If you want to know more, check out the documentation. 
  //   http://chaijs.com/api/bdd/
  var expect = chai.expect;
 
  it('has a prefix of 51 and length of 16', function() {
    expect(detectNetwork('5112345678901234')).to.equal('MasterCard');
  });
 
  it('has a prefix of 52 and length of 16', function() {
    expect(detectNetwork('5212345678901234')).to.equal('MasterCard');
  });
 
  it('has a prefix of 53 and length of 16', function() {
    expect(detectNetwork('5312345678901234')).to.equal('MasterCard');
  });
 

  // You can also use should instead of expect, which changes the style
  // slightly. It really doesn't matter which one you use - check out 
  // http://chaijs.com/guide/styles/ for more info, but it's important
  // to be consistent (unlike in this file, where we use BOTH expect
  // and should, but that's just for learning), so once you've gotten 
  // these tests to pass using should syntax, refactor your tests to 
  // use either expect or should, but not both. 

  // var should = chai.should();  // couldn't get chai to work....smh....// 
  // going with expect =>  // 
  var expect = chai.expect;
  
  it('has a prefix of 54 and a length of 16', function() {
    expect(detectNetwork('5412341234123412')).to.equal('MasterCard');
  });
 
  it('has a prefix of 55 and a length of 16', function() {
    expect(detectNetwork('5512341234123412')).to.equal('MasterCard');
  });
 
});

describe('Discover', function() {
  // Tests without a function will be marked as "pending" and not run
  // Implement these tests (and others) and make them pass!
  
  var expect = chai.expect;

  it('has a prefix of 6011 and a length of 16', function(){
    expect(detectNetwork('6011123456789012')).to.equal('Discover');
  });

  it('has a prefix of 6011 and a length of 19', function(){
    expect(detectNetwork('6011123456789012345')).to.equal('Discover');
  });

  for (var prefix = 644; prefix <= 649; prefix++) {
    (function(prefix){
      it('has a prefix of ' + prefix + ' and a length of 16', function(){
        expect(detectNetwork(prefix + '1234123412341')).to.equal('Discover');
      });
      it('has a prefix of ' + prefix + ' and a length of 19', function(){
        expect(detectNetwork(prefix + '1234123412341234')).to.equal('Discover');
      });
    })(prefix)
  }

  it('has a prefix of 65 and length of 16', function(){
    expect(detectNetwork('6511123412341234')).to.equal('Discover');
  });
  it('has a prefix of 65 and length of 19', function(){
    expect(detectNetwork('6511123412341234123')).to.equal('Discover');
  });

});

describe('Maestro', function() {
  // Write full test coverage for the Maestro card
  var expect = chai.expect;
  var actual = '501812341234';
  for (var cardLength = 12; cardLength <= 19; cardLength++){
    (function (cardLength, actual) {
      it('has a prefix of 5018 and length of ' + cardLength, function(){
        expect(detectNetwork(actual)).to.equal('Maestro');
      });
    })(cardLength, actual)
    actual = actual + '1';
  }

  actual = '502012341234';
  for (var cardLength = 12; cardLength <= 19; cardLength++){
    (function(cardLength, actual) {
      it('has a prefix of 5020 and length of ' + cardLength, function(){
        expect(detectNetwork(actual)).to.equal('Maestro');
      });
    })(cardLength, actual)
    actual = actual + '1';
  }

  actual = '503812341234';
  for (var cardLength = 12; cardLength <= 19; cardLength++){
    (function(cardLength, actual) {
      it('has a prefix of 5038 and length of ' + cardLength, function(){
        expect(detectNetwork(actual)).to.equal('Maestro');
      });
    })(cardLength, actual)
    actual = actual + '1';
  }

  actual = '630412341234';
  for (var cardLength = 12; cardLength <= 19; cardLength++){
    (function(cardLength, actual) {
      it('has a prefix of 6304 and length of ' + cardLength, function(){
        expect(detectNetwork(actual)).to.equal('Maestro');
      });
    })(cardLength, actual)
    actual = actual + '1';
  }

});

describe('China UnionPay', function(){
  var expect = chai.expect;

  for (var prefix = 622126; prefix <= 622925; prefix++){
    var actual = prefix + '1234123412';
    for (var cardLength = 16; cardLength <= 19; cardLength++) {
      (function(cardLength, actual, prefix) {
        it('has a prefix of ' + prefix + 'and length of ' + cardLength, function() {
          expect(detectNetwork(actual)).to.equal('China UnionPay');
        });
      })(cardLength, actual, prefix)
      actual = actual + '1';
    }
}

for (var prefix = 624; prefix <= 626; prefix++){
  var actual = prefix + '1234123412341';
  for (var cardLength = 16; cardLength <= 19; cardLength++) {
    (function(cardLength, actual, prefix) {
      it('has a prefix of ' + prefix + ' and length of ' + cardLength, function() {
        expect(detectNetwork(actual)).to.equal('China UnionPay');
      });
    })(cardLength, actual, prefix)
    actual = actual + '1';
  }
}

for (var prefix = 6282; prefix <= 6288; prefix++){
  var actual = prefix + '123412341234';
  for (var cardLength = 16; cardLength <= 19; cardLength++) {
    (function(cardLength, actual, prefix) {
      it('has a prefix of ' + prefix + ' and length of ' + cardLength, function() {
        expect(detectNetwork(actual)).to.equal('China UnionPay');
      });
    })(cardLength, actual, prefix)
    actual = actual + '1';
  }
}
});


describe('Switch', function(){
  var expect = chai.expect;

  var prefixes = [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759];

  for (var i = 0; i < prefixes.length; i++){
    var prefix = prefixes[i].toString();
    var actual = prefix;
    for (var x = 0; x < 16 - prefix.length; x++) {
      actual = actual + '1';
    }

    (function (actual,prefix) {
      it ('has a prefix of ' + prefix + ' and length of 16', function() {
        expect(detectNetwork(actual)).to.equal('Switch');
      });
    })(actual,prefixes[i])

    
    actual = actual + '11';
    (function (actual,prefix) {
      it ('has a prefix of ' + prefix + ' and length of 18', function() {
        expect(detectNetwork(actual)).to.equal('Switch');
      });
    })(actual,prefixes[i])
    
    
    actual = actual + '1';
    (function (actual,prefix) {
      it ('has a prefix of ' + prefix + ' and length of 19', function() {
        expect(detectNetwork(actual)).to.equal('Switch');
      });
    })(actual,prefixes[i])
  }

});