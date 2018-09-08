
var AnimatedConstant = {};
AnimatedConstant.frames = 13;
AnimatedConstant.width = 832;
AnimatedConstant.height = 1344;
AnimatedConstant.cell_width = 64;
AnimatedConstant.cell_height = 64;

AnimatedConstant.actions = {};

AnimatedConstant.actions.cast = { name: "cast", position: 0, steps: 7 };
AnimatedConstant.actions.thrust = { name: "thrust", position: 52, steps: 8 };
AnimatedConstant.actions.walk = { name: "walk", position: 104, steps: 9 };
AnimatedConstant.actions.slash = { name: "slash", position: 156, steps: 6 };
AnimatedConstant.actions.shoot = { name: "shoot", position: 208, steps: 13 };
AnimatedConstant.actions.hurt = { name: "hurt", position: 260, steps: 6 };


var AnimatedSprite = cc.Node.extend({

    addPart: function( part, color ) {
        var sprite = new cc.Sprite( );

        var rects = Util.spriteFrames(part, 64, 64, 832, 1344);

        cc.spriteFrameCache.addSpriteFrame( rects, part );

        if ( color ){
            sprite.setColor(color);
        }

        this.addChild( sprite );
        this.spriteList.push({sprite: sprite, spriteFrameName: part});
    },

    ctor:function ( ) {

        this._super();


        this.spriteList = [];

        this.scheduleUpdate();


        this.addPart( res.nudeguy_png );
        this.addPart( "res/blackpage.png" );
        this.addPart( res.mustache_png );

        this.addPart( res.mail_male_png, Util.hexToColor('#ff0000') );

        this.addPart('res/lpc/belt/cloth/male/white_cloth_male.png');
        this.runAnimation('cast', 1);
        var that = this;
        setTimeout( function(){
            that.runAnimation('cast', 2);
        }, 5000);

        return true;
    },

    runAnimation: function ( action, direction ) {




        var actionObject = AnimatedConstant.actions[action];


        var newrect = Util.arrayFromCount( actionObject.position + direction * AnimatedConstant.frames, actionObject.steps );


        for ( var i = 0; i < this.spriteList.length; i++ ){

            var spriteObject = this.spriteList[i];
            var animateObj = Util.repeatAnimation( cc.spriteFrameCache.getSpriteFrame(spriteObject.spriteFrameName), newrect, 0.1, true);

            spriteObject.sprite.stopAllActions();
            spriteObject.sprite.runAction( animateObj.repeat );
        }
    }
});
