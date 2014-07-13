ig.module('game.classes.deck')
.requires()
.defines(function() {
    
    Deck = function(){

        var _cards = [];

        //set card types

        //set quantity of card type 

        //shuffle

        //draw X cards

        return {
            addCard: function( cardGenerator, quantity ) {
                for (var i=0; i<quantity; i++) {
                    var card = new cardGenerator();
                    _cards.push(card);
                }
            },
            shuffle: function() {

            },
            draw: function( quantity ) {
                var drawnCards = [];

                for (var i=0; i<quantity; i++) {
                    var card = _cards.pop();
                    drawnCards.push(card);
                }

                return drawnCards;
            },
            getCards: function( quantity ) {
                if (typeof quantity == "undefined") {
                    return _cards;
                } else {
                    return _cards.slice(quantity);
                }
            }
        };
    };
});