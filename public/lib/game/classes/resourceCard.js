ig.module('game.classes.resourceCard')
.requires('game.classes.card')
.defines(function() {
    
    ResourceCard = function( id, entity, resourceType ) {
        
        var card = new Card(id,entity,"resource");

        card.resourceType = resourceType;
        card.addSubclass(resourceType);

        card.entity.setType(resourceType);

        return card;
    };

});