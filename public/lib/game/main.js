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

    'game.entities.terrainDesert',
    'game.entities.terrainFields',
    'game.entities.terrainForest',
    'game.entities.terrainHills',
    'game.entities.terrainMountains',
    'game.entities.terrainPasture'
    //'impact.debug.debug',
)
.defines(function(){

    var catalog = [
        { 
            name: "road",
            cost: [ 
                { type: "wood", quantity: 1 },
                { type: "brick", quantity: 1 }
            ],
            name: "settlement",
            cost: [
                { type: "wood", quantity: 1 },
                { type: "brick", quantity: 1 },
                { type: "wheat", quantity: 1 },
                { type: "sheep", quantity: 1 }
            ],
            name: "city",
            cost: [
                { type: "wheat", quantity: 2 },
                { type: "ore", quantity: 3 }
            ],
            name: "developmentCard",
            cost: [
                { type: "wheat", quantity: 1 },
                { type: "ore", quantity: 1 },
                { type: "sheep", quantity: 1 }
            ]
        }   
    ]; 

    var cardTypes = [
        {
            title: "Knight",
            animation: "knight",
            description: "Move the robber. Steal 1 resource from an owner of adjacent settlement or city."
        },
        {
            title: "Road Building",
            animation: "road",
            description: "Place two roads as if you had built them."
        },
        {
            title: "Year of Plenty",
            animation: "plenty",
            description: "Take any 2 resources of your choice from the bank. Keep them or use the immediately."
        },
        {
            title: "Monopoly",
            animation: "monopoly",
            description: "Announce 1 resource type. All players must give you all of their resources of that type."
        },
        {
            title: "Chapel",
            animation: "chapel",
            description: "1 Victory Point!"
        },
        {
            title: "Palace",
            animation: "palace",
            description: "1 Victory Point!"
        },
        {
            title: "Market",
            animation: "market",
            description: "1 Victory Point!"
        },
        {
            title: "Library",
            animation: "library",
            description: "1 Victory Point!"
        }
    ];


	var defaultOrigin = {x:0,y:0};
	var boardWidth = 1080;
	var xSpacing = Atlas.global.gridSpacing.x;
    var ySpacing = Atlas.global.gridSpacing.y;
    var boardCenterOffsetX = (boardWidth-(10*xSpacing))/2, boardCenterOffsetY = (boardWidth-(8*ySpacing))/2;
    var rows = [3, 4, 5, 4, 3];


    var Terrain = function(id,type,entity){

    	var _id=id;
    	var _type=type;
        var _entity = entity;

    	var _locations=[];
        var _pieces=[];
    	var _origin = null;


    	return {
    		id: _id,
    		type: _type,
            entity: _entity,

    		setOrigin: function(x,y,index){
    			_origin = {x:x,y:y,index:index};
    		},
    		getOrigin: function(){
    			return _origin;
    		},
    		addLocation:function(location){
    			//if location is unique
    			//if locations.length<12
    			location.setIndex(_locations.length);
                _locations.push(location);

    		},
    		getLocations: function(){
    			return _locations;
    		},
            getPieces: function(){
                return _pieces;
            },

            hideLocations: function() {
                _.each(_locations,function(location){
                    //location.entity.zIndex=-1;
                    //console.log(location.entity);
                    location.hide();
                });
                //ig.game.sortEntitiesDeferred();
            },

            showLocations: function(locations) {
                _.each(locations,function(locationIndex){
                    _locations[locationIndex].show();
                });
            },

            getEdge: function(position) {
                return _locations[1+position*2];
            },

            placePiece: function( piece, position ) {

                var location;

                switch( piece.type ) {

                    case "road":
                        location = _locations[1+position*2];
                        var angle;
                        switch (position) {
                            case 0:
                            case 3:
                                angle = Math.PI*2/3;
                            break;
                            case 1:
                            case 4:
                                angle = 0;
                            break;
                            case 2:
                            case 5:
                                angle = Math.PI*1/3;
                            break;
                        }

                        piece.entity.rotateToAngle(angle);
                    break;

                    case "settlement":
                    case "city":
                        location = _locations[position*2];
                    break;
                }


                location.addPiece(piece);
                piece.setLocation(location);

            },
/*
            buildSettlement: function(position,owner) {

                //get vertex locations
                var location = _locations[position*2];

                var entity = ig.game.spawnEntity(EntitySettlement, location.position.x, location.position.y);
                var pieceId = 0;
                var settlement = new Piece("settlement",pieceId,entity);

                settlement.setOwner(owner);

                _pieces.push(settlement);

                location.addPiece(settlement);
                settlement.setLocation(location);
            },

            buildRoad: function(position,owner) {

                //get vertex locations
                var location = _locations[1+position*2];

                var entity = ig.game.spawnEntity(EntityRoad, location.position.x, location.position.y);
                var pieceId = 0;
                var road = new Piece("road",pieceId,entity);

                road.setOwner(owner);

                var angle;
                switch (position) {
                    case 0:
                    case 3:
                        angle = Math.PI*2/3;
                    break;
                    case 1:
                    case 4:
                        angle = 0;
                    break;
                    case 2:
                    case 5:
                        angle = Math.PI*1/3;
                    break;
                }

                road.entity.rotateToAngle(angle);

                _pieces.push(road);

                location.addPiece(road);
                road.setLocation(location);
            },
*/
            placeRobber: function(location) {


            }
    		
    	};
    };

    var Piece = function(type,id,entity){
    	
        var _id = id;
        var _type = type;
        var _entity = entity;

        var _location = null; //PieceLocation
        var _owner = null;

        // TODO 
        // distinguish by owner

        return {
            type: _type,
            entity: _entity,
            
            setOwner: function(owner) {
                _owner = owner;
                _entity.setIdentifier(owner.getColor());
            },
            getOwner: function() {
                return _owner;
            },


            setLocation: function(location) {
                console.log(location);
                _location = location;

                _entity.pos.x = _location.position.x;
                _entity.pos.y = _location.position.y;
            },
            getLocation: function(location) {
                return _location;
            }
        };
    }

	var PieceLocation = function(x,y,type,id,entity) {
        var self = this;

		var _id = id;
		var _owners = []; //Terrain
		var _type = type;
		var _position = {x:x,y:y};
		var _neighbors = []; //PieceLocation
		var _pieces = []; //Piece
        var _entity = entity;
        var _index = null;

    	return {
    		id: _id,
    		type: _type,
    		position: _position,
            entity: _entity,

            hide: function() {

                entity.pos.x = -1;
                entity.pos.y = -1;
            },
            show: function() {

                entity.pos.x = _position.x;
                entity.pos.y = _position.y;

            },

            addPiece: function(piece){
                _pieces.push(piece);
                //piece.setLocation(self);
            },
            removePiece: function(piece){
                //TODO
                //remove piece
            },

            setIndex: function(index){
                _index = index;
            },
            getIndex: function(index){
                return _index;
            },

    		addOwner: function(owner){
                //TODO
    			//if owner unique 
    			//if owners.length <3
    			_owners.push(owner);
    		},
    		getOwners: function(){
    			return _owners;
    		},

    		addNeighbor: function(neighbor){
                //TODO
    			//if neighbots.length<=3
    			//if neightbor unique
    			_neighbors.push(neighbor);
    		},
    		getNeighbors: function(){
    			return _neighbors;
    		}

    	};
    };

    var Player = function(id) {

        var _id = id;
        var _color = null;
        var _name = null;
        var _hand = [];
        var _pieces = [];
        var _locations = {};
        var _inventory = {};

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
            },
            getInventory: function() {

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

            addPiece: function(piece){
                _pieces.push(piece);
            },
            removePiece: function(piece){

            },
            getPieces: function(){
                return _pieces;
            },

            buildRoad: function( terrrain, position ) {

                var location = _locations.origin;

                var entity = ig.game.spawnEntity(EntityRoad, location.x, location..y);
                var pieceId = 0;
                var road = new Piece("road",pieceId,entity);

                road.setOwner(owner);
                this.addPiece(road);

                terrain.placePiece(road,position);
            },
            buildSettlement: function( terrrain, position ) {

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

                //check player inventory against catalog

            },
            purchase: function( item ){
                

            }
        };

    };

    var DevelopmentCard = _.extend(Piece, {
        cardType: null,
        reveal: function() {

        },
        activate: function(){

        }
    });

    var playerConfig = [
        { name:'Mike', color:'red'},
        { name:'dogoodjonathan', color:'blue'},
        { name:'jimmy chen', color:'white'},
        { name:'Kailing Chan To', color:'green' }
    ];


MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	origins: [],
	locationOrigins: [],

	locations: [],
	terrain: [],
    numberTokens: [],
    ports: [],

    desert: null,

    players: [],
	
	init: function() {
		// Initialize your game here; bind keys etc.

		
	},

    setupPlayers: function(playerConfig) {
        var self = this;

        console.log(playerConfig);
        //establish player positions on/around board

        //1 position at each of 4 corners
        var cornerOffset = 100;
        var positions = [];

        if (playerConfig.count<=4) {
            positions.push({x:cornerOffset,y:cornerOffset});
            positions.push({x:cornerOffset,y:boardWidth-cornerOffset});
            positions.push({x:boardWidth-cornerOffset,y:boardWidth-cornerOffset});
            positions.push({x:boardWidth-cornerOffset,y:cornerOffset});
        }
        

        _.each(playerConfig,function(player,n){

            if (n<playerConfig.count) {

                var player = new Player(n);
                var positions = position[n];

                var entity = ig.game.spawnEntity(PlayerMarker, position.x, position.y);
                entity.setIdentifier(self.players[n].color);
            }            
        });
        

    },

    generateResources: function(terrainIndex) {
        var self = this;

        var pieces = self.terrain[terrainIndex].getPieces();
        console.log(pieces);

        var resourceTotal = 0;
        var resourceType = null;
        var recipients = [];

        // determine quantity & recipients from bulidings on terrain
        _.each(pieces, function(piece) {
            console.log(piece.type);

            var resourceCount = 0;

            if (piece.type=="road") {
                continue;
            } else if (piece.type=="settlement") {
                resourceCount = 1;
            } else if (piece.type=="city") {
                resourceCount = 2;
            }

            recipients.push({player:piece.owner,count:resourceCount});
        });

        // spawn resource cards

        // move cards to recipients

    },

	render: function() {
		this.setupTerrain();

		this.placeTerrain(this.origins);

        this.setupNumberTokens();

        this.placeNumberTokens(this.origins);

		this.setupLocations(this.origins);

        this.setupPorts();
        this.placePorts();


        this.setupPlayers(playerConfig);

        this.generateResources(5);


        // self.terrain[5].showLocations([0,2,4,6,8,10]);
        // self.terrain[5].buildSettlement(0);
        // self.terrain[5].buildRoad(0);
        // self.terrain[5].buildRoad(1);
        // self.terrain[5].buildRoad(2);


        // OVERRIDE
        // test all other entities
        // ig.game.spawnEntity(EntityPort, 200, 200);
        // ig.game.spawnEntity(EntityRoad, 200, 200);
        // ig.game.spawnEntity(EntityCity, 200, 200);
        // ig.game.spawnEntity(EntitySettlement, 200, 200);
        // ig.game.spawnEntity(EntityRobber, 200, 200);
        // ig.game.spawnEntity(EntityLocation, 200, 200);
        // ig.game.spawnEntity(EntityResourceCounter, 200, 200);
        // ig.game.spawnEntity(EntityResourceCard, 200, 200);
        // ig.game.spawnEntity(EntityDevelopmentCard, 200, 200);

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

        console.log('outer edges:');
        console.log(outerEdges);

        //9 ports
        //# of edges between ports
        //2,2,3,2,2,3,2,2,3
        var portEdgeIndex = [0,3,6,10,13,16,20,23,26];

        var portEdges = [];

        _.each(portEdgeIndex,function(edgeIndex){
            portEdges.push(outerEdges[edgeIndex]);
        });

        console.log('port edges:');
        console.log(portEdges);

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

        console.log('desert tile at:');
        console.log(this.desert.getOrigin());

        
        placementOrder.forEach(function(terrainIndex,orderIndex){

            var targetOrigin = origins[terrainIndex];
            var numberToken = numberTokens[orderIndex];


            // place terrain at origin
            numberToken.pos.x = targetOrigin.x;
            numberToken.pos.y = targetOrigin.y;
            // TODO animate terrain with predetermined type to origin
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

        var origin = {x:boardCenterOffsetX+2*xSpacing,y:boardCenterOffsetY};


        self.terrain.forEach(function(terrain, index){
            generateLocationOrigins(terrain);       
        });


        _.each(self.locations,function(location){
        	var potentialNeighbors = findNeighbors(location);
        	var currentNeighbors = location.getNeighbors();

            console.log('location.entity.zIndex: '+location.entity.zIndex);

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

            //location type
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
            		
            		var locationType = (index%2==0) ? "edge" : "vertex";
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
            
            console.log(self.locationOrigins.length);

        }


	},

    setupTerrain: function() {
    	var self = this;

        var origin = {x:boardCenterOffsetX+3*xSpacing,y:boardCenterOffsetY+xSpacing};

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

                console.log(origin);
                console.log(terrain);

                if (terrain.type=="desert") {
                    console.log('desert tile!');
                    
                }

            	terrain.setOrigin(origin.x,origin.y,originIndex);
            	console.log(terrain.getOrigin());

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
