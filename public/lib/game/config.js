ig.module('game.config')
.defines(function() {

  defaultOrigin = {x:0,y:0};
  boardWidth = 1080;
  xSpacing = Atlas.global.gridSpacing.x;
  ySpacing = Atlas.global.gridSpacing.y;
  boardCenterOffsetX = (boardWidth-(10*xSpacing))/2, boardCenterOffsetY = (boardWidth-(8*ySpacing))/2;
  rows = [3, 4, 5, 4, 3];

  catalog = [
        { 
            name: "road",
            cost: {
                wood: 1,
                brick: 1
            } 
        },
        {
            name: "settlement",
            cost: {
                wood: 1,
                brick: 1,
                wheat: 1,
                sheep: 1
            }
        },
        {
            name: "city",
            cost: {
                wheat: 2,
                ore: 3
            }
        },
        {
            name: "developmentCard",
            cost: {
                wheat: 1,
                ore: 1,
                sheep: 1
            }
        }
    ]; 

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
        },
        {
            title: "Trade",
            id: "trade",
            actions: [
                "domesticTrade","maritimeTrade"
            ]
        },
        {
            title: "Build",
            id: "build",
            actions: [
                "buildSettlement", "buildCity"
            ]
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