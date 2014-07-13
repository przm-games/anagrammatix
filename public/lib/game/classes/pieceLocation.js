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
});