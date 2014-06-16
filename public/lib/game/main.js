ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.atlas',
    'game.utils',

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


	var defaultOrigin = {x:0,y:0};
	var boardWidth = 1080;
	var xSpacing = Atlas.global.gridSpacing.x;
    var ySpacing = Atlas.global.gridSpacing.y;
    var boardCenterOffsetX = (1080-(10*xSpacing))/2, boardCenterOffsetY = (1080-(8*ySpacing))/2;
    var rows = [3, 4, 5, 4, 3];


    var Terrain = function(id,type,entity){

    	var _id=id;
    	var _type=type;
        var _entity = entity;

    	var _locations=[];
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

            buildSettlement: function(position) {

                //get vertex locations
                var location = _locations[position*2];

                var entity = ig.game.spawnEntity(EntitySettlement, location.position.x, location.position.y);
                var pieceId = 0;
                var settlement = new Piece("settlement",pieceId,entity);

                location.addPiece(settlement);
                settlement.setLocation(location);
            },

            buildRoad: function(position) {

                //get vertex locations
                var location = _locations[1+position*2];

                var entity = ig.game.spawnEntity(EntityRoad, location.position.x, location.position.y);
                var pieceId = 0;
                var road = new Piece("road",pieceId,entity);

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

                location.addPiece(road);
                road.setLocation(location);
            },

            moveRobber: function(location) {


            }
    		
    	};
    };

    var Piece = function(type,id,entity){
    	
        var _id = id;
        var _type = type;
        var _entity = entity;

        var _location = null; //PieceLocation

        return {
            entity: _entity,

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

            setIndex: function(index) {
                _index = index;
            },
            getIndex: function(index) {
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
	
	init: function() {
		// Initialize your game here; bind keys etc.

		
	},

	render: function() {
		this.setupTerrain();

		this.placeTerrain(this.origins);

        this.setupNumberTokens();

        this.placeNumberTokens(this.origins);

		this.setupLocations(this.origins);

        this.setupPorts();
        this.placePorts();

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

        self.terrain[5].showLocations([0,2,4,6,8,10]);
        self.terrain[5].buildSettlement(0);
        self.terrain[5].buildRoad(0);
        self.terrain[5].buildRoad(1);
        self.terrain[5].buildRoad(2);


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
