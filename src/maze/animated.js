
var AnimatedConstant = {};

var MonsterConstant = {};
MonsterConstant.frames = 3;
MonsterConstant.width = 96;
MonsterConstant.height = 128;
MonsterConstant.cell_width = 32;
MonsterConstant.cell_height = 32;

var HumanConstant = {};

HumanConstant.frames = 13;
HumanConstant.width = 832;
HumanConstant.height = 1344;
HumanConstant.cell_width = 64;
HumanConstant.cell_height = 64;

HumanConstant.actions = {};

HumanConstant.actions.cast = { name: "cast", position: 0, steps: 7 };
HumanConstant.actions.thrust = { name: "thrust", position: 52, steps: 8 };
HumanConstant.actions.walk = { name: "walk", position: 105, steps: 8 };
HumanConstant.actions.slash = { name: "slash", position: 156, steps: 6 };
HumanConstant.actions.shoot = { name: "shoot", position: 208, steps: 13 };
HumanConstant.actions.hurt = { name: "hurt", position: 260, steps: 6 };


MonsterConstant.actions = {};
MonsterConstant.actions.walk = { name: "walk", array: [0,1,2,1], delay: 0.15 };


AnimatedConstant[0] = HumanConstant;
AnimatedConstant[1] = MonsterConstant;



var AnimatedSprite = cc.Node.extend({

    addPart: function( part, color ) {
        var sprite = new cc.Sprite( );
        var rects;
        var constant = AnimatedConstant[this.spriteId];

        rects = Util.spriteFrames(part, constant.cell_width, constant.cell_height, constant.width, constant.height);

        //rects.retain();

        this.spriteFramesMap[ part ] = rects;

        //cc.spriteFrameCache.addSpriteFrame( rects, part );

        if ( color ){
            sprite.setColor(color);
        }

        this.addChild( sprite );
        sprite.setAnchorPoint(cc.p(0.5,0));
        this.spriteList.push({sprite: sprite, spriteFrameName: part});
    },

    ctor:function ( spriteId ) {

        this._super();

        this.setAnchorPoint(cc.p(0.5,0));

        this.spriteFramesMap = {};
        this.spriteList = [];

        this.scheduleUpdate();
        if ( !spriteId ){
          this.spriteId = 0;
        }
        else {
          this.spriteId = spriteId;
        }


        if ( this.spriteId === 0 ){
          this.addPart( res.nudeguy_png );
          this.addPart( "res/blackpage.png" );
          this.addPart( res.mustache_png );

          this.addPart( res.mail_male_png, Util.randomColor() );

          //this.addPart('res/lpc/belt/cloth/male/white_cloth_male.png');

          this.addPart('res/lpc/belt/metal/female/iron_female_no_th-sh.png');
this.addPart('res/lpc/belt/buckles_female_no_th-sh/gold.png');
          this.addPart('res/lpc/feet/armor/male/metal_boots_male.png');
          this.addPart('res/lpc/weapons/right hand/male/spear_male.png');

          this.runAnimation('cast', 1);
        }
        else {
          this.addPart('res/monster/slime.png', Util.randomColor());
          this.runAnimation('walk', 1);
        }
        var that = this;

        /*
        setTimeout( function(){
            that.runAnimation('cast', 2);
        }, 2000);

        setTimeout( function(){
            that.runAnimation('walk', 0);
        }, 3000);

        setTimeout( function(){
            that.runAnimation('walk', 1);
        }, 4000);

        setTimeout( function(){
            that.runAnimation('walk', 2);
        }, 5000);*/

        return true;
    },

    move: function( direction ){
        if ( direction === -1 ){
          this.runAnimation('stop' );
        }
        else {
          this.runAnimation('walk', direction );
        }
    },

    runAnimation: function ( action, direction ) {
        var newrect = null;
        var constant = AnimatedConstant[this.spriteId];
        var delay = 0.1;

        if ( action !== 'stop'){
          var actionObject = constant.actions[action];
          if ( actionObject.array ){
            newrect = Util.arrayFromArray( actionObject.array, direction * constant.frames );
          }
          else {
            newrect = Util.arrayFromCount( actionObject.position + direction * constant.frames, actionObject.steps );
          }

          delay = actionObject.delay;
          if ( !delay ){
            delay = 0.1;
          }
        }



        for ( var i = 0; i < this.spriteList.length; i++ ){

            var spriteObject = this.spriteList[i];
            spriteObject.sprite.stopAllActions();

            if ( newrect !== null ){

              var spriteList = Util.spriteList( spriteObject.spriteFrameName, newrect );
              var animateObj = Util.repeatAnimation( spriteList, delay, true);


              spriteObject.sprite.runAction( animateObj.repeat );
            }
        }
    }
});
