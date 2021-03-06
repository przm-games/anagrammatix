ig.module('game.config')
    .defines(function() {

        defaultOrigin = {x:0,y:0};
        POSITIONS = {
            default: {x:0,y:0}
        }

        xSpacing = Atlas.global.gridSpacing.x;
        ySpacing = Atlas.global.gridSpacing.y;

        rows = [3, 4, 5, 4, 3];

        zones = {
            board: { h:1200, w:1200},
            player: { h:50, w:400 }
        };

        offsets = {
            boardCenter: {x:(zones.board.w-(10*xSpacing))/2, y:(zones.board.h-(8*ySpacing))/2},
            playerCorner: {x:50,y:50},
            hand: {x:25,y:-50},
            field: {x:425,y:-50},
            badges: {x:625,y:-50}
        };

        ZONES = {
            hand: {
                size: { h:50, w:400 },
                offset:  {x:0,y:-50}
            },
            field: {
                size: { h:50, w:300 },
                offset:  {x:500,y:-50}
            },
            badges: {
                size: { h:50, w:100 },
                offset: {x:875,y:-50}
            }
        }

        limits = {
            safeHand: 7
        };

        degrees = {
            0: 0,
            90: Math.PI/2,
            180: Math.PI,
            270: Math.PI*3/2
        };

        BADGES = {
            largestArmy: {
                title: "Largest Army",
                description: "This card goes to the player with the longest unbroken road of at least 5 segments. Another player who builds a longer roads takes this card.",
                bonus: 2,
                origin: {x:100,y:325}
            },
            longestRoad: {
                title: "Longest Road",
                description: "The first player to play 3 Knight cards gets this card. Another player who plays more Knight cards takes this card.",
                bonus: 2,
                origin: {x:100,y:400}
            }
        };

        DECKS = [
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
                origin: {x:100,y:175}
            },
            {
                name: "bank",
                type: "resource",
                cards: null,
                origin: {x:1000,y:1000}
            }
        ];

        //4 player setup
        //---------------------------------------------------
        TERRAIN_MAP = {
            desert: 1,
            hills: 3,
            mountains: 3,
            fields: 4,
            pasture: 4,
            forest: 4
        };

        NUMBER_TOKENS = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];

        //9 ports
        PORT_LIST = ['brick','sheep','ore','wheat','wood','any','any','any','any'];

        //# of edges between ports
        //2,2,3,2,2,3,2,2,3
        HARBOR_EDGE_INDEX = [0,3,6,10,13,16,20,23,26];

        //i = terrainIndex, e = outer edges
        EDGE_MAP = [
            {i:0,e:[4,5,0]},
            {i:1,e:[5,0]},
            {i:2,e:[5,0,1]},
            {i:6,e:[0,1]},
            {i:11,e:[0,1,2]},
            {i:15,e:[1,2]},
            {i:18,e:[1,2,3]},
            {i:17,e:[2,3]},
            {i:16,e:[2,3,4]},
            {i:12,e:[3,4]},
            {i:7,e:[3,4,5]},
            {i:3,e:[4,5]}
        ];

        //5-6 player setup
        //---------------------------------------------------
        //NUMBER_TOKENS = [2,5,4,6,3,9,8,11,11,10,6,3,8,4,8,10,11,12,10,5,4,9,5,9,12,3,2,6];

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
                    resolution: 'field'
                },
                plenty: {
                    title: "Year of Plenty",
                    animation: "plenty",
                    class: "plenty",
                    description: "Take any 2 resources of your choice from the bank. Keep them or use the immediately.",
                    activation: "activateYearOfPlenty",
                    resolution: 'field'
                },
                monopoly: {
                    title: "Monopoly",
                    animation: "monopoly",
                    class: "monopoly",
                    description: "Announce 1 resource type. All players must give you all of their resources of that type.",
                    activation: "activateMonopoly",
                    resolution: 'field'
                },
                chapel: {
                    title: "Chapel",
                    animation: "chapel",
                    class: "chapel",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                palace: {
                    title: "Palace",
                    animation: "palace",
                    class: "palace",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                market: {
                    title: "Market",
                    animation: "market",
                    class: "market",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                library: {
                    title: "Library",
                    animation: "library",
                    class: "library",
                    description: "1 Victory Point!",
                    activation: "earnVictoryPoint",
                    resolution: 'field'
                },
                university: {
                    title: "University",
                    animation: "university",
                    class: "university",
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
                { name:'jimmy chen', color:'white'}
                ,{ name:'Kailing Chan To', color:'green' }
            ],
            turnState: {
                player: 0,
                phase: "resource-production"
            }
        };


    });