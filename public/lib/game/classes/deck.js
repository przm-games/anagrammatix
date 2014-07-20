ig.module('game.classes.deck')
    .requires(
        'game.classes.card'
    )
    .defines(function() {


        Deck = function( cardList, cardTypes, entityClass, type ){

            var _cards = [];
            var _origin = {x:0,y:0};

            var _cardList = cardList || [];
            var _cardTypes = cardTypes || {};
            var _type = type || null;


            //set card types

            //set quantity of card type

            //shuffle

            //draw X cards

            return {
                setOrigin: function( x, y ){
                    _origin.x = x;
                    _origin.y = y;
                },
                populate: function() {

                    //new entityClass
                },
                addCard: function( card ){
                    _cards.push(card);
                },
                generateCard: function( cardGenerator, quantity ) {
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
                },
                dealCards: function( quantity, player, locationKey ) {
                    //TODO
                    // deal from top or bottom of deck???

                    var dealt = _cards.splice(0,quantity);
                    player.receiveCards(dealt, locationKey);
                }
            };
        };
    });