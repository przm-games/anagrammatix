ig.module('game.atlas')
.defines(function() {

    Atlas = {
        global: {
            gridSpacing: {x:91,y:105}
        },
        entities: {
            terrain: {
                size: { x:182, y:210 }
            },
            location: {
                size: { x:42, y:42 },
                sprite: 'media/sprites/location-valid.png'
            }
        }
    };

});