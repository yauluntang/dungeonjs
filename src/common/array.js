var Arr2d = function( w, h, data ){
  var data = data;
  //var pardata = [];
  var width = w;
  var height = h;
  /*
  for ( var y = 0; y < h; y ++ ){
    var row = [];
    for ( var x = 0; x < w; x ++ ){
      row.push(i);
    }
    data.push(row);
  }*/
  return {
    width: function(){
      return width;
    },
    height: function(){
      return height;
    },
    get: function( x, y ){
      if ( y < 0 || y >= height ){
        return "0";
      }
      if ( x < 0 || x >= width ){
        return "0";
      }
      return data[y][x];
    },
    set: function( x, y, v ){
      data[y][x] = v;
    },
    getallpar: function(){

    },
    getpar: function( x, y ){
      var getx = Math.floor( ( x - 0.5 ) / 2);
      var gety = Math.floor( ( y - 0.5 ) / 2);

      var getx2 = Math.floor( ( x + 0.5 ) / 2);
      var gety2 = Math.floor( ( y + 0.5 ) / 2);


      var value = [ this.get( getx, gety ), this.get( getx2, gety ), this.get( getx, gety2 ), this.get( getx2, gety2 )]
      return value;
    },
    print: function(){
      console.log( data );
    }
  };
}
