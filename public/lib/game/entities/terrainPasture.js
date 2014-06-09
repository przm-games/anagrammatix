ig.module('game.entities.terrainPasture')
.requires(
    'game.atlas',
    'game.entities.terrain'
)
.defines(function() {

    EntityTerrainPasture = EntityTerrain.extend({
        animSheet: new ig.AnimationSheet('media/sprites/terrain-pasture.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
    });
});
