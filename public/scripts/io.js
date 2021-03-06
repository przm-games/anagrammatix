/**
 * Created by dodeca on 7/27/14.
 */
define(function () {
//define(["app"], function(App) {
    /**
     * All the code relevant to Socket.IO is collected in the IO namespace.
     *
     * @type {{init: Function, bindEvents: Function, onConnected: Function, onNewGameCreated: Function, playerJoinedRoom: Function, beginNewGame: Function, onNewWordData: Function, hostCheckAnswer: Function, gameOver: Function, error: Function}}
     */
    var App = null

    var IO = {

        /**
         * This is called when the page is displayed. It connects the Socket.IO client
         * to the Socket.IO server
         */
        setApp:function(app){
            App = app;
        },

        init: function() {
            IO.socket = io.connect();
            IO.bindEvents();
        },

        /**
         * While connected, Socket.IO will listen to the following events emitted
         * by the Socket.IO server, then run the appropriate function.
         */
        bindEvents : function() {
            IO.socket.on('connected', IO.onConnected );
            IO.socket.on('newGameCreated', IO.onNewGameCreated );
            IO.socket.on('playerJoinedRoom', IO.playerJoinedRoom );
            IO.socket.on('beginNewGame', IO.beginNewGame );
            IO.socket.on('newWordData', IO.onNewWordData);
            IO.socket.on('hostCheckAnswer', IO.hostCheckAnswer);
            IO.socket.on('gameOver', IO.gameOver);
            IO.socket.on('error', IO.error );

            //IO.socket.on('gameInstantiated', IO.onGameInstantiated );
            //IO.socket.on('presentScreen', IO.createGameView );
            IO.socket.on('sessionDataGenerated', IO.renderGameView );
        },

        /**
         * The client is successfully connected!
         */
        onConnected : function() {
            // Cache a copy of the client's socket.IO session ID on the App
            App.mySocketId = IO.socket.socket.sessionid;
            // console.log(data.message);
        },

        /**
         * A new game has been created and a random game ID has been generated.
         * @param data {{ gameId: int, mySocketId: * }}
         */
        onNewGameCreated : function(data) {
            App.Host.gameInit(data);


            // OVERRIDE to debug gameboard screen
            IO.createGameView(data);
        },

        /**
         * A player has successfully joined the game.
         * @param data {{playerName: string, gameId: int, mySocketId: int}}
         */
        playerJoinedRoom : function(data) {
            // When a player joins a room, do the updateWaitingScreen funciton.
            // There are two versions of this function: one for the 'host' and
            // another for the 'player'.
            //
            // So on the 'host' browser window, the App.Host.updateWiatingScreen function is called.
            // And on the player's browser, App.Player.updateWaitingScreen is called.
            App[App.myRole].updateWaitingScreen(data);
        },

        /**
         * Both players have joined the game.
         * @param data
         */
        createGameView: function(data) {

            if(App.myRole === 'Host') {
                //App.Host.checkAnswer(data);

                ig.main( '#canvas', MyGame, 60, 1200, 1200 /*, scale, loaderClass*/ );

                // Wait until a game has been established before
                // requesting game data to render.

                var interval = setInterval(function() {
                    console.log('intstantiating game');
                    if (ig.game) {
                        //ig.client = new (clientClass)();
                        console.log('gameIntstantiated');
                        console.log(App.gameId);
                        IO.socket.emit("gameInstantiated",App.gameId);
                        clearInterval(interval);
                    }
                }, 100);

                //TODO server should generate game data
                //terrain, count positions, players

                //then send to current Game instance to render

                //ig.game.render();
            } else {

                // present user actions screen

            }

        },

        renderGameView: function(sessionData) {
            console.log('renderGameView');
            ig.game.render();

        },



        beginNewGame : function(data) {
            App[App.myRole].gameCountdown(data);
        },



        /**
         * A new set of words for the round is returned from the server.
         * @param data
         */
        onNewWordData : function(data) {
            // Update the current round
            App.currentRound = data.round;

            // Change the word for the Host and Player
            App[App.myRole].newWord(data);
        },

        /**
         * A player answered. If this is the host, check the answer.
         * @param data
         */
        hostCheckAnswer : function(data) {
            if(App.myRole === 'Host') {
                App.Host.checkAnswer(data);
            }
        },

        /**
         * Let everyone know the game has ended.
         * @param data
         */
        gameOver : function(data) {
            App[App.myRole].endGame(data);
        },

        /**
         * An error has occurred.
         * @param data
         */
        error : function(data) {
            alert(data.message);
        }

    };
    return IO;
});