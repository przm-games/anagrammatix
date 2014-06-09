ig.module('game.entities.terrainForest')
.requires(
    'game.atlas',
    'game.entities.terrain'
)
.defines(function() {

    EntityTerrainForest = EntityTerrain.extend({
        animSheet: new ig.AnimationSheet('media/sprites/terrain-forest.png', Atlas.entities.terrain.size.x, Atlas.entities.terrain.size.y),
    });
});
