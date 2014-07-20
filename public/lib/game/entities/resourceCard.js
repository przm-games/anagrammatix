ig.module('game.entities.resourceCard')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {
    var config = Atlas.entities.resourceCard;

    EntityResourceCard = ig.Entity.extend({
        size: config.size,
        offset: { x: config.size.x/2,y: config.size.y/2 },
        animSheet: new ig.AnimationSheet(config.sprite, config.size.x, config.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('hidden', 0.3, [0]);
            this.addAnim('wheat', 0.3, [1]);
            this.addAnim('sheep', 0.3, [2]);
            this.addAnim('brick', 0.3, [3]);
            this.addAnim('wood', 0.3, [4]);
            this.addAnim('ore', 0.3, [5]);

            this.currentAnim = this.anims.hidden;
        },
        setType: function(type) {
            this.resourceType = type;
        },
        reveal: function() {
            this.currentAnim = this.anims[this.resourceType];
        },
        hide: function() {
            this.currentAnim = this.anims.hidden;
        },

        rotateToAngle: function(angle) {
            this.currentAnim.angle = angle;
        },

        setOwner: function(playerId) {
            
        },
        addPiece: function(piece){

        }
    });
});