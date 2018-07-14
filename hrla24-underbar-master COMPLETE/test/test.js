const _ = require('underscore');
const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(require('sinon-chai'));


(function() {
  'use strict';

  describe('Advanced', function() {

    describe('invoke, when provided a function reference', function() {
      _.invoke - function(collection, functionOrKey, args) {
        return _.map(collection, function(value) {
          if (typeof(functionOrKey) === 'function') {
            return functionOrKey.apply(value, args);
          } else {
            return value[functionOrKey].apply(value, args);
          }
        });
      };

      it('runs the input function on each item in the array, and returns a list of results', function() {
        var reverse = function(){
          return this.split('').reverse().join('');
        };

        var reversedStrings = _.invoke(['dog', 'cat'], reverse);

        expect(reversedStrings).to.eql(['god', 'tac']);
      });

    });

    describe('invoke, when provided a method name', function() {
      _.invoke = function(collection, functionOrKey, args) {
        return _.map(collection, function(value) {
          if (typeof(functionOrKey) === 'function') {
            return functionOrKey.apply(value, args);
          } else {
            return value[functionOrKey].apply(value, args);
          }
        });
      }

      it('runs the specified method on each item in the array, and returns a list of results', function() {
        var upperCasedStrings = _.invoke(['dog', 'cat'], 'toUpperCase');

        expect(upperCasedStrings).to.eql(['DOG', 'CAT']);
      });
    });

    describe('sortBy', function() {

      _.sortBy = function(collection, iterator) {
        function sorter (a, b) {
          if (typeof iterator === 'function') {
            a = iterator(a);
            b = iterator(b);
          }
          if (typeof iterator === 'string') {
            a = a[iterator];
            b = b[iterator];
          }
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          } else {
            return 0;
        }
        } 
        return collection.sort(sorter);
      };
      

      it('should sort by age', function() {
        var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
        people = _.sortBy(people, function(person) {
          return person.age;
        });

        expect(_.pluck(people, 'age')).to.eql([30, 50]);
      });

      it('should handle undefined values', function() {
        var list = [undefined, 4, 1, undefined, 3, 2];
        var result = _.sortBy(list, function(i) { return i; });

        expect(result).to.eql([1, 2, 3, 4, undefined, undefined]);
      });

      it('should sort by length', function() {
        var list = ['one', 'two', 'three', 'four', 'five'];
        var sorted = _.sortBy(list, 'length');

        expect(sorted).to.eql(['one', 'two', 'four', 'five', 'three']);
      });

      it('should produce results that change the order of the list as little as possible', function() {
        function Pair(x, y) {
          this.x = x;
          this.y = y;
        }

        var collection = [
          new Pair(1, 1), new Pair(1, 2),
          new Pair(1, 3), new Pair(1, 4),
          new Pair(1, 5), new Pair(1, 6),
          new Pair(2, 1), new Pair(2, 2),
          new Pair(2, 3), new Pair(2, 4),
          new Pair(2, 5), new Pair(2, 6),
          new Pair(undefined, 1), new Pair(undefined, 2),
          new Pair(undefined, 3), new Pair(undefined, 4),
          new Pair(undefined, 5), new Pair(undefined, 6)
        ];

        var actual = _.sortBy(collection, function(pair) {
          return pair.x;
        });

        expect(actual).to.eql(collection);
      });
    });

    describe('flatten', function() {
      _.flatten = function(multiArray, result) {
        var result = [];
        var initialArray = function(array, result) {
          _.each(array, function(arr) {
            if (Array.isArray(arr)) {
            initialArray(arr, result);
          } else {
            result.push(arr);
          }
        });
      };
        initialArray(multiArray, result);
        return result;
      };

      it('can flatten nested arrays', function() {
        var nestedArray = [1, [2], [3, [[[4]]]]];

        expect(_.flatten(nestedArray)).to.eql([1,2,3,4]);
      });
    });

    describe('zip', function() {
      _.zip = function() {
        var zipped = [];
        var args = [...arguments];

        function pushToArray(index) {
          var tempArr = [];
          _.each(args, function(item) {
            tempArr.push(item[index]);
          });
          return tempArr;
        }
        var longestArr = args[0];
        for (var k = 1; k < args.length; k++) {
          if (args[k].length > longestArr.length) {
            longestArr = args[k];
          }
        }
        for (var i = 0; i < longestArr.length; i++) {
          zipped.push(pushToArray(i));
        }
        return zipped;
      };

      it('should zip together arrays of different lengths', function() {
        var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];

        expect(_.zip(names, ages, leaders)).to.eql([
          ['moe', 30, true],
          ['larry', 40, undefined],
          ['curly', 50, undefined]
        ]);
      });
    });

    describe('intersection', function() {
      _.interesection = function() {
        var array = Array.prototype.slice.call(arguments);
        var result = array[0].slice();
        var temp = [];
        _.each(array, function(arr) {
          temp = [];
          _.each(arr, function(x) {
            result.indexOf(x) > -1 ? temp.push(x) : null;
          });
          result = temp.slice();
        });
        return result;
      };

      it('should take the set intersection of two arrays', function() {
        var stooges = ['moe', 'curly', 'larry'];
        var leaders = ['moe', 'groucho'];

        expect(_.intersection(stooges, leaders)).to.eql(['moe']);
      });

    });

    describe('difference', function() {
      _.difference = function(array) {
        var args = Array.prototype.slice.call(arguments, 1);
        var result = array.slice();
        var temp = [];
        _.each(args, function(arr) {
          temp = [];
        _.each(result, function(val, key) {
          arr.indexOf(val) === -1 ? temp.push(val) : null;
        });
        result = temp.slice();
        });
        return result;
      };

      it('should return the difference between two arrays', function() {
        var diff = _.difference([1,2,3], [2,30,40]);

        expect(diff).to.eql([1,3]);
      });

      it('should return the difference between three arrays', function() {
        var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);

        expect(result).to.eql([3, 4]);
      });

    });

    describe('throttle, when given a wait of 100ms', function() {
      var callback;

      beforeEach(function() {
        callback = sinon.spy();
      });

      var clock;

      before(function () { clock = sinon.useFakeTimers(); });
      after(function () { clock.restore(); });

      _.throttle = function(func, wait) {
        var result;
        var alreadyCalled = false;
        var args = [...arguments].slice(2);

        return function() {
          if (!alreadyCalled) {
            result = func.apply(this, arguments);
            setTimeout(function() {
              alreadyCalled = true;
            }, wait);
          }   

        return result;
        };
      };

      
      it('should return a function callable twice in the first 200ms', function() {
        var fn = _.throttle(callback, 100);
        fn(); // called
        setTimeout(fn, 50);
        setTimeout(fn, 100); // called
        setTimeout(fn, 150);
        setTimeout(fn, 199);
        clock.tick(200);

        expect(callback).to.have.been.calledTwice;
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
