ig.module('game.classes.card')
.requires('game.classes.piece')
.defines(function() {
    
    Card = function(id,entity,subtype){

        //type,id,entity
        var piece = new Piece("card",id,entity);

        piece.subtype = subtype;

        piece.reveal = function(){
            //show front of card
            piece.entity.reveal();
        };

        piece.hide = function(){
            //show back of card
            piece.entity.hide();
        };

        return piece;
    };
});