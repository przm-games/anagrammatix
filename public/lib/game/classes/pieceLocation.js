ig.module('game.classes.pieceLocation')
.requires()
.defines(function() {
    PieceLocation = function(x,y,type,id,entity) {
        var self = this;

        var _id = id;
        var _owners = []; //Terrain
        var _type = type;
        var _position = {x:x,y:y};
        var _neighbors = []; //PieceLocation
        var _pieces = []; //Piece
        var _entity = entity;
        var _index = null;

        var _orientation = 0;

        var _links = {};

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

            getPieces: function(){
                return _pieces;
            },
            addPiece: function(piece){
                _pieces.push(piece);
                //piece.setLocation(self);
            },
            removePiece: function(piece){
                _pieces = _.without(_pieces,piece);
            },
            placePiece: function( piece ) {

                switch( piece.type ) {

                    case "road":
                        piece.entity.rotateToAngle(_orientation);
                        break;

                    case "settlement":
                    case "city":
                        break;
                }


                this.addPiece(piece);
                piece.setLocation(this);

                // add piece ownership to all terrain sharing that location
                // every vertex should have 3 owners
                // every edge should have 2 owners
                var sharedTerrain = this.getOwners();
                _.each(sharedTerrain,function(terrain){
                    terrain.addPiece(piece);
                });
            },

            setOrientation: function( orientation ){
                _orientation = orientation;
            },
            getOrientation: function(){
                return _orientation;
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

            addLink: function(key,object){
                _links[key] = object;
            },
            getLink: function(key){
                return _links[key] || null;
            },

            addNeighbor: function(neighbor){
                //TODO
                //if neighbots.length<=3
                //if neightbor unique
                _neighbors.push(neighbor);
            },
            getNeighbors: function(){
                return _neighbors;
            },

            getNeighborsAtDistance: function( degree ){ //degree of separation
                //console.log('getNeighborsAtDistance');
                var cache = [];
                var targets = [this];
                var counter = 0;

                do {
                    cache = _.union(cache,targets);
                    targets = this.walkNeighbors(targets,cache);
                    counter++;
                } while(counter<degree);

                return _.difference(targets,cache);;
            },

            walkNeighbors: function( neighbors, history ){
                //console.log('walkNeighbors');
                var cache = [];
                _.each(neighbors,function(neighbor){
                    cache = cache.concat(neighbor.getNeighbors());
                });
                //console.log(cache);

                return _.difference( _.uniq(cache), history );
            },

        };
    };
});