
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {

                    return(new me.Rect(0, 0, 128, 128)).toPolygon();
                }
            }]);
        this.renderable.addAnimation("idle", [3])
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);


        this.body.setVelocity(5, 20);

    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }

        if (this.body.vel.x !== 0) {
            if (!this.big) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            } else {

            }
        }
            
            this.body.update(delta);
            this._super(me.Entity, "update", [delta]);
            return true;
        
    }

});

game.levelTrigger = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
    },
    onCollision: function() {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
    }
});
