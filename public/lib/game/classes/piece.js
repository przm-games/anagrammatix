ig.module('game.classes.piece')
.requires()
.defines(function() {
    Piece = function(type,id,entity){
      
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
});