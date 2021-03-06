ig.module('game.utils')
.defines(function() {

    Utils = {
    	shuffle: function(array) {
		  var currentIndex = array.length
		    , temporaryValue
		    , randomIndex
		    ;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		},
        showTestMarker: function( x, y ) {
            var font = new ig.Font( 'media/04b03.font.png' );
            font.draw( 'X', x, y, ig.Font.ALIGN.CENTER );
        }
    }

});

