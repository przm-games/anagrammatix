ig.module('game.entities.location')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {

    EntityLocation = ig.Entity.extend({
        size: Atlas.entities.location.size,
        offset: { x: Atlas.entities.location.size.x/2,y: Atlas.entities.location.size.y/2 },
        //speed: 20, 
        animSheet: new ig.AnimationSheet(Atlas.entities.location.sprite, Atlas.entities.location.size.x, Atlas.entities.location.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('only', 0.3, [0]);
            this.currentAnim = this.anims.only;

        }
    });
});
