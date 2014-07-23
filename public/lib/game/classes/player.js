ig.module('game.classes.player')
    .requires(
        'game.config',

        'game.entities.road',
        'game.entities.city',
        'game.entities.settlement',
        'game.entities.location',
        'game.classes.pieceLocation'
    )
    .defines(function() {

        var pieceId = 0;

        Player = function(id) {

            var _id = id;
            var _color = null;
            var _name = null;
            var _cards = {
                hand: [],
                field: []
            };
            var _pieces = [];
            var _locations = {
                hand: [],
                field: []
            };
            var _inventory = {};
            var _entities = {};

            // rotate all assets along periphery of board
            var _orientation = 0;
            var _limits = {};
            var _blocked = false;

            return {

                roll: function( dice ){

                    _.each(dice, function(die){

                    });

                },

                setName: function(name) {
                    _name = name;
                },
                getName: function() {
                    return _name;
                },

                setLocation: function(key,x,y) {
                    _locations[key] = {x:x, y:y}
                },
                getLocation: function(key) {
                    return _locations[key];
                },

                setColor: function(color){
                    _color = color;
                },
                getColor: function(color){
                    return _color;
                },

                setEntity: function( key, entity ) {
                    _entities[key] = entity;
                },
                getEntity: function( key ) {
                    return _entities[key];
                },

                setOrientation: function(orientation) {
                    _orientation = orientation;
                },
                setLimits: function( limitMap ){
                    //_limits[key] = limit;
                    _.extend( _limits, limitMap );
                },
                getLimit: function(key) {
                    return _limits[key];
                },
                createLocation: function( position, locationKey ){
                    var cardLocations = _locations[locationKey];

                    var entity = ig.game.spawnEntity(EntityLocation, position.x, position.y);
                    // new Piece location model
                    var cardLocation = new PieceLocation(position.x,position.y,locationKey,0,entity);

                    cardLocations.push(cardLocation);
                },

                generateCardPositions: function( total, locationKey ) {
                    //positions relative to player origin
                    //mapped according to orientation

                    var origin = _locations.origin;

                    switch(_orientation){
                        case degrees[90]:

                        break;
                    }


                    var width = _limits.baseWidth;

                    this.createLocation(origin,locationKey);

                    // distribute positions along line
                    // TODO
                    // distribute positions along curve?

                    console.log(width);

                    for (var i=1;i<total;i++) {

                        var position;

                        // 0, Math.PI/2, Math.PI, Math.PI*3/2
                        switch( _orientation ) {
                            //distribute positions along maxWidth

                            case 0:
                                //extend right
                                position = {x:origin.x+width/(total-1)*i, y:origin.y};
                                break;

                            case Math.PI/2:
                                //extend down
                                position = {x:origin.x, y:origin.y-width/(total-1)*i};
                                break;

                            case Math.PI:
                                //extend left
                                position = {x:origin.x-width/(total-1)*i, y:origin.y};
                                break;

                            case Math.PI*3/2:
                                //extend up
                                position = {x:origin.x, y:origin.y+width/(total-1)*i};

                                break;
                        }

                        this.createLocation(position,locationKey);
                    }

                    // draw line of all possible positions
                    // rotate all cards to player orientation
                },
                showCardPositions: function( locationKey ) {
                    _.each(_locations[locationKey], function(location){

                    });
                },
                receiveCards: function( cards, locationKey ) {
                    var self = this;

                    console.log('player receiving cards:');
                    console.log(cards);
                    console.log(locationKey);

                    //get cards at location
                    var cardTarget =_cards[locationKey];
                    console.log(cardTarget);

                    _.each(cards,function(card){
                        var location = _locations[locationKey][cardTarget.length];
                        card.setLocation(location);
                        cardTarget.push(card);

                        //hide card from other players
                        card.hide();
                        card.entity.rotateToAngle(_orientation);

                        //process card for inventory
                        self.addInventory(card);
                    });



                },

                addPiece: function(piece){
                    _pieces.push(piece);
                },
                removePiece: function(piece){
                    console.log("removing piece");
                    console.log(_pieces.length);
                    _pieces =  _.without(_pieces,piece);
                    console.log(_pieces.length);
                },
                getPieces: function( key ){
                    if (typeof key=="undefined"){
                        return _pieces;
                    } else {
                        var cache = [];
                        _.each(_pieces, function(piece){
                           if (piece.type==key){
                              cache.push(piece);
                           }
                        });
                        return cache;
                    }

                },

                getEligibleBuildingLocations: function( item ) {
                    var self = this;

                    var locations = [];
                    var roads = this.getPieces('road');
                    var settlements = this.getPieces('settlement');

                    switch (item) {
                        // roads
                        // get edge neighbors for current roads, settlements, and cities
                        // check that road is not on edge
                        case 'road':


                            _.each(roads,function(road){
                               var origin = road.getLocation(); //edge
                                console.log('location under road');
                                console.log(origin);

                               var vertices = origin.getNeighbors(); //adjacent vertices
                                console.log('vertices adjacent to road');
                                console.log(vertices);

                                _.each(vertices,function(vertex){

                                    var edges = vertex.getNeighbors();
                                    console.log('edges of vertex');
                                    console.log(edges);

                                    _.each(edges,function(edge){
                                        if (edge.getPieces().length==0 && edge!=origin){
                                            locations.push(edge);
                                        }
                                    });
                                });
                            });

                            locations = _.uniq(locations);
                            break;

                        // settlements
                        // get vertex neighbors for current roads
                        // check that vertex is at least 2 roads away and 2 edges away from another settlement
                        case 'settlement':

                            _.each(roads,function(road){
                                locations = locations.concat(road.getLocation().getNeighbors());
                            });

                            locations = _.uniq(locations);
                            console.log('road vertices');
                            console.log(locations.length);

                            var invalidated = [];
                            _.each(locations,function(location){

                                var invalidLocation = false;

                                //if has a piece
                                if (location.getPieces().length>0){
                                    console.log('vertex occupied');
                                    invalidLocation=true;
                                } else {
                                    //if settlement or city is 1 vertex away
                                    _.each(location.getNeighborsAtDistance(2),function(vertex){
                                        if (vertex.getPieces().length>0){
                                            console.log('neighbor vertex occupied');
                                            invalidLocation=true;
                                        }
                                    });

                                }
                                if (invalidLocation){
                                    invalidated.push(location);
                                }
                            });
                            console.log('invalid vertices');
                            console.log(invalidated);

                            locations = _.difference(locations,invalidated);

                            break;

                        // cities
                        // get current settlements
                        case 'city':
                            //var cities = this.getPieces('city');
                            break;
                    }

                    return locations;
                },
                buildRoad: function( location ) {

                    var origin = _locations.origin;

                    var entity = ig.game.spawnEntity(EntityRoad, origin.x, origin.y);
                    var road = new Piece("road",pieceId,entity);

                    road.setOwner(this);
                    this.addPiece(road);

                    location.placePiece(road);
                },
                buildSettlement: function( location ) {

                    var origin = _locations.origin;

                    var entity = ig.game.spawnEntity(EntitySettlement, origin.x, origin.y);
                    var settlement = new Piece("settlement",pieceId,entity);

                    settlement.setOwner(this);
                    this.addPiece(settlement);

                    location.placePiece(settlement);
                },
                buildCity: function( settlement ) {

                    console.log('building city');
                    console.log(settlement);

                    //create city entity
                    var entity = ig.game.spawnEntity(EntityCity, location.x, location.y);
                    var city = new Piece("city",pieceId,entity);
                    city.setOwner(this);
                    this.addPiece(city);

                    settlement.getLocation().placePiece(city);


                    //destroy settlement
                    settlement.destroy();
                },
                buyDevelopmentCard: function( developmentCardDeck ) {
                    //subtract cost from inventory

                    //locate development card in developmentCard deck

                },
                activateDevelopmentCard: function( developmentCard, discardDeck ) {

                },


                moveRobber: function( robber, terrain ) {
                    terrain.placeRobber( robber );
                },

                initiateTrade: function( player ){

                },
                makeTrade: function(){

                },

                getValidActions: function(){

                    //crossreference permitted and affordable actions

                },

                getPermittedActions: function(){ //permission based on game state


                },

                getAffordableActions: function() { //based on player inventory
                    var self = this;

                    // check player inventory against catalog
                    var report = {};
                    // cache totals for each type of inventory
                    var totals = {};

                    _.each(_inventory,function(inventoryType,key){
                        console.log(inventoryType);
                        totals[key] = inventoryType.length;
                    });

                    console.log('inventory totals:');
                    console.log(totals);

                    _.each(catalog, function(item,name){

                        console.log(item.name);
                        report[item.name] = true;

                        _.each(item.cost, function(cost,key){

                            if (typeof totals[key]=="undefined" || totals[key]<cost) {
                                report[item.name] = false;
                            }

                        });

                    });

                    return report;
                },
                addInventory: function(object) {
                    console.log('receiving inventory for');

                    var key;
                    //cards:
                    //type: cards
                    //cardType: resource || development
                    //resourceType:

                    //developmentCards

                    //resourceCards by type
                    if (object.cardType=="resource") {
                        key = object.resourceType;
                    } else if (object.cardType=="development") {
                        key = object.cardType;
                    }

                    console.log(key);

                    if (typeof _inventory[key] == "undefined") {
                        _inventory[key] = [];
                    }

                    _inventory[key].push(object);

                    console.log(_inventory[key]);
                },
                getInventory: function() {
                    return _inventory;
                },
                consumeInventory: function(quantity,key) {
                    var consumed;
                    console.log(_inventory[key]);
                    if (typeof _inventory[key]==="undefined"){
                        return false;
                    } else if (_inventory[key]<quantity){
                        return false;
                    } else {
                        consumed = _inventory[key].splice(0,quantity);
                    }

                    return consumed;
                },
                purchase: function( item ){
                    var self = this;
                    console.log('purchasing '+item.name);
                    _.each(item.cost, function(cost,key){
                        if (!self.consumeInventory(cost,key)){
                            return false;
                        }
                    });
                    console.log(_inventory);
                    return true;
                }
            };

        };
    });