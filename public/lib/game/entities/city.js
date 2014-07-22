ig.module('game.entities.city')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {
    var config = Atlas.entities.city;

    EntityCity = ig.Entity.extend({
        size: config.size,
        offset: { x: config.size.x/2,y: config.size.y/2 },
        animSheet: new ig.AnimationSheet(config.sprite, config.size.x, config.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            
            this.addAnim('brown', 0.3, [0]);
            this.addAnim('green', 0.3, [1]);
            this.addAnim('yellow', 0.3, [2]);
            this.addAnim('blue', 0.3, [3]);
            this.addAnim('red', 0.3, [4]);
            this.addAnim('white', 0.3, [5]);

            this.currentAnim = this.anims.red;
        },
        setIdentifier: function(color) {
            this.currentAnim = this.anims[color];
        },
        setOwner: function(playerId) {
            
        },
        setLocation: function(location) {

        }
    });
});