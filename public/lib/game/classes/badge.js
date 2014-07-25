ig.module('game.classes.badge')
.requires('game.classes.card')
.defines(function() {
    
    Badge = function( id, entity, badgeType ) {
        
        var card = new Card(id,entity,"badge");

        card.inventoryKey = badgeType;
        card.addSubclass(badgeType);

        card.entity.setType(badgeType);

        return card;
    };

});