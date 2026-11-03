const CONFIG = {
    // Game Settings
    GAME_WIDTH: 1200,
    GAME_HEIGHT: 600,

    // Difficulty Settings
    TOTAL_LEVELS: 15,
    QUESTIONS_PER_LEVEL: 10,
    BASE_ANSWER_TIME: 20,
    TIME_DECREASE_PER_LEVEL: 1,
    MIN_ANSWER_TIME: 6,

    // Math Settings
    OPERAND_MIN: 0,
    OPERAND_MAX: 10,

    // Leaderboard
    LEADERBOARD_SIZE: 10,

    // Game States
    STATES: {
        MENU: 'menu',
        LEVEL_SELECT: 'levelSelect',
        GAMEPLAY: 'gameplay',
        RESULTS: 'results'
    },

    // Difficulty Levels
    LEVELS: [
        { level: 1, time: 20, operation: 'add', pokemon: 'Bulbasaur', difficulty: 1 },
        { level: 2, time: 19, operation: 'add', pokemon: 'Charmander', difficulty: 1 },
        { level: 3, time: 18, operation: 'add', pokemon: 'Squirtle', difficulty: 1 },
        { level: 4, time: 17, operation: 'mixed', pokemon: 'Pidgeot', difficulty: 2 },
        { level: 5, time: 16, operation: 'mixed', pokemon: 'Dragonite', difficulty: 2 },
        { level: 6, time: 15, operation: 'mixed', pokemon: 'Gyarados', difficulty: 2 },
        { level: 7, time: 14, operation: 'subtract', pokemon: 'Articuno', difficulty: 3 },
        { level: 8, time: 13, operation: 'subtract', pokemon: 'Zapdos', difficulty: 3 },
        { level: 9, time: 12, operation: 'subtract', pokemon: 'Moltres', difficulty: 3 },
        { level: 10, time: 11, operation: 'random', pokemon: 'Mewtwo', difficulty: 4 },
        { level: 11, time: 10, operation: 'random', pokemon: 'Lapras', difficulty: 4 },
        { level: 12, time: 9, operation: 'random', pokemon: 'Blastoise', difficulty: 4 },
        { level: 13, time: 8, operation: 'random', pokemon: 'Charizard', difficulty: 5 },
        { level: 14, time: 7, operation: 'random', pokemon: 'Venusaur', difficulty: 5 },
        { level: 15, time: 6, operation: 'random', pokemon: 'Meowth', difficulty: 5 }
    ],

    // Colors
    COLORS: {
        PRIMARY: 0x667eea,
        SECONDARY: 0x764ba2,
        SUCCESS: 0x4caf50,
        ERROR: 0xf44336,
        BACKGROUND: 0x87ceeb,
        FOREGROUND: 0xffffff
    }
};

// Phaser Configuration
const PhaserConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: CONFIG.GAME_WIDTH,
    height: CONFIG.GAME_HEIGHT,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: 'parent',
        expandParent: true
    },
    scene: [],
    render: {
        pixelArt: true,
        antialias: true
    }
};
