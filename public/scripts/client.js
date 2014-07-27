require(["app","io"], function(App,IO) {
    jQuery(function($){
        'use strict';

        IO.setApp(App);
        App.setIO(IO);

        IO.init();
        App.init();

    }($));
});