var Stringutil = {};
Stringutil.replaceAndString = function( arr, base ){
  var s = "";
  for ( var i = 0; i < arr.length; i ++ ){
    var j = arr[i];
    if ( j !== base ){
      j = '0';
    }
    else {
      j = '1';
    }
    s += j;
  }
  return s;
}
