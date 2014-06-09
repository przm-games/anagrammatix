ig.module('game.entities.terrainDesert')
.requires(
    'game.atlas',
    'game.entities.terrain'
)
.defines(function() {

    EntityTerrainDesert = EntityTerrain.extend({
        animSheet: new ig.AnimationSheet('media/sprites/terrain-desert.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
    });
});
