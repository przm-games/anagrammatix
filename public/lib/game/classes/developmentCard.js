ig.module('game.classes.developmentCard')
.requires('game.classes.card')
.defines(function() {
    
  DevelopmentCard = function( id, entity, deck ) {
        
        var card = new Card(id,entity,"development");

        card.deck = deck;
        card.action = null;

        card.generate = function() {
            //pull a unique card from deck

        };

        card.setActivation = function( action ) {
            card.action = action;
        };

        card.activate = function(){
            card.action();
        };

        return card;
    };

});