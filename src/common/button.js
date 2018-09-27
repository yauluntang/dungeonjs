var CurryButton = cc.Node.extend({

    touchDownCallback: function(e){
        if ( typeof this.downCallback === 'function' ){
          this.downCallback.call( this.callbackParent, e);
        }

    },
    touchUpCallback: function(e){
        if ( typeof this.upCallback === 'function' ){
          this.upCallback.call( this.callbackParent, e);
        }
    },
    ctor: function (normalSprite, activeSprite, upCallback, downCallback, callbackParent ) {
        this._super();

        this.normalSprite = normalSprite;
        this.activeSprite = activeSprite;

        this.callbackParent = callbackParent;

        this.activeSprite.setVisible(false);
        this.addChild(normalSprite);
        this.addChild(activeSprite);
        this.upCallback = upCallback;
        this.downCallback = downCallback;
        this.touched = false;


        var handleTouch = function(touch, event, move){


            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var rect = cc.rect( normalSprite.x - normalSprite.width / 2, normalSprite.y - normalSprite.height / 2, normalSprite.width, normalSprite.height );

            if (cc.rectContainsPoint( normalSprite.getBoundingBox(), locationInNode)) {
                this.normalSprite.setVisible(false);
                this.activeSprite.setVisible(true);
                this.touched = true;
                if ( this.touchDownCallback) {
                    this.touchDownCallback(touch, event, this);
                }
                return true;
            } else {
                //this.drawBox( false );
                return false;
            }
        }
        var handleTouchOut = function(touch, event){

            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var rect = cc.rect( normalSprite.x - normalSprite.width / 2, normalSprite.y - normalSprite.height / 2, normalSprite.width, normalSprite.height );

            this.normalSprite.setVisible(true);
            this.activeSprite.setVisible(false);






            if ( this.touched ) {
                this.touched = false;
                if ( this.touchUpCallback) {
                    this.touchUpCallback(touch, event, this);
                }
                return true;
            } else {
                this.touched = false;
                return false;
            }
        }

        var that = this;

        cc.eventManager.addListener( cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                return handleTouch.call (that, touch, event );
            },
            onTouchMoved: function(touch, event) {
                //return handleTouch.call( that,touch, event, true );
            },
            onTouchEnded: function(touch, event)  {
                return handleTouchOut.call( that,touch, event );
            }

        }), this );
    }
});
