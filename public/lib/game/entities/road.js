ig.module('game.entities.road')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {
    var config = Atlas.entities.road;

    EntityRoad = ig.Entity.extend({
        size: config.size,
        offset: { x: config.size.x/2,y: config.size.y/2 },
        animSheet: new ig.AnimationSheet(config.sprite, config.size.x, config.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('only', 0.3, [0]);
            this.currentAnim = this.anims.only;

        },
        rotateToAngle: function(angle) {
            this.currentAnim.angle = angle;
        }
    });
});