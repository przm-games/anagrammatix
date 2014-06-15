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


    var Terrain = function(id,type){

    	var _id=id;
    	var _type=type;
    	var _locations=[];
    	var _origin = null;

    	return {
    		id: _id,
    		type: _type,
    		setOrigin: function(x,y){
    			_origin = {x:x,y:y};
    		},
    		getOrigin: function(){
    			return _origin;
    		},
    		addLocation:function(location){
    			//if location is unique
    			//if locations.length<12
    			_locations.push(location);
    		},
    		getLocations: function(){
    			return _locations;
    		}
    		
    	};
    };

    var Piece = function(){
    	return {};
    }

	var PieceLocation = function(x,y,type,id) {

		var _id = id;
		var _owners = []; //Terrain
		var _type = type;
		var _position = {x:x,y:y};
		var _neighbors = []; //PieceLocation
		var _pieces = []; //Piece

    	return {
    		id: _id,
    		type: _type,
    		position: _position,
    		addOwner: function(owner){
    			//if owner unique 
    			//if owners.length <3
    			_owners.push(owner);
    		},
    		getOwners: function(){
    			return _owners;
    		},
    		addNeighbor: function(neighbor){
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
	
	init: function() {
		// Initialize your game here; bind keys etc.

		
	},

	render: function() {
		this.setupTerrain();
		

		this.placeTerrain(this.origins);

        this.placeResourceCounters();

		this.setupLocations(this.origins);

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

    placeResourceCounters: function() {
        //4 player
        var tokenOrder = [5,2,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];
        //5-6 player
        //var tokenOrder = [2,5,4,6,3,9,8,11,11,10,6,3,8,4,8,10,11,12,10,5,4,9,5,9,12,3,2,6];

        for (var i=0;i<tokenOrder.length;i++) {
            ig.game.spawnEntity(EntityResourceCounter, 100+40*i, 200, {number:tokenOrder[i]});
        }
        

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

		//ig.game.spawnEntity(EntityLocation, defaultOrigin.x, defaultOrigin.y);

		var self = this;

        var origin = {x:boardCenterOffsetX+2*xSpacing,y:boardCenterOffsetY};

        console.log('terrain models:');
        console.log(self.terrain);

        self.terrain.forEach(function(terrain, index){

        	//if (index>1) return;

        	// console.log('terrain '+index);
        	// console.log('-----------');

            generateLocationOrigins(terrain);

			console.log(terrain.getLocations());        
        });

        console.log(self.locations);


        _.each(self.locations,function(location){
        	var potentialNeighbors = findNeighbors(location);
        	var currentNeighbors = location.getNeighbors();

        	if (currentNeighbors<potentialNeighbors) {
        		var newNeighbors = _.difference(potentialNeighbors,currentNeighbors);
        		//console.log(newNeighbors.length);
        		_.each(newNeighbors,function(newNeighbor){
        			location.addNeighbor(newNeighbor);
        			newNeighbor.addNeighbor(location);
        		});
        	}
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

            		// new Piece location model
            		var pieceLocation = new PieceLocation(origin.x,origin.y,locationType,locationId);

            		self.locationOrigins.push({
            			x:origin.x,
            			y:origin.y,
            			model: pieceLocation 
            		});

            		

            		terrain.addLocation(pieceLocation);
            		pieceLocation.addOwner(terrain);

            		self.locations.push(pieceLocation);

            		// OVERRIDE
            		ig.game.spawnEntity(EntityLocation, origin.x, origin.y);


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
                

                ig.game.spawnEntity(terrainClass, defaultOrigin.x, defaultOrigin.y);

                // new Terrain model
                var terrain = new Terrain(i,type);
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

    	var terrain = ig.game.getEntitiesByType(EntityTerrain);
            terrain = Utils.shuffle(terrain);
            //var terrain = ig.game.getEntitiesBy(EntityTerrain);

            origins.forEach(function(origin,originIndex){

            	self.terrain[originIndex].setOrigin(origin.x,origin.y);
            	console.log(self.terrain[originIndex].getOrigin());

                // place terrain at origin
                terrain[originIndex].pos.x = origin.x;
                terrain[originIndex].pos.y = origin.y;
                // TODO animate terrain with predetermined type to origin
            });
    }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
//ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
