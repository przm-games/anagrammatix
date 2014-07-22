ig.module('game.classes.piece')
.requires()
.defines(function() {
    Piece = function(type,id,entity){
      
        var _id = id;
        var _type = type;
        var _entity = entity;

        var _position = null;
        var _location = null; //PieceLocation
        var _owner = null;
        var _proximals = [];

        //a proximal has an object and a relationship descriptor
        //object: Terrain
        //description: position

        // TODO 
        // distinguish by owner

        return {
            type: _type,
            entity: _entity,

            setPosiiton: function( position ){
                _position = position;
            },
            getPosition: function(){
                return _position;
            },
            
            setOwner: function(owner) {
                _owner = owner;
                _entity.setIdentifier(owner.getColor());
            },
            getOwner: function() {
                return _owner;
            },

            getProximals: function(){
                return _proximals;
            },
            setProximals: function( proximals ) {
                //all touching terrain
                //pass through from location
                _proximals = proximals;
            },
//            setTerrain: function( terrain ) {
//                _terrain = terrain;
//            },
//            getTerrain: function() {
//                return _terrain;
//            },

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