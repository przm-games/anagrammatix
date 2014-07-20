ig.module('game.classes.player')
    .requires(
        'game.entities.road',
        'game.entities.city',
        'game.entities.settlement',
        'game.entities.location',
        'game.classes.pieceLocation'
    )
    .defines(function() {

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

            return {
                setName: function(name) {
                    _name = name;
                },
                getName: function() {
                    return _name;
                },

                addInventory: function(key, object) {
                    //developmentCards
                    //resourceCards

                    if (typeof _inventory[key] == "undefined") {
                        _inventory[key] = [];
                    }

                    _inventory[key].push(object);
                },
                getInventory: function() {
                    return _inventory;
                },

                setLocation: function(key,x,y) {
                    _locations[key] = {x:x, y:y}
                },
                getLocation: function(key) {
                    return _location[key];
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

                    var origin = _locations.origin;
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
                                position = {x:origin.x, y:origin.y+width/(total-1)*i};
                                break;

                            case Math.PI:
                                //extend left
                                position = {x:origin.x-width/(total-1)*i, y:origin.y};
                                break;

                            case Math.PI*3/2:
                                //extend up
                                position = {x:origin.x, y:origin.y-width/(total-1)*i};
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
                    console.log('player receiving cards:');
                    console.log(cards);
                    console.log(locationKey);

                    //get cards at location
                    var cardTarget =_cards[locationKey];
                    console.log(cardTarget);

                    _.each(cards,function(card){
                        var location = _locations[locationKey][cardTarget.length];
                        card.setLocation(location);
                        cards.push(card);
                    });

                },

                addPiece: function(piece){
                    _pieces.push(piece);
                },
                removePiece: function(piece){

                },
                getPieces: function(){
                    return _pieces;
                },

                getEligibleBuildingLocations: function() {
                    // roads
                    // get edge neighbors for current roads, settlements, and cities
                    // check that road is not on edge

                    // settlements
                    // get vertex neighbors for current roads
                    // check that vertex is at least 2 roads away and 2 edges away from another settlement

                    // cities
                    // get current settlements
                },
                buildRoad: function( terrain, position ) {

                    var location = _locations.origin;

                    var entity = ig.game.spawnEntity(EntityRoad, location.x, location.y);
                    var pieceId = 0;
                    var road = new Piece("road",pieceId,entity);

                    road.setOwner(this);
                    this.addPiece(road);

                    terrain.placePiece(road,position);
                },
                buildSettlement: function( terrain, position ) {

                    var location = _locations.origin;

                    var entity = ig.game.spawnEntity(EntitySettlement, location.x, location.y);
                    var pieceId = 0;
                    var settlement = new Piece("settlement",pieceId,entity);

                    settlement.setOwner(this);
                    this.addPiece(settlement);

                    terrain.placePiece(settlement,position);
                },
                buildCity: function( settlement ) {


                },

                moveRobber: function(terrain, location) {
                    terrain.placeRobber(location);
                },

                initiateTrade: function( player ){

                },
                makeTrade: function(){

                },

                getEligiblePurchases: function() {
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

                    console.log("eligible purchases:");
                    console.log(report);

                },
                purchase: function( item ){


                }
            };

        };
    });