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

            locations: [],
            terrain: [],
            numberTokens: [],
            ports: [],

            decks: {
                discard: []
            },

            badges: {},

            bank: {},

            desert: null,
            robber: null,

            players: [],

            leaders: {}, //for largest army and longest road

            init: function() {
                // Initialize your game here; bind keys etc.


            },

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

            loadGame: function( gameState ) {

            },

            //parse command object from websocket into game action(s)
            parseCommand: function( data ){

            },

            correctEntityLayers: function(){

            },

            render: function() {

                var self = this;

                //TODO if no gameState cache
                this.setupNewGame( gameState.players );

                //else
                //TODO load game from cache

                console.log(this.players);

                var player = this.players[1];

                //get location
                var terrain = this.terrain[5];

                var location = this.desert.getOrigin();
                var entity = ig.game.spawnEntity(EntityRobber, location.x, location.y);
                var robber = new Robber(pieceId,entity);

                this.robber = robber;

                //player.moveRobber(this.robber,this.terrain[5]);

                //player.buildSettlement(terrain.getVertex(0));
                //player.buildRoad(terrain.getEdge(0));

                var boardState = {
                    pieces: [
                        {
                            type: 'road',
                            owner: 0,
                            location: this.terrain[5].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 0,
                            location: this.terrain[5].getVertex(0)
                        },
                        {
                            type: 'road',
                            owner: 1,
                            location: this.terrain[10].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 1,
                            location: this.terrain[10].getVertex(0)
                        },
                        {
                            type: 'road',
                            owner: 2,
                            location: this.terrain[12].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 2,
                            location: this.terrain[12].getVertex(0)
                        },
                        {
                            type: 'road',
                            owner: 3,
                            location: this.terrain[17].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 3,
                            location: this.terrain[17].getVertex(0)
                        }
                    ]
                };

                _.each(boardState.pieces,function(piece){

                    var player = self.players[piece.owner];

                    switch(piece.type){
                        case 'road':
                            player.buildRoad(piece.location);
                            break;
                        case 'settlement':
                            player.buildSettlement(piece.location);
                            break;
                    }


                });


                //player.buildCity(player.getPieces("settlement")[0]);

                //player.buildRoad(terrain.getEdge(1));
//        player.buildSettlement(terrain.getVertex(2));
//        player.buildCity(player.getPieces("settlement")[0]);

                //TODO
                // player rolls dice

//        this.produceResources(8);
//        this.produceResources(4);
//        this.produceResources(6);
//        this.produceResources(3);

                //seed player inventory
                _.each(this.players,function(player){

                    var payouts = [
                        { player: player, count:3, type:'brick', origin:player.getLocation('origin') },
                        { player: player, count:3, type:'ore', origin:player.getLocation('origin') },
                        { player: player, count:3, type:'wheat', origin:player.getLocation('origin') },
                        { player: player, count:3, type:'sheep', origin:player.getLocation('origin') },
                        { player: player, count:3, type:'wood', origin:player.getLocation('origin') }
                    ];

                    self.dealResourceCards(payouts);

                });



                //test road building
//        var locations = player.getEligibleBuildingLocations('road');
//        console.log('getEligibleBuildingLocations for road');
//        console.log(locations);
//
//        _.each(locations,function(location){
//           player.buildRoad(location);
//        });

                console.log(player.getPieces('road').length);

                //test settlement building
                //var location = terrain.getVertex(0);
                locations = player.getEligibleBuildingLocations('settlement');
                console.log('getEligibleBuildingLocations for settlement');
                console.log(locations.length);
                console.log(locations);

                _.each(locations,function(location){
                    player.buildSettlement(location);
                });

                console.log(player.getPieces('settlement').length);

                var points = player.countVictoryPoints();
                console.log('points:');
                console.log(points);



                //test degrees of separation
//        var locations = location.getNeighborsAtDistance(4);
//        console.log(locations.length);
//        _.each(locations,function(location){
//           player.buildSettlement(location);
//        });


                //test development cards
                //this.dealDevelopmentCards(1,player);

//                var payouts = [
//                    {player:player,count:1,subClass:"knight",location:"hand"},
//                    {player:player,count:1,subClass:"plenty",location:"hand"},
//                    {player:player,count:1,subClass:"monopoly",location:"hand"}
//                ];
//
//                this.setDevelopmentCards(payouts);

//        console.log('check player cards');
//        var resourceCards = player.getCards('hand','resource');
//        var developmentCards = player.getCards('hand','development');
//        console.log(resourceCards);
//        console.log(developmentCards);

                // test knight activation
//                var cards = player.getCards('hand','development','knight');
//                console.log(cards);
//                player.activateKnight(cards[0],this.robber,this.terrain[1]);


                //test badges
                player.addBadge('largestArmy',self.badges['largestArmy']);
                player.addBadge('longestRoad',self.badges['longestRoad']);


                //test year of plenty activation
//                var cards = player.getCards('hand','development','plenty');
//                console.log(cards);
//                player.activateYearOfPlenty(cards[0], ['wood','wheat'], self.dealResourceCards.bind(self) ) ;


                // test monopoly activation
//                var cards = player.getCards('hand','development','monopoly');
//                console.log(cards);
//                player.activateMonopoly(cards[0], 'wheat', this.players);


                //test trading
//                var exchanges = [
//                    {player:this.players[0],type:'wheat',quantity:2},
//                    {player:this.players[1],type:'wood',quantity:2}
//                ]
//
//                this.makeTrade(exchanges);

//        var report = player.getAffordableActions();
//
//        console.log("eligible purchases:");
//        console.log(report);
//
//        if (player.purchase(catalog.road)) {
//            //player.buildRoad();
//        };

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

            checkForLargestArmy: function(){
                //TODO must run after every knight activation!!!
                console.log('checkForLargestArmy');

                var self = this;
                var leader = null;
                var bestCount = this.leaders['largestArmy'] ? this.leaders['largestArmy'].countKnights() : 2;

                _.each(this.players,function(player){
                   var count = player.countKnights();
                    if (count>bestCount) {
                       leader = player;
                    }
                });

                if (self.leaders['largestArmy'] !== leader){ //new leader

                    if (this.leaders['largestArmy']){ //previous leader
                        this.leaders['largestArmy'].removeBadge('largestArmy')
                    }

                    leader.addBadge('largestArmy',self.badges('largestArmy'));
                    self.leaders['largestArmy'] = leader;
                }
            },

            checkForLongestRoad: function(){

                //find all open edges

                //construct tree

                //remove duplicate paths
                //if difference.length = 0

                //measure paths


                //compare paths

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

            setupNewGame: function( playerConfig ) {

                this.setupTerrain();
                this.placeTerrain(this.origins);

                this.setupNumberTokens();
                this.placeNumberTokens(this.origins);

                this.setupLocations(this.origins);

                this.setupPorts();
                this.placePorts();

                this.setupPlayers(gameState.players);

                this.setupDecks(DECKS);
                this.setupBadges(BADGES);
            },

            setupDecks: function(decks) {
                var self = this;

                _.each( decks, function( deckConfig ){
                    var cardList = deckConfig.cards;
                    var cardTypes = library[deckConfig.type];

                    var deck = new Deck( cardList, cardTypes, self.classMap, self.entityMap, self.actionMap, deckConfig.type );
                    deck.setOrigin(deckConfig.origin.x, deckConfig.origin.y);
                    deck.populate();

                    deck.shuffle(3);

                    self.decks[deckConfig.name] = deck;
                });

            },

            setupPlayers: function(playerConfig) {
                var self = this;

                console.log(playerConfig.length);
                //establish player positions on/around board

                //1 position at each of 4 corners
                var cornerOffset = offsets.playerCorner;
                var positions = [];
                var orientations = [];

                if (playerConfig.length<=4) {
                    //starting top right, placing clockwise
                    positions = [
                        {x:cornerOffset.x,y:cornerOffset.y},
                        {x:zones.board.w-cornerOffset.y,y:cornerOffset.x},
                        {x:zones.board.w-cornerOffset.x,y:zones.board.w-cornerOffset.y},
                        {x:cornerOffset.y,y:zones.board.w-cornerOffset.x}
                    ];

                    orientations = [
                        0, Math.PI*3/2, Math.PI, Math.PI/2
                    ];


                } else if (playerConfig.length>4) {
                    //TODO
                    //5-6 players
                }


                _.each(playerConfig,function(playerData,n){

                    var player = new Player(n);
                    var position = positions[n];

                    var entity = ig.game.spawnEntity(PlayerMarker, position.x, position.y);
                    entity.setIdentifier(playerData.color);

                    //TODO
                    // set player info: name

                    //player.setLimits(limits);
                    player.setLocation('origin',position.x,position.y);
                    player.setEntity('base',entity);
                    player.setOrientation(orientations[n]);
                    player.setColor(playerData.color);
                    player.setName(playerData.name);

                    player.generateCardPositions(40, 'hand', ZONES.hand );
                    player.showCardPositions('hand');

                    player.generateCardPositions(10, 'field',ZONES.field );
                    player.showCardPositions('field');

                    player.generateCardPositions(2, 'badges',ZONES.badges );
                    player.showCardPositions('badges');

                    self.players.push(player);

                    //TODO
                    //setup pieces


                    //TODO
                    //setup inventory
                });


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

                //console.log(payouts);
                //alert('payouts on '+dieValue);

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

            setupPorts: function() {
                var self = this;

                spawnPort('brick');
                spawnPort('sheep');
                spawnPort('ore');
                spawnPort('wheat');
                spawnPort('wood');
                spawnPort('any');
                spawnPort('any');
                spawnPort('any');
                spawnPort('any');

                function spawnPort(type) {
                    var entity = ig.game.spawnEntity(EntityPort, defaultOrigin.x, defaultOrigin.y);
                    var pieceId = 0;
                    var port = new Piece("port",pieceId,entity);
                    port.entity.setResourceType(type);

                    self.ports.push(port);
                }
            },

            placePorts: function() {
                var self = this;

                //create ordered list of outer edges

                //4 player
                //i = terrainIndex, e = outer edges
                var allEdges = [
                    {i:0,e:[4,5,0]},
                    {i:1,e:[5,0]},
                    {i:2,e:[5,0,1]},
                    {i:6,e:[0,1]},
                    {i:11,e:[0,1,2]},
                    {i:15,e:[1,2]},
                    {i:18,e:[1,2,3]},
                    {i:17,e:[2,3]},
                    {i:16,e:[2,3,4]},
                    {i:12,e:[3,4]},
                    {i:7,e:[3,4,5]},
                    {i:3,e:[4,5]}
                ];

                var outerEdges = [];

                _.each(allEdges,function(edgeList){
                    var terrain = self.terrain[edgeList.i];

                    _.each(edgeList.e,function(edgeIndex){
                        outerEdges.push(terrain.getEdge(edgeIndex));
                    });
                });

                //console.log('outer edges:');
                //console.log(outerEdges);

                //9 ports
                //# of edges between ports
                //2,2,3,2,2,3,2,2,3
                var portEdgeIndex = [0,3,6,10,13,16,20,23,26];

                var portEdges = [];

                _.each(portEdgeIndex,function(edgeIndex){
                    portEdges.push(outerEdges[edgeIndex]);
                });

                //console.log('port edges:');
                //console.log(portEdges);

                //shuffle ports
                self.ports = _.shuffle(self.ports);

                _.each(portEdges,function(location,index){
                    location.show();

                    //rotate port entity to line up with edge
                    var egdePosition = location.getIndex();

                    console.log('location index:');
                    console.log(egdePosition);

                    var port = self.ports[index];

                    port.entity.pos.x = location.position.x;
                    port.entity.pos.y = location.position.y;
                    port.entity.alignToEdge(egdePosition);

                    var neighbors = location.getNeighbors();
                    _.each(neighbors,function(neighbor){
                        neighbor.show();
                    });
                });
            },

            setupNumberTokens: function() {
                //4 player
                var numberOrder = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];

                //5-6 player
                //var tokenOrder = [2,5,4,6,3,9,8,11,11,10,6,3,8,4,8,10,11,12,10,5,4,9,5,9,12,3,2,6];

                // generate numberToken entities
                for (var i=0;i<numberOrder.length;i++) {
                    var numberToken = ig.game.spawnEntity(EntityResourceCounter, 100+40*i, 200, {number:numberOrder[i]});
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

            update: function() {
                // Update all entities and backgroundMaps
                this.parent();

                // Add your own, additional update code here
            },

            draw: function() {
                // Draw all entities and backgroundMaps
                this.parent();


                // Add your own drawing code here
                var x = ig.system.width/2,
                    y = ig.system.height/2;

                this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
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


                self.terrain.forEach(function(terrain, index){
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

            setupTerrain: function() {
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


                generateTerrain();


                function generateTerrain() {

                    spawnTerrain("desert",1);
                    spawnTerrain("hills",3);
                    spawnTerrain("mountains",3);
                    spawnTerrain("fields",4);
                    spawnTerrain("pasture",4);
                    spawnTerrain("forest",4);
                }

                function spawnTerrain(type,count) {
                    for (var i=0;i<count;i++) {
                        //ig.log(type);

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
                }

                function generateTerrainOrigins(rowOrigin,rowLength){

                    var origins = [];

                    for (var i=0;i<rowLength;i++) {
                        origins.push({x:rowOrigin.x+i*xSpacing*2,y:rowOrigin.y});
                    }

                    return origins;
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
