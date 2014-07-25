ig.module('game.classes.deck')
    .requires(
        'game.classes.card'
    )
    .defines(function() {


        Deck = function( cardList, cardTypes, classes, entities, actions, type ){

            var _cards = [];
            var _origin = {x:0,y:0};

            var _classes = classes || {};
            var _entities = entities || {};
            var _actions = actions || {};

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
                    var self = this;

                    console.log('entities:');
                    console.log(_entities);

                    _.each(_cardList, function(quantity, key){
                        console.log(quantity);
                        console.log(key);

                        for (var i=0;i<quantity;i++){

                            var entity = _entities[_type](_origin);
                            console.log(entity);
                            entity.setType(_cardTypes[key].animation);

                            var card = new _classes[_type]({
                                id: 0,
                                entity: entity,
                                subClass: _cardTypes[key].class,
                                title: _cardTypes[key].title,
                                description: _cardTypes[key].description,
                                resolution: _cardTypes[key].resolution
                            });

                            _cards.push(card);

                            //TODO
                            //animate card going into deck
                            card.entity.reveal();
                            card.entity.hide();

                            console.log('new card:');
                            console.log(_cardTypes[key].title);
                        }

                    });
                    //new entityClass
                },
                addCard: function( card ){
                    _cards.push(card);
                },
//                generateCard: function( cardGenerator, quantity ) {
//                    for (var i=0; i<quantity; i++) {
//                        var card = new cardGenerator();
//                        _cards.push(card);
//                    }
//                },
                shuffle: function( count ) {
                    for (var i=0;i<count;i++){
                        _cards = _.shuffle(_cards);
                        console.log('shuffled cards');
                        console.log(_cards);
                    }
                },
                draw: function( quantity ) {
                    var drawnCards = [];

                    for (var i=0; i<quantity; i++) {
                        var card = _cards.pop();
                        drawnCards.push(card);
                    }

                    return drawnCards;
                },
                getCards: function( quantity, subClass ) {
                    console.log('getCards');
//                    console.log(_cards);
//                    console.log(_cards.length);
//                    console.log(quantity);
//                    console.log(subClass);

                    if (typeof quantity == "undefined") {
                        return _cards;
                    } else if (typeof subClass == "undefined") {
                        return _cards.slice(quantity);
                    } else {
                        var matches = [];
                        _.each(_cards,function(card){
                            if (matches.length<quantity && card.hasSubclass(subClass)){
                                matches.push(card);
                            }
                        });
                        _cards = _.difference(_cards,matches);
                        //console.log(matches);
                        return matches;
                    }
                },
                returnCards: function(cards){
                    //TODO return cards to deck
                    //TODO shuffle deck
                },
                dealCards: function( quantity, player, locationKey ) {
                    //TODO deal from top or bottom of deck???

                    //TODO deal revealed or hidden?

                    var dealt = _cards.splice(0,quantity);
                    player.receiveCards(dealt, locationKey);
                }
            };
        };
    });