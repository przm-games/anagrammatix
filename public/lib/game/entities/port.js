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

            this.addAnim('brick', 0.3, [0]);
            this.addAnim('sheep', 0.3, [1]);
            this.addAnim('ore', 0.3, [2]);
            this.addAnim('wheat', 0.3, [3]);
            this.addAnim('wood', 0.3, [4]);
            this.addAnim('any', 0.3, [5]);
            this.currentAnim = this.anims.brick;

        },
        rotateToAngle: function(angle) {
            this.currentAnim.angle = angle;
        },
        setResourceType: function(type) {
            this.currentAnim = this.anims[type];
        },
        alignToEdge: function(edgeIndex) {
            var  angle, xOffset, yOffset;

            //TODO 
            //calculate proper offsets

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

            // console.log(xOffset);
            // console.log(yOffset);

            this.rotateToAngle(angle);

            this.pos.x +=xOffset;
            this.pos.y +=yOffset;
        }
    });
});