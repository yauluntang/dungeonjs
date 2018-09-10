
var MazeLayer = cc.Layer.extend({
    sprite:null,


    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();
        this.status = 'running';

        this.animated = new AnimatedSprite();
        this.animated.setPosition(size.width/2, size.height/2);
        this.addChild(this.animated);
                                this.animated.setScale(1.5);


        this.sprite = new cc.Sprite(res.mushroom_png);

        this.sprite.setPosition( size.width/2, size.height/2 - 200);
        this.addChild( this.sprite);
        return true;
    },





    update: function(dt){
        var size = cc.winSize;


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
