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

            port: {
                size: { x:104, y:90 },
                sprite: 'media/sprites/port-sprite.png'
            },
            road: {
                size: { x:20, y:85 },
                sprite: 'media/sprites/road-sprite.png'
            },
            city: {
                size: { x:44, y:52 },
                sprite: 'media/sprites/city-sprite.png'
            },
            settlement: {
                size: { x:30, y:37 },
                sprite: 'media/sprites/settlement-sprite.png'
            },
            robber: {
                size: { x:49, y:102 },
                sprite: 'media/sprites/robber.png'
            },
            location: {
                size: { x:42, y:42 },
                sprite: 'media/sprites/location-valid.png'
            },
            resourceCounter: {
                size: { x:78, y:76 },
                sprite: 'media/sprites/counter-sprite.png'
            },
            resourceCard: {
                size: { x:90, y:133 },
                sprite: 'media/sprites/resource-sprite.png'
            },
            developmentCard: {
                size: { x:90, y:133 },
                sprite: 'media/sprites/development-sprite.png'
            },
            badge: {
                size: { x:90, y:133 },
                sprite: 'media/sprites/badge-sprite.png'
            },
            playerMarker: {
                size: { x:96, y:96 },
                sprite: 'media/sprites/player-marker.png'
            }
        }
    };

});