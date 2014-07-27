
// Add your own drawing code here
var x = ig.system.width/2,
    y = ig.system.height/2;

this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );

                console.log(this.players);

                var player = this.players[2];


                var boardState = {
                    pieces: [
                        {
                            type: 'road',
                            owner: 0,
                            location: this.terrain[5].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 0,
                            location: this.terrain[5].getVertex(0)
                        },
                        {
                            type: 'road',
                            owner: 1,
                            location: this.terrain[10].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 1,
                            location: this.terrain[10].getVertex(0)
                        },
                        {
                            type: 'road',
                            owner: 2,
                            location: this.terrain[12].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 2,
                            location: this.terrain[12].getVertex(0)
                        },
                        {
                            type: 'settlement',
                            owner: 2,
                            location: this.terrain[0].getVertex(5)
                        },
                        {
                            type: 'settlement',
                            owner: 2,
                            location: this.terrain[0].getVertex(1)
                        },
                        {
                            type: 'settlement',
                            owner: 2,
                            location: this.terrain[2].getVertex(0)
                        },
                        {
                            type: 'settlement',
                            owner: 2,
                            location: this.terrain[6].getVertex(2)
                        },
                        {
                            type: 'road',
                            owner: 3,
                            location: this.terrain[17].getEdge(0)
                        },
                        {
                            type: 'settlement',
                            owner: 3,
                            location: this.terrain[17].getVertex(0)
                        }
                    ]
                };




                //player.moveRobber(this.robber,this.terrain[5]);

                //player.buildSettlement(terrain.getVertex(0));
                //player.buildRoad(terrain.getEdge(0));

                _.each(boardState.pieces,function(piece){
                    var player = self.players[piece.owner];

                    switch(piece.type){
                        case 'road':
                            player.buildRoad(piece.location);
                            break;
                        case 'settlement':
                            player.buildSettlement(piece.location);
                            break;
                    }
                });


                //player.buildCity(player.getPieces("settlement")[0]);

                //player.buildRoad(terrain.getEdge(1));
//        player.buildSettlement(terrain.getVertex(2));
//        player.buildCity(player.getPieces("settlement")[0]);

                //TODO player rolls dice

//        this.produceResources(8);
//        this.produceResources(4);
//        this.produceResources(6);
//        this.produceResources(3);

                //seed player inventory
                _.each(this.players,function(player){

                    var payouts = [
                        { player: player, count:2, type:'brick', origin:player.getLocation('origin') },
                        { player: player, count:4, type:'ore', origin:player.getLocation('origin') },
                        { player: player, count:2, type:'wheat', origin:player.getLocation('origin') },
                        { player: player, count:2, type:'sheep', origin:player.getLocation('origin') },
                        { player: player, count:2, type:'wood', origin:player.getLocation('origin') }
                    ];

                    self.dealResourceCards(payouts);

                });


                //test maritime trade
                //player.updateMaritimeTrades();
                //this.makeMaritimeTrade(player,'brick','wheat');
                this.makeMaritimeTrade(player,'ore','brick');


                //test stealing
                player.stealFromPlayer(this.players[0]);


                //test road building
//        var locations = player.getEligibleBuildingLocations('road');
//        console.log('getEligibleBuildingLocations for road');
//        console.log(locations);
//
//        _.each(locations,function(location){
//           player.buildRoad(location);
//        });

//                console.log(player.getPieces('road').length);
//
//                //test settlement building
//                locations = player.getEligibleBuildingLocations('settlement');
//                console.log('getEligibleBuildingLocations for settlement');
//                console.log(locations.length);
//                console.log(locations);
//
//                _.each(locations,function(location){
//                    player.buildSettlement(location);
//                });
//
//                console.log(player.getPieces('settlement').length);


                //test degrees of separation
//        var locations = location.getNeighborsAtDistance(4);
//        console.log(locations.length);
//        _.each(locations,function(location){
//           player.buildSettlement(location);
//        });


                //test development cards
                //this.dealDevelopmentCards(1,player);

//                var payouts = [
//                    {player:player,count:3,subClass:"knight",location:"hand"},
//                    //{player:player,count:1,subClass:"plenty",location:"hand"},
//                    //{player:player,count:1,subClass:"monopoly",location:"hand"},
//                    //{player:player,count:1,subClass:"road",location:"hand"},
//                    {player:player,count:1,subClass:"chapel",location:"hand"},
//                    {player:player,count:1,subClass:"palace",location:"hand"}
//                ];
//
//                this.setDevelopmentCards(payouts);

//        console.log('check player cards');
//        var resourceCards = player.getCards('hand','resource');
//        var developmentCards = player.getCards('hand','development');
//        console.log(resourceCards);
//        console.log(developmentCards);

                //test victory point cards
//                var cards = player.getCards('hand','development','chapel');
//                console.log(cards);
//                player.activateVictoryPoint(cards[0]);
//
//                // test knight activation
//                var cards = player.getCards('hand','development','knight');
//                console.log(cards);
//                player.activateKnight(cards[0],this.robber,this.terrain[1],self.checkForLargestArmy.bind(self));
//                player.activateKnight(cards[1],this.robber,this.terrain[2],self.checkForLargestArmy.bind(self));
//                player.activateKnight(cards[2],this.robber,this.terrain[3],self.checkForLargestArmy.bind(self));
//
//
//                var points = player.countVictoryPoints();
//                console.log(points);

                //test road building
//                var cards = player.getCards('hand','development','road');
//                var locations = [this.terrain[10].getEdge(1),this.terrain[10].getEdge(2)];
//                player.activateRoadBuilding(cards[0],locations,this.checkForLongestRoad.bind(this));

                //test badges
                //player.addBadge('largestArmy',self.badges['largestArmy']);
                //player.addBadge('longestRoad',self.badges['longestRoad']);


                //test year of plenty activation
//                var cards = player.getCards('hand','development','plenty');
//                console.log(cards);
//                player.activateYearOfPlenty(cards[0], ['wood','wheat'], self.dealResourceCards.bind(self) ) ;


                // test monopoly activation
//                var cards = player.getCards('hand','development','monopoly');
//                console.log(cards);
//                player.activateMonopoly(cards[0], 'wheat', this.players);


                //test trading
//                var exchanges = [
//                    {player:this.players[0],type:'wheat',quantity:2},
//                    {player:this.players[1],type:'wood',quantity:2}
//                ]
//
//                this.makeTrade(exchanges);

//        var report = player.getAffordableActions();
//
//        console.log("eligible purchases:");
//        console.log(report);
//
//        if (player.purchase(catalog.road)) {
//            //player.buildRoad();
//        };