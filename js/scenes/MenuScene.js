class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x87ceeb);

        // Decorative trees in background
        for (let i = 0; i < 8; i++) {
            const treeX = width * (0.1 + i * 0.12);
            const treeY = height * 0.3;
            this.add.text(treeX, treeY, '🌲', {
                fontSize: '50px'
            }).setAlpha(0.2).setDepth(-1);
        }

        // Title with animation
        const title = this.add.text(width / 2, 80, '🐱 CAT QUEST 🐱', {
            fontSize: '64px',
            fontStyle: 'bold',
            fill: '#fff',
            align: 'center',
            stroke: '#333',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            y: 75,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // Subtitle
        const subtitle = this.add.text(width / 2, 160, 'Finding Mother', {
            fontSize: '32px',
            fill: '#fff',
            align: 'center',
            stroke: '#333',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Cat emoji animation
        const catEmoji = this.add.text(width / 2, 230, '🐱', {
            fontSize: '60px'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: catEmoji,
            scale: 1.1,
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        // Forest path indication
        this.add.text(width / 2, 300, '🌲 🌲 🌲 🌲 🌲', {
            fontSize: '36px',
            align: 'center'
        }).setOrigin(0.5).setAlpha(0.5);

        // Start Button with animation
        const startBtn = this.add.rectangle(width / 2, height / 2 + 80, 250, 70, CONFIG.COLORS.PRIMARY);
        startBtn.setInteractive({ useHandCursor: true });
        startBtn.on('pointerdown', () => this.scene.start('GameplayScene', { level: 1 }));
        startBtn.on('pointerover', () => {
            this.tweens.add({
                targets: startBtn,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100
            });
        });
        startBtn.on('pointerout', () => {
            this.tweens.add({
                targets: startBtn,
                scaleX: 1,
                scaleY: 1,
                duration: 100
            });
        });

        this.add.text(width / 2, height / 2 + 80, 'START GAME', {
            fontSize: '28px',
            fontStyle: 'bold',
            fill: '#fff'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(width / 2, height - 80, 'Answer math questions to help the cat\nfind her mother through the forest!', {
            fontSize: '18px',
            fill: '#333',
            align: 'center',
            lineSpacing: 10,
            stroke: '#fff',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Difficulty info
        this.add.text(width / 2, height - 20, '⏱ 15 Levels | 20s → 6s | Difficulty Increases', {
            fontSize: '14px',
            fill: '#555',
            align: 'center'
        }).setOrigin(0.5);
    }
}
