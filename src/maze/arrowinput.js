var ArrowInputLayer = cc.Layer.extend({

    up_press: function(){
      this.direction = 'up';
      this.movementCallback(this.direction);
      if ( this.log )
        console.log('up_press');
    },
    up_cancel: function(){
      if ( this.direction === 'up' ){
        this.direction = 'no';
        this.movementCallback(this.direction);
      }
      if ( this.log )
        console.log('up_cancel');
    },
    dn_press: function(){
      this.direction = 'dn';
      this.movementCallback(this.direction);
      if ( this.log )
        console.log('dn_press');
    },
    dn_cancel: function(){
      if ( this.direction === 'dn' ){
        this.direction = 'no';
        this.movementCallback(this.direction);
      }
      if ( this.log )
        console.log('dn_cancel');
    },


    lt_press: function(){
      this.direction = 'lt';
      this.movementCallback(this.direction);
      if ( this.log )
      console.log('lt_press');
    },
    lt_cancel: function(){
      if ( this.direction === 'lt' ){
        this.direction = 'no';
        this.movementCallback(this.direction);
      }
      if ( this.log )
      console.log('lt_cancel');
    },

    rt_press: function(){
      this.direction = 'rt';
      this.movementCallback(this.direction);
      if ( this.log )
      console.log('rt_press');
    },
    rt_cancel: function(){
      if ( this.direction === 'rt' ){
        this.direction = 'no';
        this.movementCallback(this.direction);
      }
      if ( this.log )
        console.log('rt_cancel');
    },


    getMovement: function(){
      return this.direction;
    },



    ctor:function ( movementCallback ) {
        this._super();
        var size = cc.winSize;
        this.direction = 'no';
        this.log = false;

        if ( !movementCallback ){
          movementCallback = function(){};
        }
        this.movementCallback = movementCallback;




        var up = new cc.Sprite('res/arrow/arrowup.png');
        var up_p = new cc.Sprite('res/arrow/arrowup_p.png');
        this.up = new CurryButton(up, up_p, this.up_cancel, this.up_press,  this);
        this.up.setScale(0.5);
        this.addChild( this.up );


        this.up.setPosition( 130, 200);

        var dn = new cc.Sprite('res/arrow/arrowdn.png');
        var dn_p = new cc.Sprite('res/arrow/arrowdn_p.png');
        this.dn = new CurryButton(dn, dn_p, this.dn_cancel, this.dn_press,  this);
        this.dn.setScale(0.5);
        this.addChild( this.dn );

        this.dn.setPosition( 130, 50);


        var lt = new cc.Sprite('res/arrow/arrowlt.png');
        var lt_p = new cc.Sprite('res/arrow/arrowlt_p.png');
        this.lt = new CurryButton(lt, lt_p, this.lt_cancel, this.lt_press,  this);
        this.lt.setScale(0.5);
        this.addChild( this.lt );

        this.lt.setPosition( 55, 125);


        var rt = new cc.Sprite('res/arrow/arrowrt.png');
        var rt_p = new cc.Sprite('res/arrow/arrowrt_p.png');
        this.rt = new CurryButton(rt, rt_p, this.rt_cancel, this.rt_press,  this);
        this.rt.setScale(0.5);
        this.addChild( this.rt );

        this.rt.setPosition( 205, 125);


    }
})
