ig.module('game.classes.terrain')
.requires(
    'game.classes.resourceCard'
)
.defines(function() {

Terrain = function(id,type,entity){

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
            
            addPiece: function(piece){
                _pieces.push(piece);   
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

                // add piece ownership to all terrain sharing that location
                // every vertex should have 3 owners
                // every edge should have 2 owners
               
                //console.log("location owners:");
                //console.log(location.getOwners());

                var sharedTerrain = location.getOwners();

                _.each(sharedTerrain,function(terrain){
                    terrain.addPiece(piece);
                });
            },

            generateResources: function() {
                var self = this;

                if (this.type == "desert") {
                    return false;
                }

                var pieces = this.getPieces();
                console.log(pieces);

                var resourceTotal = 0;
                var resourceType = null;
                var payouts = [];

                // determine quantity & recipients from bulidings on terrain
                _.each(pieces, function(piece) {
                    console.log(piece.type);

                    var resourceCount ;

                    if (piece.type=="road") {
                        resourceCount = 0;
                    } else if (piece.type=="settlement") {
                        resourceCount = 1;
                    } else if (piece.type=="city") {
                        resourceCount = 2;
                    }

                    resourceTotal+=resourceCount;

                    if (resourceCount>0) {
                        payouts.push({player:piece.getOwner(),count:resourceCount});
                    }
                });

                console.log("total resources generated:");
                console.log(resourceTotal);
                console.log("resource recipients:");
                console.log(payouts);
                // spawn resource cards

                var location = this.getOrigin();
                var pieceId = 0;
                var entity = ig.game.spawnEntity(EntityResourceCard, location.x, location.y);
                var resourceType = cardConversions[self.type];

                var resourceCard = new ResourceCard(pieceId,entity,resourceType);

                resourceCard.reveal();

                console.log(resourceCard);
                //var settlement = new Piece("settlement",pieceId,entity);

                // move cards to recipients
                _.each(payouts,function(payout){
                    payout.player.addInventory(resourceType,resourceCard);

                    console.log("player inventory:");
                    console.log(payout.player.getInventory());
                });


            },

            placeRobber: function(terrain) {


            }
        
      };
    };

});