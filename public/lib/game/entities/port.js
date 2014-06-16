ig.module('game.entities.port')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {
    var config = Atlas.entities.port;

    EntityPort = ig.Entity.extend({
        size: config.size,
        offset: { x: config.size.x/2,y: config.size.y/2 },
        animSheet: new ig.AnimationSheet(config.sprite, config.size.x, config.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('only', 0.3, [0]);
            this.currentAnim = this.anims.only;

        },
        rotateToAngle: function(angle) {
            this.currentAnim.angle = angle;


        },
        alignToEdge: function(edgeIndex) {
            var  angle, xOffset, yOffset;

            switch (edgeIndex) {
                case 1:
                    angle = Math.PI/6;
                    xOffset = config.size.x/4;
                    yOffset = -config.size.y/3;
                break;
                case 3:
                    angle = Math.PI/2;
                    xOffset = config.size.x/2;
                    yOffset = 0;
                break;
                case 5:
                    angle = Math.PI/6*5;
                    xOffset = config.size.x/4;
                    yOffset = config.size.y/3;
                break;
                case 7:
                    angle = -Math.PI/6*5;
                    xOffset = -config.size.x/4;
                    yOffset = config.size.y/3;
                break;
                case 9:
                    angle = -Math.PI/2;
                    xOffset = -config.size.x/2;;
                    yOffset = 0;
                break;
                case 11:
                    angle = -Math.PI/6;
                    xOffset = -config.size.x/4;
                    yOffset = -config.size.y/3;
                break;
            }

            console.log(xOffset);

            console.log(yOffset);

            this.pos.x +=xOffset;
            this.pos.y +=yOffset;
        }
    });
});