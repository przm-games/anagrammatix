ig.module('game.classes.developmentCard')
    .requires('game.classes.card')
    .defines(function() {

        DevelopmentCard = function( config ) {
            //id, entity, title, description
            //console.log(config);
            var card = new Card(config.id,config.entity,"development");

            var _action = null;
            var _deck = null;

            card.addSubclass(config.subClass);

            card.title = config.title;
            card.description = config.description;


            card.generate = function() {
                //pull a unique card from deck

            };

           card.setDeck = function( deck ){
               _deck = deck;
           }

            card.setActivation = function( action ) {
                _action = action;
            };

            card.activate = function(){
                _action();
            };

            return card;
        };

    });