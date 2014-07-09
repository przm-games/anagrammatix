ig.module('game.entities.developmentCard')
.requires(
    'impact.game',
    'impact.entity',
    'game.atlas'
)
.defines(function() {
    var config = Atlas.entities.developmentCard;

    EntityDevelopmentCard = ig.Entity.extend({
        size: config.size,
        offset: { x: config.size.x/2,y: config.size.y/2 },
        animSheet: new ig.AnimationSheet(config.sprite, config.size.x, config.size.y),
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('hidden', 0.3, [0]);
            this.addAnim('knight', 0.3, [1]);
            this.addAnim('plenty', 0.3, [2]);
            this.addAnim('road', 0.3, [3]);
            this.addAnim('monopoly', 0.3, [4]);
            this.addAnim('library', 0.3, [5]);
            this.addAnim('market', 0.3, [6]);
            this.addAnim('palace', 0.3, [7]);
            this.addAnim('university', 0.3, [8]);
            this.addAnim('chapel', 0.3, [9]);

            this.currentAnim = this.anims.hidden;
        },
        setType: function(type) {
            this.developmentType = type;
        },
        reveal: function() {
            this.currentAnim = this.anims[this.developmentType];
        },
        hide: function() {
            this.currentAnim = this.anims.hidden;
        },
    });
});