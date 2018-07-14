const _ = require('underscore');
const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(require('sinon-chai'));

(function() {
    'use strict';
  
    describe('Part I', function() {
  
      describe('identity', function() {
        _.identity = function(x) {
          return x;
        };
  
        it('should return whatever value is passed into it', function() {
          var uniqueObject = {};
          expect(_.identity(1)).to.equal(1);
          expect(_.identity('string')).to.equal('string');
          expect(_.identity(false)).to.be.false;
          expect(_.identity(uniqueObject)).to.equal(uniqueObject);
        });
      });
  
      describe('first', function() {
        _.first = function(array, x) {
            // return n === undefined ? array[0] : array.slice(0, n);
            if (x === undefined) {
                return array[0];
            } else {
                return array.slice(0, x);
            }
        };
  
        it('should be able to pull out the first element of an array', function() {
          expect(_.first([1,2,3])).to.equal(1);
        });
  
        it('should accept an index argument', function() {
          expect(_.first([1,2,3], 2)).to.eql([1, 2]);
        });
  
        it('should return empty array if zero is passed in as the index', function() {
          expect(_.first([1,2,3], 0)).to.eql([]);
        });
  
        it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
          expect(_.first([1,2,3], 5)).to.eql([1, 2, 3]);
        });
      });
  
      describe('last', function() {
        _.last = function(array, n) {
            if (n === undefined) {
                return array[array.length-1];
            }
            if (n === 0) {
                return [];
            } 
            if (n > array.length) {
                return array;
            } else {
                return array.slice(-n);
            }
        };
  
        it('should pull the last element from an array', function() {
          expect(_.last([1,2,3])).to.equal(3);
        });
  
        it('should accept an index argument', function() {
          expect(_.last([1,2,3], 2)).to.eql([2, 3]);
        });
  
        it('should return empty array if zero is passed in as the index', function() {
          expect(_.last([1,2,3], 0)).to.eql([]);
        });
  
        it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
          expect(_.last([1,2,3], 5)).to.eql([1, 2, 3]);
        });
      });
  
      describe('each', function() {
        _.each = function(collection, callback) {
          if (Array.isArray(collection) && collection.length === 0) {
              return undefined;
          }
          if (Array.isArray(collection) && collection.length > 0) {
              for (var i = 0; i < collection.length; i++) {
                  callback(collection[i], i, collection);
              }
          } 
          if (typeof(collection) === 'object' && !Array.isArray(collection)) {
              for (var key in collection) {
                  callback(collection[key], key, collection)
              }
          }
        };
  
        it('should be a function', function() {
          expect(_.each).to.be.an.instanceOf(Function);
        });
  
        it('should not return anything', function() {
          var returnValue = _.each([], function(){});
          expect(returnValue).to.not.exist;
        });
  
        it('should not mutate the input array', function() {
          var input = [1,2,3,4,5];
          var indexCount = _.each(input, function(item) { /* noop */ });
  
          /*
           * Mutation of inputs should be avoided without good justification otherwise
           * as it can often lead to hard to find bugs and confusing code!
           * Imagine we were reading the code above, and we added the following line:
           *
           * var lastElement = input[input.length - 1];
           *
           * Without knowing that mutation occured inside of each,
           * we would assume that `lastElement` is 5. But if inside of
           * each, we use the array method `pop`, we would permanently
           * change `input` and our assumption would not longer be true,
           * `lastElement` would be 4 instead!
           *
           * The tricky part is that we have no way of knowing about the mutation
           * just by looking at the code above. We'd have to dive into the
           * implementation of each to the exact line that uses `pop`.
           * If we write a lot of code with this assumption, it might be very hard
           * to trace back to the correct line in each.
           *
           * You can avoid an entire class of bugs by writing functions
           * that don't mutate their inputs!
           */
  
          expect(input).to.eql([1,2,3,4,5])
        });
  
        it(' should iterate over arrays and provide access to each value', function() {
          var letters = ['a', 'b', 'c'];
          var iterations = [];
  
          _.each(letters, function(letter) {
            iterations.push(letter);
          });
  
          expect(iterations).to.eql(['a','b','c']);
        });
  
        it('should iterate over arrays and provide access to each index', function() {
          var letters = ['a', 'b', 'c'];
          var iterations = [];
  
          _.each(letters, function(letter, index) {
            iterations.push([letter, index]);
          });
  
          expect(iterations).to.eql([
            ['a', 0],
            ['b', 1],
            ['c', 2]
          ]);
        });
  
        it('should iterate over arrays and provide access to the original collection', function() {
          var letters = ['a', 'b', 'c'];
          var iterations = [];
  
          _.each(letters, function(letter, index, collection) {
            iterations.push([letter, index, collection]);
          });
  
          expect(iterations).to.eql([
            ['a', 0, letters],
            ['b', 1, letters],
            ['c', 2, letters]
          ]);
        });
  
        it('should only iterate over numeric keys of an array, not all properties', function() {
          var iterations = [];
          var letters = ['a', 'b', 'c'];
          letters.someProperty = 'Do not iterate over me!';
  
          _.each(letters, function(letter, index, collection) {
            iterations.push(letter);
          });
  
          expect(iterations).to.not.include('Do not iterate over me!');
        });
  
        it('should iterate over objects and provide access to each value', function() {
          var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
          var iterations = [];
  
          _.each(letters, function(value) {
            iterations.push(value);
          });
  
          expect(iterations).to.eql(['dog', 'elephant', 'flotsam']);
        });
  
        it('should iterate over objects and provide access to each key', function() {
          var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
          var iterations = [];
  
          _.each(letters, function(value, property) {
            iterations.push([value, property]);
          });
  
          expect(iterations).to.eql([
            ['dog', 'd'],
            ['elephant', 'e'],
            ['flotsam', 'f']
          ]);
        });
  
        it('should iterate over objects and provide access to the original object', function() {
          var letters = {d: 'dog', e: 'elephant', f: 'flotsam'};
          var iterations = [];
  
          _.each(letters, function(value, property, object) {
            iterations.push([value, property, object]);
          });
  
          expect(iterations).to.eql([
            ['dog', 'd', letters],
            ['elephant', 'e', letters],
            ['flotsam', 'f', letters]
          ]);
        });
  
        it('should not confuse an object with a `length` property for an array', function() {
          var dresser = { length: 39, width: 79, height: 127};
          var iterations = [];
  
          _.each(dresser, function(value, property, object) {
            iterations.push([value, property, object]);
          });
  
          expect(iterations).to.eql([
            [39, 'length', dresser],
            [79, 'width', dresser],
            [127, 'height', dresser]
          ]);
        });
  
      });
  
      describe('indexOf', function() {
        _.indexOf = function(array, target) {
          var result = -1;

          _.each(array, function(item, index) {
              if (item === target && result === -1) {
                  result = index;
              }
          });

          return result;
        };
  
        it('should find 40 in the list', function() {
          var numbers = [10, 20, 30, 40, 50];
  
          expect(_.indexOf(numbers, 40)).to.equal(3);
        });
  
        it('should be able to compute indexOf even when the native function is undefined', function() {
          var numbers = [10, 20, 30];
  
          expect(_.indexOf(numbers, 20)).to.equal(1);
        });
  
        it('returns -1 when the target cannot be found not in the list', function() {
          var numbers = [10, 20, 30, 40, 50];
  
          expect(_.indexOf(numbers, 35)).to.equal(-1);
        });
  
        it('returns the first index that the target can be found at when there are multiple matches', function() {
          var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];
  
          expect(_.indexOf(numbers, 40)).to.equal(1);
        });
      });
  
      describe('filter', function() {
        _.filter = function(collection, test) {
          var result = [];
          _.each(collection, function(item) {
              if (test(item)) {
                  result.push(item);
              }
          });
          return result;
        };
  
        it('should return all even numbers in an array', function() {
          var isEven = function(num) { return num % 2 === 0; };
          var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);
  
          expect(evens).to.eql([2, 4, 6]);
        });
  
        it('should return all odd numbers in an array', function() {
          var isOdd = function(num) { return num % 2 !== 0; };
          var odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);
  
          expect(odds).to.eql([1, 3, 5]);
        });
  
        it('should produce a brand new array instead of modifying the input array', function() {
          var isOdd = function(num) { return num % 2 !== 0; };
          var numbers = [1, 2, 3, 4, 5, 6];
          var evens = _.filter(numbers, isOdd);
  
          expect(evens).to.not.equal(numbers);
        });
      });
  
      describe('reject', function() {
        _.reject = function(collection, trueOrFalse) {
          var lies = [];
          _.each(collection, function(x) {
              if (!trueOrFalse(x)) {
                  lies.push(x);
              }
          });
          return lies;
        };
  
        it('should reject all even numbers', function() {
          var isEven = function(num) { return num % 2 === 0; };
          var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);
  
          expect(odds).to.eql([1, 3, 5]);
        });
  
        it('should reject all odd numbers', function() {
          var isOdd = function(num) { return num % 2 !== 0; };
          var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);
  
          expect(evens).to.eql([2, 4, 6]);
        });
  
        it('should produce a brand new array instead of modifying the input array', function() {
          var isOdd = function(num) { return num % 2 !== 0; };
          var numbers = [1, 2, 3, 4, 5, 6];
          var evens = _.reject(numbers, isOdd);
  
          expect(evens).to.not.equal(numbers);
        });
      });
  
      describe('uniq', function() {
        _.uniq = function(array) {
          var resultObj = {};
          var resultArr = [];

         _.each(array, function (x){
              resultObj[x] = x;
        });
         _.each(resultObj, function (x) {
              resultArr.push(x);
        });
          return resultArr;
        };
        it('should not mutate the input array', function() {
          var input = [1, 2, 3, 4, 5];
          var indexCount = _.uniq(input);
  
          /*
           * Mutation of inputs should be avoided without good justification otherwise
           * as it can often lead to hard to find bugs and confusing code!
           * Imagine we were reading the code above, and we added the following line:
           *
           * var lastElement = input[input.length - 1];
           *
           * Without knowing that mutation occured inside of _.uniq,
           * we would assume that `lastElement` is 5. But if inside of
           * _.uniq, we use the array method `pop`, we would permanently
           * change `input` and our assumption would not longer be true,
           * `lastElement` would be 4 instead!
           *
           * The tricky part is that we have no way of knowing about the mutation
           * just by looking at the code above. We'd have to dive into the
           * implementation of _.uniq to the exact line that uses `pop`.
           * If we write a lot of code with this assumption, it might be very hard
           * to trace back to the correct line in _.uniq.
           *
           * You can avoid an entire class of bugs by writing functions
           * that don't mutate their inputs!
           */
  
          expect(input).to.eql([1, 2, 3, 4, 5]);
        });
  
        it('should return all unique values contained in an unsorted array', function() {
          var numbers = [1, 2, 1, 3, 1, 4];
  
          expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
        });
  
        it('should handle iterators that work with a sorted array', function() {
          var iterator = function(value) { return value === 1; };
          var numbers = [1, 2, 2, 3, 4, 4];
  
          expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
        });
  
        it('should produce a brand new array instead of modifying the input array', function() {
          var numbers = [1, 2, 1, 3, 1, 4];
          var uniqueNumbers = _.uniq(numbers);
  
          expect(uniqueNumbers).to.not.equal(numbers);
        });
      });
  
      describe('map', function() {
        _.map = function(collection, iterator) {
          var result = [];
          _.each(collection, function(item, index, collection) {
              result.push(iterator(item, index, collection));
          });
          return result;
        };
  
        it('should not mutate the input array', function() {
          var input = [1,2,3,4,5];
          var indexCount = _.map(input, function(num) { /* noop */ });
  
          /*
           * Mutation of inputs should be avoided without good justification otherwise
           * as it can often lead to hard to find bugs and confusing code!
           * Imagine we were reading the code above, and we added the following line:
           *
           * var lastElement = input[input.length - 1];
           *
           * Without knowing that mutation occured inside of map,
           * we would assume that `lastElement` is 5. But if inside of
           * map, we use the array method `pop`, we would permanently
           * change `input` and our assumption would not longer be true,
           * `lastElement` would be 4 instead!
           *
           * The tricky part is that we have no way of knowing about the mutation
           * just by looking at the code above. We'd have to dive into the
           * implementation of map to the exact line that uses `pop`.
           * If we write a lot of code with this assumption, it might be very hard
           * to trace back to the correct line in map.
           *
           * You can avoid an entire class of bugs by writing functions
           * that don't mutate their inputs!
           */
  
          expect(input).to.eql([1,2,3,4,5])
        });
  
        it('should apply a function to every value in an array', function() {
          var doubledNumbers = _.map([1, 2, 3], function(num) {
            return num * 2;
          });
  
          expect(doubledNumbers).to.eql([2, 4, 6]);
        });
  
        it('should produce a brand new array instead of modifying the input array', function() {
          var numbers = [1, 2, 3];
          var mappedNumbers = _.map(numbers, function(num) {
            return num;
          });
  
          expect(mappedNumbers).to.not.equal(numbers);
        });
      });
  
      describe('pluck', function() {
        _.pluck = function(collection, key) {
          return _.map(collection, function(item) {
              return item[key];
          });
        };
  
        it('should return values contained at a user-defined property', function() {
          var people = [
            { name: 'moe', age: 30 },
            { name: 'curly', age: 50 }
          ];
  
          expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
        });
  
        it('should not modify the original array', function() {
          var people = [
            { name: 'moe', age: 30 },
            { name: 'curly', age: 50 }
          ];
  
          _.pluck(people, 'name');
  
          expect(people).to.eql([{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }]);
        });
      });
  
      describe('reduce', function() {
        _.reduce = function(collection, iterator, accumulator) {
          if (accumulator === undefined) { 
              accumulator = collection[0]
            } 
            _.each(collection, function(value) {
                accumulator = iterator(accumulator, value);
            });
          return accumulator;
        };
  
        it('should be a function', function() {
          expect(_.reduce).to.be.an.instanceOf(Function);
        });
  
        it('should return a value', function() {
          var indexCount = _.reduce([3,2,1], function(memo, item) {return item;});
          expect(indexCount).to.eql(1);
        });
  
        it('should not mutate the input array', function() {
          var input = [1,2,3,4,5];
          var indexCount = _.reduce(input, function(memo, item) {return item;});
          
          /*
           * Mutation of inputs should be avoided without good justification otherwise
           * as it can often lead to hard to find bugs and confusing code!
           * Imagine we were reading the code above, and we added the following line:
           *
           * var lastElement = input[input.length - 1];
           *
           * Without knowing that mutation occured inside of _.reduce,
           * we would assume that `lastElement` is 5. But if inside of
           * _.reduce, we use the array method `pop`, we would permanently
           * change `input` and our assumption would not longer be true,
           * `lastElement` would be 4 instead!
           *
           * The tricky part is that we have no way of knowing about the mutation
           * just by looking at the code above. We'd have to dive into the
           * implementation of _.reduce to the exact line that uses `pop`.
           * If we write a lot of code with this assumption, it might be very hard
           * to trace back to the correct line in _.reduce.
           *
           * You can avoid an entire class of bugs by writing functions
           * that don't mutate their inputs!
           */
  
          expect(input).to.eql([1,2,3,4,5])
        });
  
        it('should invoke the iterator function with arguments (memo, item) in that order', function() {
          var memoInCallback, itemInCallback;
  
          _.reduce(['item'], function(memo, item) {
            memoInCallback = memo;
            itemInCallback = item;
          }, 'memo');
  
          expect(memoInCallback).to.equal('memo');
          expect(itemInCallback).to.equal('item');
        });
  
        it('should pass items of the array into the iterator from left to right', function() {
          var orderTraversed = [];
  
          _.reduce([1,2,3,4], function(memo, item) {
            orderTraversed.push(item);
            return memo;
          }, 10);
  
          expect(orderTraversed).to.eql([1,2,3,4]);
        });
  
        it('should continue to call iterator even if the iterator returns undefined', function() {
          var callCount = 0;
          var returnFalsy = function(total, item) {
            callCount++;
            if (callCount === 1) {
              return undefined;
            } else {
              return item + 1;
            }
          };
  
          var total = _.reduce([1,1,2], returnFalsy);
          expect(total).to.equal(3);
        });
  
        it('should pass every item of the array into the iterator if a memo is passed in', function() {
          var indexCount = _.reduce([1,2,3], function(memo, item) {
            return memo - item;
          }, 10);
  
          expect(indexCount).to.equal(4);
        });
  
        it('should accept falsy values as a valid memo', function() {
          // Be careful how you check if a memo has been passed in
          var indexCount = _.reduce([1,2,3], function(memo, item) {
            return memo * item;
          }, 0);
  
          expect(indexCount).to.equal(0);
        });
  
        it('should set memo to be the first item of the array if no memo is passed in', function() {
          var indexCount = _.reduce([1,2,3], function(memo) {
            return memo;
          });
  
          expect(indexCount).to.equal(1);
        });
  
  
        it('should pass the second item of the array into the iterator first if a memo is not passed in', function() {
          var indexCount = _.reduce([3,2,1], function(memo, item) {
            return memo - item;
          });
  
          expect(indexCount).to.equal(-3);
        });
  
      });
    });
  
    function checkForNativeMethods(runUnderbarFunction) {
      it('should not use the native version of any underbar methods in its implementation', function() {
        // These spies are set up in testSupport.js
        runUnderbarFunction();
        expect(Array.prototype.map.called).to.equal(false);
        expect(Array.prototype.indexOf.called).to.equal(false);
        expect(Array.prototype.forEach.called).to.equal(false);
        expect(Array.prototype.filter.called).to.equal(false);
        expect(Array.prototype.reduce.called).to.equal(false);
        expect(Array.prototype.every.called).to.equal(false);
        expect(Array.prototype.some.called).to.equal(false);
      });
    }
  }());
  