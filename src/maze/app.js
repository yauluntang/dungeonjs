

var GameConstant = {};
GameConstant.size = 96;

var MazeLayer = cc.Layer.extend({
    sprite:null,


    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();
        this.status = 'running';

        this.terrainLayer = new cc.Layer();
        this.objectLayer = new cc.Layer();


        this.layer = new cc.Layer();

        this.addChild( this.layer );
        this.terrain = new TerrainLayer();
        var that = this;


        this.terrainLayer.addChild( this.terrain );

        this.layer.addChild( this.terrainLayer );
        this.layer.addChild( this.objectLayer );

        //terrain.setPosition(size.width/2, size.height/2+100);
        this.animated = new AnimatedSprite();
        this.animated.setPosition(size.width/2, size.height/2);
        this.objectLayer.addChild(this.animated);
        this.animated.setScale(1.5);

        for ( var i = 0; i < 20; i ++ ){
          var ani = new AnimatedSprite(1);
          ani.setPosition(size.width/2 + 50 * i, size.height/2);
          this.objectLayer.addChild(ani);
          ani.setScale(1.5);
        }

        this.arrowlayer = new ArrowInputLayer( function(movement){
          console.log('movement '+movement)
          if ( movement === 'up' ){
            that.animated.move(0);
          }
          else if ( movement === 'lt' ){
            that.animated.move(1);
          }
          else if ( movement === 'dn' ){
            that.animated.move(2);
          }
          else if ( movement === 'rt' ){
            that.animated.move(3);
          }
          else if ( movement === 'no' ){
            that.animated.move(-1);
          }
        } );
        this.addChild(this.arrowlayer);

        this.player = {};
        this.player.position = {};

        this.player.position.x = 4;
        this.player.position.y = 4;

        this.animated.x = this.player.position.x * GameConstant.size;
        this.animated.x = this.player.position.x * GameConstant.size;

        this.layer.x = -this.animated.x;
        this.layer.y = -this.animated.y;


        this.layer.x += size.width/2;
        this.layer.y += size.height/2;

        this.helloLabel = new cc.LabelBMFont("", res.nocontinue_fnt);
        this.addChild(this.helloLabel,200);
        this.helloLabel.setPosition(10,size.height-30);
        this.helloLabel.setAnchorPoint(0,0);
        return true;
    },


    move: function(point,dt){
        this.animated.x += point.x * dt * 200;

        this.animated.y += point.y * dt * 200;

        this.layer.x -= point.x * dt * 200;

        this.layer.y -= point.y * dt * 200;
    },


    update: function(dt){
        var size = cc.winSize;

        var children = this.objectLayer.getChildren();
        for(var i = 0; i < children.length; i++){
            var node = children[i];
            
            node.setLocalZOrder(-node.y);
        }

        this.helloLabel.setString('X:'+Math.round(this.animated.x)+' Y:'+Math.round(this.animated.y))

        if ( this.arrowlayer.getMovement() === 'up' ){
          this.move(cc.p(0,1),dt)
        }
        if ( this.arrowlayer.getMovement() === 'dn' ){
          this.move(cc.p(0,-1),dt)
        }
        if ( this.arrowlayer.getMovement() === 'lt' ){
          this.move(cc.p(-1,0),dt)
        }
        if ( this.arrowlayer.getMovement() === 'rt' ){
          this.move(cc.p(1,0),dt)
        }

    }
});

var MazeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MazeLayer();
        this.addChild(layer);
        if ( typeof sdkbox !== 'undefined' ){
            sdkbox.PluginAdMob.cache("home");
            sdkbox.PluginAdMob.cache("gameover");
        }
        //
        /*
         sdkbox.PluginSdkboxAds.placement("banners");
         sdkbox.PluginSdkboxAds.playAd("AdMob", "home");
         sdkbox.PluginSdkboxAds.playAd("AdMob", "gameover");*/
    }
});
