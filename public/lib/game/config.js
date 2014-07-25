ig.module('game.config')
    .defines(function() {

        defaultOrigin = {x:0,y:0};
        boardWidth = 1080;
        xSpacing = Atlas.global.gridSpacing.x;
        ySpacing = Atlas.global.gridSpacing.y;
        boardCenterOffsetX = (boardWidth-(10*xSpacing))/2, boardCenterOffsetY = (boardWidth-(8*ySpacing))/2;
        rows = [3, 4, 5, 4, 3];

        offsets = {
            playerCorner: 100,
            resourceCards: 50
        };

        degrees = {
            0: 0,
            90: Math.PI/2,
            180: Math.PI,
            270: Math.PI*3/2
        };

        badges = {
            largestArmy: {
                title: "Largest Army",
                description: "This card goes to the player with the longest unbroken road of at least 5 segments. Another player who builds a longer roads takes this card.",
                bonus: 2
            },
            longestRoad: {
                title: "Longest Road",
                description: "The first player to play 3 Knight cards gets this card. Another player who plays more Knight cards takes this card.",
                bonus: 2
            }
        }

        decks = [
            {
                name: "development",
                type: "development",
                cards: {
                    knight: 14,
                    palace: 1,
                    chapel: 1,
                    library: 1,
                    market: 1,
                    university: 1,
                    monopoly: 2,
                    roadBuilding: 2,
                    plenty: 2
                },
                origin: {x:75,y:200}
            }
        ];

        library = {
            development: {
                knight: {
                    title: "Knight",
                    animation: "knight",
                    class: "knight",
                    description: "Move the robber. Steal 1 resource from an owner of adjacent settlement or city.",
                    activation: "activateKnight",
                    resolution: 'field'
                },
                roadBuilding: {
                    title: "Road Building",
                    animation: "road",
                    class: "road",
                    description: "Place two roads as if you had built them.",
                    activation: "activateRoadBuilding",
                    resolution: 'discard'
                },
                plenty: {
                    title: "Year of Plenty",
                    animation: "plenty",
                    class: "plenty",
                    description: "Take any 2 resources of your choice from the bank. Keep them or use the immediately.",
                    activation: "activateYearOfPlenty",
                    resolution: 'discard'
                },
                monopoly: {
                    title: "Monopoly",
                    animation: "monopoly",
                    class: "plenty",
                    description: "Announce 1 resource type. All players must give you all of their resources of that type.",
                    activation: "activateMonopoly",
                    resolution: 'discard'
                },
                chapel: {
                    title: "Chapel",
                    animation: "chapel",
                    class: "autopoint",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                palace: {
                    title: "Palace",
                    animation: "palace",
                    class: "autopoint",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                market: {
                    title: "Market",
                    animation: "market",
                    class: "autopoint",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                library: {
                    title: "Library",
                    animation: "library",
                    class: "autopoint",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                university: {
                    title: "University",
                    animation: "university",
                    class: "autopoint",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                }
            }
        };


        catalog = {
            road: {
                name: "road",
                cost: {
                    wood: 1,
                    brick: 1
                }
            },
            settlement: {
                name: "settlement",
                cost: {
                    wood: 1,
                    brick: 1,
                    wheat: 1,
                    sheep: 1
                }
            },
            city: {
                name: "city",
                cost: {
                    wheat: 2,
                    ore: 3
                }
            },
            developmentCard: {
                name: "developmentCard",
                cost: {
                    wheat: 1,
                    ore: 1,
                    sheep: 1
                }
            }
    };

        cardConversions = {
            hills:"brick",
            mountains: "ore",
            fields: "wheat",
            pasture: "sheep",
            forest: "wood"
        };

        gameState = {
            turnCount: 0,
            players: [
                { name:'Mike', color:'red',
                    inventory: {

                    },
                    pieces: {

                    }
                },
                { name:'dogoodjonathan', color:'blue'},
                { name:'jimmy chen', color:'white'},
                { name:'Kailing Chan To', color:'green' }
            ],
            turnState: {
                player: 0,
                phase: "resource-production"
            }
        };

        phases = [
            {
                title: "Resource Production",
                id: "resource-production",
                actions: {
                    entry: [],
                    player: [],
                    exit: []
                }
            },
            {
                title: "Trade",
                id: "trade",
                actions: {
                    entry: [],
                    player: [
                        "domesticTrade","maritimeTrade"
                    ],
                    exit: []
                }
            },
            {
                title: "Build",
                id: "build",
                actions: {
                    entry: [],
                    player: [
                        "buildSettlement", "buildCity", "buildRoad"
                    ],
                    exit: []
                }
            }
        ];

        //possible action
        //eligible action


        // startTurn

        // endTurn

        // checkEndGame

        // declareEndGame

        actions = [
            {
                title: "Make Domestic Trade",
                id: "domesticTrade",
                eligible: "checkDomesticTrade",
                action: "domesticTrade"
            },
            {
                title: "Make Maritime Trade",
                id: "maritimeTrade",
                eligible: "checkMaritimeTrade",
                action: "maritimeTrade"
            },
            {
                title: "Declare Victory!",
                id: "endGame",
                eligible: "checkEndGame",
                action: "endGame"
            }

        ];



        cardTypes = [
            {
                title: "Knight",
                animation: "knight",
                description: "Move the robber. Steal 1 resource from an owner of adjacent settlement or city."
            },
            {
                title: "Road Building",
                animation: "road",
                description: "Place two roads as if you had built them."
            },
            {
                title: "Year of Plenty",
                animation: "plenty",
                description: "Take any 2 resources of your choice from the bank. Keep them or use the immediately."
            },
            {
                title: "Monopoly",
                animation: "monopoly",
                description: "Announce 1 resource type. All players must give you all of their resources of that type."
            },
            {
                title: "Chapel",
                animation: "chapel",
                description: "1 Victory Point!"
            },
            {
                title: "Palace",
                animation: "palace",
                description: "1 Victory Point!"
            },
            {
                title: "Market",
                animation: "market",
                description: "1 Victory Point!"
            },
            {
                title: "Library",
                animation: "library",
                description: "1 Victory Point!"
            }
        ];

        playerConfig = [
            { name:'Mike', color:'red'},
            { name:'dogoodjonathan', color:'blue'},
            { name:'jimmy chen', color:'white'},
            { name:'Kailing Chan To', color:'green' }
        ];
    });