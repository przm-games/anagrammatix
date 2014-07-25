ig.module('game.entities.badge')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {
    var config = Atlas.entities.badge;

    EntityBadge = ig.Entity.extend({
        size: config.size,
        offset: { x: config.size.x/2,y: config.size.y/2 },
        animSheet: new ig.AnimationSheet(config.sprite, config.size.x, config.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('largestArmy', 0.3, [0]);
            this.addAnim('longestRoad', 0.3, [1]);

            this.currentAnim = this.anims.largestArmy;
        },
        setType: function(type) {
            this.currentAnim = this.anims[type];
        },

        rotateToAngle: function(angle) {
            this.currentAnim.angle = angle;
        }
    });
});