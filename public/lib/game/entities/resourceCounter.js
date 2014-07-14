ig.module('game.entities.resourceCounter')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {
    var config = Atlas.entities.resourceCounter;

    EntityResourceCounter = ig.Entity.extend({
        size: config.size,
        offset: { x: config.size.x/2,y: config.size.y/2 },
        animSheet: new ig.AnimationSheet(config.sprite, config.size.x, config.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('d2', 0.3, [0]);
            this.addAnim('d3', 0.3, [1]);
            this.addAnim('d4', 0.3, [2]);
            this.addAnim('d5', 0.3, [3]);
            this.addAnim('d6', 0.3, [4]);
            this.addAnim('d8', 0.3, [5]);
            this.addAnim('d9', 0.3, [6]);
            this.addAnim('d10', 0.3, [7]);
            this.addAnim('d11', 0.3, [8]);
            this.addAnim('d12', 0.3, [9]);

            console.log(settings);

            if (settings.number) {
                this.currentAnim = this.anims['d'+settings.number];
            } else {
                this.currentAnim = this.anims.d2;
            }
            //cache number to lookup terrain for resource production phase
            this.dieValue = settings.number;
        }
    });
});