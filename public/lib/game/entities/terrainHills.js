ig.module('game.entities.terrainHills')
.requires(
    'game.atlas',
    'game.entities.terrain'
)
.defines(function() {

    EntityTerrainHills = EntityTerrain.extend({
        animSheet: new ig.AnimationSheet('media/sprites/terrain-hills.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
    });
});
