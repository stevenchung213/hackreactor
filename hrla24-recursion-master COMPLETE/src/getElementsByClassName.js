// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className) {
  var result = [];
  var ele = arguments[1] || document.body;
  var hasClass = function(ele, className) {
    if (ele.classList && ele.classList.contains(className)) {
      return true;
    } 
    return false;
  };
  if (hasClass(ele, className)) {
    result.push(ele);
  }
  for (var i = 0; i < ele.childNodes.length; i++) {
    result = result.concat(getElementsByClassName(className, ele.childNodes[i]));
  }
  return result;
};
