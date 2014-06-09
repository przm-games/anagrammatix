ig.module('game.entities.terrain')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {

    EntityTerrain = ig.Entity.extend({
        size: Atlas.entities.terrain.size,
        offset: { x: Atlas.entities.terrain.size.x/2,y: Atlas.entities.terrain.size.y/2 },
        //speed: 20, \
        animSheet: new ig.AnimationSheet('media/sprites/terrain-desert.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('only', 0.3, [0]);
            this.currentAnim = this.anims.only;

        }
    });
});
