// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

/* 
MAKE SURE TO CHECK FOR CLOSING CHARS eg: } or ]

*structure of Obj*          *edge cases* 

object                      typeof === obj
  {}                        obj !== null
  { members }               obj.length > 0 || obj.length !== 0
members                     
  pair
  pair , members
pair
  string : value
array                       typeof === obj
  []                        Array.isArray
  [ elements ]
elements
  value 
  value , elements
value
  string                    string !== '' || string.length > 0
  number
  object
  array
  true
  false
  null
  */

var stringifyJSON = function(obj) {
  
  // for arrays //
  if (Array.isArray(obj)) {
    var result = [];

    // iterate through array -> skip through 'undefined' & 'functions' values -> push everything else into result array //
    for (var i = 0; i < obj.length; i++) {
      if (obj[i] === undefined || typeof obj[i] === 'function') {
        continue;
      }
      result.push(stringifyJSON(obj[i]));  
    }
    return '[' + result + ']';
  }
  // for objects //
  if (typeof obj === 'object' && obj !== null) {
    var result = [];
    for (var key in obj) {
      if (obj[key] === undefined || typeof obj[key] === 'function') {
        continue;
      }
      result.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));  
                
    }
    return '{' + result + '}';
  }
  // for strings //
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  return '' + obj;     
};