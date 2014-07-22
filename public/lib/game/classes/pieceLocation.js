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

                //console.log("location owners:");
                //console.log(location.getOwners());

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
});