ig.module('game.entities.terrainFields')
.requires(
    'game.atlas',
    'game.entities.terrain'
)
.defines(function() {

    EntityTerrainFields = EntityTerrain.extend({
        animSheet: new ig.AnimationSheet('media/sprites/terrain-fields.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
    });
});
