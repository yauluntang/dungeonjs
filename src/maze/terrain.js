
var terrainData = ['44644','44344','44454','44455','44444'];

var terr = new Arr2d( 5, 5, terrainData );

var terrainPointData = [];
var tileMap =
{'1011':[1],'0111':[2],'1110':[4],'1101':[5],
'0100':[6],'1100':[7],'1000':[8],'0101':[9],
'1111':[10],'1010':[11],'0000':[],'0001':[12],
'0011':[13],'0010':[14],'0110':[0,6,14],'1001':[0,8,12]};

var layerMap = [{texture:res.dirt_texture_png, tile:'4'},{texture:res.dirt2_texture_png, tile:'3'},{texture: res.water_texture_png, tile: '6'},{texture: res.grass_texture_png, tile: '5'}]


var TerrainLayer = cc.Layer.extend({

    loaded: function(){

    },
    ctor:function () {
        this._super();


        terr.print();
        var that = this;

        var scale = 1.5;
        /*
        var texture = cc.textureCache.addImage(res.dirt_texture_png,function(){
*/





          for ( var l = 0; l< layerMap.length; l ++ ){
            var layer = layerMap[l];
            var sb = new cc.SpriteBatchNode( layer.texture, 50 );
            this.addChild( sb);

            for ( var y = 0; y< terr.height()*2 + 1; y ++ ){
              for ( var x = 0; x< terr.width()*2 + 1; x ++ ){




                var types = terr.getpar( x, y );

                var stypes = Stringutil.replaceAndString( types, layer.tile );


                var tiles = tileMap[stypes];

                for ( var i = 0; i < tiles.length; i ++ ){
                  var tile = tiles[i];

                  tileX = tile % 3;
                  tileY = Math.floor ( tile / 3 );
                  var s = new cc.Sprite(layer.texture, cc.rect(tileX * 32 + 0.5,tileY * 32 + 0.5 ,31,31));
                  s.texture.setAliasTexParameters();
                  s.setScale(scale + 0.1);
                  s.setPosition(cc.p(x*32*scale,y*32*scale))
                  sb.addChild( s );
                }

              }
            }
          }

/*
          for ( var y = 0; y< 4; y ++ ){
            for ( var x = 0; x< 4; x ++ ){
              var rand = Util.randomInt(0,2);
              var type = terrainData[y][x];
              var tex = res.grass_texture_png;
              var sb;
              if ( type === '5' ){
                sb = this.sb;
              }
              else {
                tex = res.dirt_texture_png;
                sb = this.sb2;
              }
              var s = new cc.Sprite(tex,cc.rect(rand*32,160,32,32));
              s.texture.setAliasTexParameters();
              s.setScale(scale + 0.05);
              s.setPosition(cc.p(x*32*scale,y*32*scale))
              sb.addChild( s );


              var tertext = new cc.LabelBMFont("X:"+x+" Y:"+y, res.nocontinue_fnt);
              this.addChild(tertext,200);
              tertext.setPosition(cc.p(x*32*scale,y*32*scale))
            }
          }
*/
        //}, this);



        //s.setTexture( texture );
        //var s1 = cc.Sprite.createWithTexture(this.sb.getTexture(),cc.rect(0, 0, 57, 57));
        //var s2 = cc.Sprite.createWithTexture(this.sb.getTexture(),cc.rect(0, 0, 57, 57));
        //sb.addChild(s);
        //s1.setPosition(cc.p(0,100));

        //s2.setPosition(cc.p(0,200));



        //this.sb.addChild( s1 );

        //this.sb.addChild( s2 );
    }
})
