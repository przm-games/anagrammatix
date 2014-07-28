/* *******************************
 *         HOST CODE           *
 ******************************* */
define(function () {


    var App = null;
    var IO = null;

    var Host = {

        setApp: function(app){
            App = app;
        },
        setIO: function(io){
            IO = io;
        },

        /**
         * Contains references to player data
         */
        players : [],

        /**
         * Flag to indicate if a new game is starting.
         * This is used after the first game ends, and players initiate a new game
         * without refreshing the browser windows.
         */
        isNewGame : false,

        /**
         * Keep track of the number of players that have joined the game.
         */
        numPlayersInRoom: 0,

        /**
         * A reference to the correct answer for the current round.
         */
        currentCorrectAnswer: '',

        /**
         * Handler for the "Start" button on the Title Screen.
         */
        onCreateClick: function () {
            // console.log('Clicked "Create A Game"');
            IO.socket.emit('hostCreateNewGame');
        },

        /**
         * The Host screen is displayed for the first time.
         * @param data{{ gameId: int, mySocketId: * }}
         */
        gameInit: function (data) {
            App.gameId = data.gameId;
            App.mySocketId = data.mySocketId;
            App.myRole = 'Host';
            App.Host.numPlayersInRoom = 0;

            App.Host.displayNewGameScreen();
            // console.log("Game started with ID: " + App.gameId + ' by host: ' + App.mySocketId);
        },

        /**
         * Show the Host screen containing the game URL and unique game ID
         */
        displayNewGameScreen : function() {


            //ig.main( '#canvas', MyGame, 60, 1080, 1080, 1 );

            // Fill the game screen with the appropriate HTML
            App.$gameArea.html(App.$templateNewGame);

            // Display the URL on screen
            $('#gameURL').text(window.location.href);
            App.doTextFit('#gameURL');

            // Show the gameId / room id on screen
            $('#spanNewGameCode').text(App.gameId);
        },

        /**
         * Update the Host screen when the first player joins
         * @param data{{playerName: string}}
         */
        updateWaitingScreen: function(data) {
            // If this is a restarted game, show the screen.
            if ( App.Host.isNewGame ) {
                App.Host.displayNewGameScreen();
            }
            // Update host screen
            $('#playersWaiting')
                .append('<p/>')
                .text('Player ' + data.playerName + ' joined the game.');

            // Store the new player's data on the Host.
            App.Host.players.push(data);

            // Increment the number of players in the room
            App.Host.numPlayersInRoom += 1;

            // If two players have joined, start the game!
            if (App.Host.numPlayersInRoom === 2) {
                // console.log('Room is full. Almost ready!');

                // Let the server know that two players are present.
                IO.socket.emit('hostRoomFull',App.gameId);
            }
        },

        /**
         * Show the countdown screen
         */
        gameCountdown : function() {

            // Prepare the game screen with new HTML
            App.$gameArea.html(App.$hostGame);
            App.doTextFit('#hostWord');

            // Begin the on-screen countdown timer
            var $secondsLeft = $('#hostWord');
            App.countDown( $secondsLeft, 5, function(){
                IO.socket.emit('hostCountdownFinished', App.gameId);
            });

            // Display the players' names on screen
            $('#player1Score')
                .find('.playerName')
                .html(App.Host.players[0].playerName);

            $('#player2Score')
                .find('.playerName')
                .html(App.Host.players[1].playerName);

            // Set the Score section on screen to 0 for each player.
            $('#player1Score').find('.score').attr('id',App.Host.players[0].mySocketId);
            $('#player2Score').find('.score').attr('id',App.Host.players[1].mySocketId);
        },

        /**
         * Show the word for the current round on screen.
         * @param data{{round: *, word: *, answer: *, list: Array}}
         */
        newWord : function(data) {
            // Insert the new word into the DOM
            $('#hostWord').text(data.word);
            App.doTextFit('#hostWord');

            // Update the data for the current round
            App.Host.currentCorrectAnswer = data.answer;
            App.Host.currentRound = data.round;
        },

        /**
         * Check the answer clicked by a player.
         * @param data{{round: *, playerId: *, answer: *, gameId: *}}
         */
        checkAnswer : function(data) {
            // Verify that the answer clicked is from the current round.
            // This prevents a 'late entry' from a player whos screen has not
            // yet updated to the current round.
            if (data.round === App.currentRound){

                // Get the player's score
                var $pScore = $('#' + data.playerId);

                // Advance player's score if it is correct
                if( App.Host.currentCorrectAnswer === data.answer ) {
                    // Add 5 to the player's score
                    $pScore.text( +$pScore.text() + 5 );

                    // Advance the round
                    App.currentRound += 1;

                    // Prepare data to send to the server
                    var data = {
                        gameId : App.gameId,
                        round : App.currentRound
                    }

                    // Notify the server to start the next round.
                    IO.socket.emit('hostNextRound',data);

                } else {
                    // A wrong answer was submitted, so decrement the player's score.
                    $pScore.text( +$pScore.text() - 3 );
                }
            }
        },


        /**
         * All 10 rounds have played out. End the game.
         * @param data
         */
        endGame : function(data) {
            // Get the data for player 1 from the host screen
            var $p1 = $('#player1Score');
            var p1Score = +$p1.find('.score').text();
            var p1Name = $p1.find('.playerName').text();

            // Get the data for player 2 from the host screen
            var $p2 = $('#player2Score');
            var p2Score = +$p2.find('.score').text();
            var p2Name = $p2.find('.playerName').text();

            // Find the winner based on the scores
            var winner = (p1Score < p2Score) ? p2Name : p1Name;
            var tie = (p1Score === p2Score);

            // Display the winner (or tie game message)
            if(tie){
                $('#hostWord').text("It's a Tie!");
            } else {
                $('#hostWord').text( winner + ' Wins!!' );
            }
            App.doTextFit('#hostWord');

            // Reset game data
            App.Host.numPlayersInRoom = 0;
            App.Host.isNewGame = true;
        },

        /**
         * A player hit the 'Start Again' button after the end of a game.
         */
        restartGame : function() {
            App.$gameArea.html(App.$templateNewGame);
            $('#spanNewGameCode').text(App.gameId);
        }
    }

    return Host;
})