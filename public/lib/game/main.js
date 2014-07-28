ig.module(
        'game.main'
    )
    .requires(
        'impact.game',
        'impact.font',

        'game.atlas',
        'game.utils',

        'game.entities.playerMarker',

        'game.entities.terrain',
        'game.entities.port',
        'game.entities.road',
        'game.entities.city',
        'game.entities.settlement',
        'game.entities.robber',
        'game.entities.location',
        'game.entities.resourceCard',
        'game.entities.resourceCounter',
        'game.entities.developmentCard',
        'game.entities.badge',

        'game.entities.terrainDesert',
        'game.entities.terrainFields',
        'game.entities.terrainForest',
        'game.entities.terrainHills',
        'game.entities.terrainMountains',
        'game.entities.terrainPasture',
        //'impact.debug.debug',

        'game.classes.terrain',
        'game.classes.resourceCard',
        'game.classes.developmentCard',
        'game.classes.badge',
        'game.classes.harbor',
        'game.classes.pieceLocation',
        'game.classes.player',
        'game.classes.deck',
        'game.classes.robber',

        // developer files
        'game.config'
    )
    .defines(function(){

        function showTestMarker(x,y) {
            var font = new ig.Font( 'media/04b03.font.png' );
            font.draw( 'X', x, y, ig.Font.ALIGN.CENTER );
        }

        var pieceId = 0;

        MyGame = ig.Game.extend({

            width: zones.board.w,
            height: zones.board.h,

            // Load a font
            font: new ig.Font( 'media/04b03.font.png' ),

            // Bind classes to key names
            classMap: {
                development: DevelopmentCard,
                resource: ResourceCard
            },

            entityMap: {
                development: function( origin ){
                    console.log(origin);
                    return ig.game.spawnEntity(EntityDevelopmentCard, origin.x, origin.y);
                },
                resource: function( origin ){
                    return ig.game.spawnEntity(EntityResourceCard, origin.x, origin.y);
                }
            },

            actionMap: {
                activateKnight: function(){
                    console.log("activateKnight");
                },
                activateRoadBuilding: function(){
                    console.log("activateRoadBuilding");
                },
                activateYearOfPlenty: function(){
                    console.log("activateYearOfPlenty");
                },
                activateMonopoly: function(){
                    console.log("activateMonopoly");
                },
                earnVictoryPoint: function(){
                    console.log("earnVictoryPoint");
                }

            },

            origins: [],
            locationOrigins: [],

            configuration: {
                players: {
                    positions: [],
                    orientations: []
                }
            }, //player positions

            players: [],

            locations: [],
            terrain: [],
            numberTokens: [],
            ports: [],

            decks: {},
            badges: {},
            bank: {},

            desert: null,
            robber: null,

            leaders: {}, //for largest army and longest road

//IMPACT JS OVERRIDES
            init: function() {
                // Initialize your game here; bind keys etc.


            },

            update: function() {
                // Update all entities and backgroundMaps
                this.parent();

                // Add your own, additional update code here
            },

            draw: function() {
                // Draw all entities and backgroundMaps
                this.parent();
            },
//CUSTOM FUNCTIONS
            startGame: function() {

            },

            saveGame: function() {

                //cache board setup


                //terrain: type
                //number token: number
                //robber: position


                //for each player
                //cache pieces
                //cache inventory

            },

            addPlayer: function( playerData ){
                var self = this;

                //_.each(playerConfig,function(playerData,n){
                var n = self.players.length;

                var player = new Player(n);
                var position = self.configuration.players.positions[n];

                var entity = ig.game.spawnEntity(PlayerMarker, position.x, position.y);
                entity.setIdentifier(playerData.color);

                console.log('addPlayer');
                console.log(playerData);

                //player.setLimits(limits);
                player.setLocation('origin',position.x,position.y);
                player.setEntity('base',entity);
                player.setOrientation(self.configuration.players.orientations[n]);
                player.setColor(playerData.color);
                player.setName(playerData.name);

                player.generateCardPositions(16, 'hand', ZONES.hand );
                player.showCardPositions('hand');

                player.generateCardPositions(8, 'field',ZONES.field );
                player.showCardPositions('field');

                player.generateCardPositions(2, 'badges',ZONES.badges );
                player.showCardPositions('badges');

                self.players.push(player);

            },

            loadGame: function( gameState ) {

            },

            //parse command object from websocket into game action(s)
            parseCommand: function( data ){

            },

            correctEntityLayers: function(){

            },

            render: function() {

                var self = this;

                //TODO load game from cache

                //TODO if no gameState cache
                this.setupNewGame();
            },

            setupBank: function(){
                //TODO total resource cards available ???
            },

            setupBadges: function( badges ){
                var self = this;
                console.log('setupBadges');

                _.each(badges,function(badgeData,key){
                    console.log(badgeData);
                    console.log(key);
                    var entity = ig.game.spawnEntity(EntityBadge, badgeData.origin.x, badgeData.origin.y);
                    var badge = new Badge(pieceId,entity,key);

                    self.badges[key]=badge;
                });
                //console.log(self.badges);
                //alert('check badges');
            },

            checkForLargestArmy: function(){ //must run after every knight activation!!!
                console.log('checkForLargestArmy');
                console.log(this);
                this.checkLeader('largestArmy',2,'countKnights');
            },

            checkForLongestRoad: function(){ //TODO must run after every road built !!!
                console.log('checkForLongestRoad');
                console.log(this);
                this.checkLeader('longestRoad',6,'countLongestRoad');
            },

            checkLeader: function(badgeKey,threshold,countFunction){

                var self = this;
                var leader = null;
                var bestCount = this.leaders[badgeKey] ? this.leaders[badgeKey][countFunction]() : threshold;

                _.each(this.players,function(player){
                    var count = player[countFunction]();
                    if (count>bestCount) {
                        leader = player;
                    }
                });

                if (leader!==null && self.leaders[badgeKey]!==leader){ //new leader

                    if (this.leaders[badgeKey]){ //previous leader
                        this.leaders[badgeKey].removeBadge(badgeKey)
                    }

                    leader.addBadge(badgeKey,self.badges[badgeKey]);
                    self.leaders[badgeKey] = leader;
                }
            },

            makeMaritimeTrade: function( player, givenType, receivedType ){
                console.log('makeMaritimeTrade');
                //get ratio
                var ratio = Math.min(player.getTrades()[givenType],player.getTrades()['any']);
                console.log(givenType);
                console.log(ratio);
                console.log(receivedType);

                //consume given
                var given = player.consumeInventory(ratio,givenType);
                this.decks['bank'].receiveCards(given);

                //add received
                var resource = this.createResourceCard(receivedType,POSITIONS.default);
                player.receiveCards([resource],'hand');
            },

            makeTrade: function( exchanges ){

                var a = exchanges[0];
                var givenA = a.player.consumeInventory(a.quantity, a.type);
                a.player.sortHand();

                var b = exchanges[1];
                var givenB = b.player.consumeInventory(b.quantity, b.type);
                b.player.sortHand();

                a.player.receiveCards(givenB,'hand');
                a.player.sortHand();

                b.player.receiveCards(givenA,'hand');
                b.player.sortHand();
            },

            setupNewGame: function() {

                this.setupTerrain(TERRAIN_MAP);
                this.placeTerrain(this.origins);

                this.setupNumberTokens(NUMBER_TOKENS);
                this.placeNumberTokens(this.origins);

                this.setupLocations(this.origins);

                this.setupPorts(PORT_LIST);
                this.placePorts(EDGE_MAP, HARBOR_EDGE_INDEX);

                this.setupDecks(DECKS);
                this.setupBadges(BADGES);

                this.setupPlayers({playerCount:4});

                var location = this.desert.getOrigin();
                var entity = ig.game.spawnEntity(EntityRobber, location.x, location.y);
                var robber = new Robber(pieceId,entity);

                this.robber = robber;
            },

            setupDecks: function(decks) {
                var self = this;
                console.log('setupDecks');

                _.each( decks, function( deckConfig ){

                    var deck;
                    var cardList = deckConfig.cards;

                    console.log(deckConfig.origin);

                    if (cardList!==null){
                        var cardTypes = library[deckConfig.type];

                        deck = new Deck( cardList, cardTypes, self.classMap, self.entityMap, deckConfig.type );
                        deck.setOrigin(deckConfig.origin.x, deckConfig.origin.y);
                        deck.populate();
                        deck.shuffle(3);
                    } else {
                        deck = new Deck();
                        deck.setOrigin(deckConfig.origin.x, deckConfig.origin.y);
                    }

                    self.decks[deckConfig.name] = deck;
                });

            },

            setupPlayers: function( gameConfig ) {
                var self = this;

                console.log(playerConfig.length);
                //establish player positions on/around board

                //1 position at each of 4 corners
                var cornerOffset = offsets.playerCorner;
                //var positions = [];
                //var orientations = [];

                if (gameConfig.playerCount<=4) {
                    //starting top right, placing clockwise
                    self.configuration.players.positions = [
                        {x:cornerOffset.x,y:cornerOffset.y},
                        {x:zones.board.w-cornerOffset.y,y:cornerOffset.x},
                        {x:zones.board.w-cornerOffset.x,y:zones.board.w-cornerOffset.y},
                        {x:cornerOffset.y,y:zones.board.w-cornerOffset.x}
                    ];

                    self.configuration.players.orientations = [
                        Math.PI, Math.PI*3/2, 0, Math.PI/2
                    ];


                } else if (playerConfig.length>4) {
                    //TODO
                    //5-6 players
                }


//                _.each(playerConfig,function(playerData,n){
//
//                    var player = new Player(n);
//                    var position = positions[n];
//
//                    var entity = ig.game.spawnEntity(PlayerMarker, position.x, position.y);
//                    entity.setIdentifier(playerData.color);
//
//                    //TODO set player info: name
//
//                    //player.setLimits(limits);
//                    player.setLocation('origin',position.x,position.y);
//                    player.setEntity('base',entity);
//                    player.setOrientation(orientations[n]);
//                    player.setColor(playerData.color);
//                    player.setName(playerData.name);
//
//                    player.generateCardPositions(16, 'hand', ZONES.hand );
//                    player.showCardPositions('hand');
//
//                    player.generateCardPositions(8, 'field',ZONES.field );
//                    player.showCardPositions('field');
//
//                    player.generateCardPositions(2, 'badges',ZONES.badges );
//                    player.showCardPositions('badges');
//
//                    self.players.push(player);
//                });
            },

            produceResources: function( dieValue ) {
                console.log('producing resources on '+dieValue);

                var payouts = [];

                //get terrain with number counter equal to dieValue
                _.each(this.terrain, function(terrain,n){
                    if (terrain.getDieValue()==dieValue && !terrain.isBlocked()){
                        payouts = payouts.concat(terrain.generateResources());
                    }
                });

                this.dealResourceCards(payouts);
            },

            dealDevelopmentCards: function( quantity, player ){
                var self = this;
                console.log('dealDevelopmentCard');
                this.decks['development'].dealCards(quantity,player,'hand');
            },

            setDevelopmentCards: function( payouts ){
                var self = this;
                //{player:piece.getOwner(),count:resourceCount,subClass:"",location:""}

                _.each(payouts,function(payout){
                    var dealt = [];

                    dealt = dealt.concat(self.decks['development'].getCards(payout.count,payout.subClass));

                    payout.player.receiveCards(dealt, payout.location);
                });


            },

            dealResourceCards: function( payouts ){
                var self = this;
                var newResources = new Deck(); //create temporary deck for new cards

                _.each(payouts,function(payout){
                    // spawn resource cards

                    var resourceType = payout.type;
                    var position = payout.origin;

                    console.log(resourceType);

                    for (var i=0;i<payout.count;i++) {

                        var resourceCard = self.createResourceCard(resourceType,position);
                        resourceCard.reveal();

                        newResources.addCard(resourceCard);
                        console.log('produced resource:');
                        console.log(resourceCard);
                    }

                    // give cards to recipients
                    // by dealing cards from temporary deck
                    newResources.dealCards( payout.count, payout.player, 'hand');
                });

                //return newResources;
            },

            createResourceCard: function( resourceType, position ){

                var entity = ig.game.spawnEntity(EntityResourceCard, position.x, position.y);
                var resourceCard = new ResourceCard(pieceId,entity,resourceType);

                return resourceCard;
            },

            setupPorts: function(portList) {
                _.each(portList,this.spawnPort.bind(this));
            },
            spawnPort: function(resourceType) {

                var entity = ig.game.spawnEntity(EntityPort, defaultOrigin.x, defaultOrigin.y);
                var port = new Harbor(pieceId,entity,resourceType);

                this.ports.push(port);
            },
            placePorts: function(edgeMap,portEdgeIndex) {
                console.log('placePorts');
                var self = this;

                //create ordered list of outer edges
                var outerEdges = [];

                _.each(edgeMap,function(edgeList){
                    var terrain = self.terrain[edgeList.i];

                    _.each(edgeList.e,function(edgeIndex){
                        outerEdges.push(terrain.getEdge(edgeIndex));
                    });
                });

                var portEdges = [];

                _.each(portEdgeIndex,function(edgeIndex){
                    portEdges.push(outerEdges[edgeIndex]);
                });

                //shuffle ports
                self.ports = _.shuffle(self.ports);

                _.each(portEdges,function(location,index){
                    //location.show();
                    var port = self.ports[index];
                    port.setEdge(location);
                });
            },

            setupNumberTokens: function(numberTokens) {
                // generate numberToken entities
                for (var i=0;i<numberTokens.length;i++) {
                    var numberToken = ig.game.spawnEntity(EntityResourceCounter, 100+40*i, 200, {number:numberTokens[i]});
                    //this.numberTokens.push(numberToken);
                }

            },

            placeNumberTokens: function(origins) {
                var self = this;

                var placementOrder = [0,3,7,12,16,17,18,15,11,6,2,1,4,8,13,14,10,5,9];
                var numberTokens = ig.game.getEntitiesByType(EntityResourceCounter);

                // check for desert tile
                // and skip number token
                var desertIndex = this.desert.getOrigin().index;
                placementOrder = _.without(placementOrder,desertIndex);

                //console.log('desert tile at:');
                //console.log(this.desert.getOrigin());


                placementOrder.forEach(function(terrainIndex,orderIndex){
                    var numberToken = numberTokens[orderIndex];
                    self.terrain[terrainIndex].placeNumberToken(numberToken);
                });
            },

            setupLocations: function() {
                var self = this;

                var origin = {x:offsets.boardCenter.x+2*xSpacing,y:offsets.boardCenter.y};


                _.each(self.terrain, function(terrain){
                    generateLocationOrigins(terrain);
                });


                _.each(self.locations,function(location){
                    var potentialNeighbors = findNeighbors(location);
                    var currentNeighbors = location.getNeighbors();

                    //console.log('location.entity.zIndex: '+location.entity.zIndex);

                    if (currentNeighbors<potentialNeighbors) {
                        var newNeighbors = _.difference(potentialNeighbors,currentNeighbors);
                        //console.log(newNeighbors.length);
                        _.each(newNeighbors,function(newNeighbor){
                            location.addNeighbor(newNeighbor);
                            newNeighbor.addNeighbor(location);
                        });
                    }
                });


                _.each(self.terrain,function(terrain, index){
                    terrain.hideLocations();
                    //terrain.showLocations([0,2,4,6,8,10]);
                });

                function findNeighbors(location){

                    var x = location.position.x, y = location.position.y;

                    var neighbors = _.filter(self.locations,function(testOrigin){

                        var testX = testOrigin.position.x, testY = testOrigin.position.y;

                        return (
                            (testX==x && testY==y-ySpacing/2)
                                ||(testX==x+xSpacing/2 && testY==y-ySpacing/4)
                                ||(testX==x+xSpacing/2 && testY==y+ySpacing/4)
                                ||(testX==x && testY==y+ySpacing/2)
                                ||(testX==x-xSpacing/2 && testY==y+ySpacing/4)
                                ||(testX==x-xSpacing/2 && testY==y-ySpacing/4)
                            );
                    });

                    return neighbors;
                }

                function generateLocationOrigins(terrain){

                    var o = terrain.getOrigin();

                    // location type
                    // edge or vertex
                    var potentialOrigins = [
                        {x:o.x, y:o.y-ySpacing},
                        {x:o.x+xSpacing/2, y:o.y-ySpacing*3/4},
                        {x:o.x+xSpacing, y:o.y-ySpacing/2},
                        {x:o.x+xSpacing, y:o.y},
                        {x:o.x+xSpacing, y:o.y+ySpacing/2},
                        {x:o.x+xSpacing/2, y:o.y+ySpacing*3/4},

                        {x:o.x, y:o.y+ySpacing},
                        {x:o.x-xSpacing/2, y:o.y+ySpacing*3/4},
                        {x:o.x-xSpacing, y:o.y+ySpacing/2},

                        {x:o.x-xSpacing, y:o.y},
                        {x:o.x-xSpacing, y:o.y-ySpacing/2},
                        {x:o.x-xSpacing/2, y:o.y-ySpacing*3/4}
                    ];

                    potentialOrigins.forEach(function(origin, index) {

                        /*
                         console.log('location '+index);
                         console.log('-----');
                         console.log('x: '+origin.x+' y:'+origin.y);
                         */
                        var locationAtOrigin  = _.where(self.locationOrigins,origin)[0];


                        if (locationAtOrigin) {
                            //console.log('existing location');

                            terrain.addLocation(locationAtOrigin.model);
                            locationAtOrigin.model.addOwner(terrain);

                        } else {
                            //console.log('new location');

                            var locationType = (index%2==0) ? "vertex" : "edge";
                            var locationId = self.locations.length;

                            var entity = ig.game.spawnEntity(EntityLocation, origin.x, origin.y);
                            // new Piece location model
                            var pieceLocation = new PieceLocation(origin.x,origin.y,locationType,locationId,entity);

                            self.locationOrigins.push({
                                x:origin.x,
                                y:origin.y,
                                model: pieceLocation
                            });

                            terrain.addLocation(pieceLocation);
                            pieceLocation.addOwner(terrain);

                            self.locations.push(pieceLocation);
                        }

                    });

                    //console.log(self.locationOrigins.length);

                }


            },

            setupTerrain: function(terrainMap) {
                var self = this;

                var origin = {x:offsets.boardCenter.x+3*xSpacing,y:offsets.boardCenter.y+xSpacing};

                rows.forEach(function(rowLength,rowIndex){
                    self.origins = self.origins.concat(generateTerrainOrigins(origin,rowLength));

                    // shift origin for next row
                    var newX,newY=origin.y+ySpacing*1.5;

                    if (rowIndex<2) {
                        newX = origin.x-xSpacing;
                    } else {
                        newX = origin.x+xSpacing;
                    }

                    origin = {x:newX,y:newY};
                });

                _.each(terrainMap,this.spawnTerrain.bind(this));


                function generateTerrainOrigins(rowOrigin,rowLength){

                    var origins = [];

                    for (var i=0;i<rowLength;i++) {
                        origins.push({x:rowOrigin.x+i*xSpacing*2,y:rowOrigin.y});
                    }

                    return origins;
                }

            },

            spawnTerrain: function (count,type) {
                var self = this;

                for (var i=0;i<count;i++) {

                    var terrainClass;

                    switch(type) {
                        case "desert":
                            terrainClass = EntityTerrainDesert;
                            break;
                        case "hills":
                            terrainClass = EntityTerrainHills;
                            break;
                        case "mountains":
                            terrainClass = EntityTerrainMountains;
                            break;
                        case "fields":
                            terrainClass = EntityTerrainFields;
                            break;
                        case "pasture":
                            terrainClass = EntityTerrainPasture;
                            break;
                        case "forest":
                            terrainClass = EntityTerrainForest;
                            break;
                    }


                    var entity = ig.game.spawnEntity(terrainClass, defaultOrigin.x, defaultOrigin.y);

                    // new Terrain model
                    var terrain = new Terrain(i,type,entity);

                    // cache desert tile for other setup
                    if (type=="desert") {
                        self.desert = terrain;
                        console.log('desert tile!');
                        console.log(terrain);
                    }

                    self.terrain.push(terrain);
                }
            },

            placeTerrain: function(origins) {
                var self = this;

                // var terrain = ig.game.getEntitiesByType(EntityTerrain);
                //terrain = Utils.shuffle(terrain);

                self.terrain = _.shuffle(self.terrain);

                origins.forEach(function(origin,originIndex){

                    var terrain = self.terrain[originIndex];

                    //console.log(origin);
                    //console.log(terrain);

                    if (terrain.type=="desert") {
                        console.log('desert tile!');

                    }

                    terrain.setOrigin(origin.x,origin.y,originIndex);
                    //console.log(terrain.getOrigin());

                    // place terrain at origin
                    terrain.entity.pos.x = origin.x;
                    terrain.entity.pos.y = origin.y;
                    // TODO animate terrain with predetermined type to origin
                });
            }
        });


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
//ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

    });
