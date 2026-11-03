class ResultsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ResultsScene' });
    }

    init(data) {
        this.level = data.level;
        this.timeElapsed = data.timeElapsed;
        this.pokemon = data.pokemon;
    }

    create() {
        const { width, height } = this.cameras.main;

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x87ceeb);

        // Confetti effect (emoji falling)
        for (let i = 0; i < 10; i++) {
            const emoji = ['🎉', '⭐', '✨', '🎊'][Math.floor(Math.random() * 4)];
            const confetti = this.add.text(
                Math.random() * width,
                Math.random() * (height * 0.5) - 50,
                emoji,
                { fontSize: '30px' }
            );
            this.tweens.add({
                targets: confetti,
                y: height + 50,
                duration: 2000 + Math.random() * 1000,
                rotation: Math.random() * Math.PI * 2,
                alpha: 0,
                repeat: -1
            });
        }

        // Title with animation
        const title = this.add.text(width / 2, 60, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '40px',
            fontStyle: 'bold',
            fill: '#fff',
            align: 'center',
            stroke: '#333',
            strokeThickness: 3
        }).setOrigin(0.5).setScale(0);

        this.tweens.add({
            targets: title,
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });

        // Time display with formatting
        const minutes = Math.floor(this.timeElapsed / 60);
        const seconds = this.timeElapsed % 60;
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        const timeBox = this.add.rectangle(width / 2, 130, 300, 70, 0xffffff);
        timeBox.setStrokeStyle(2, CONFIG.COLORS.PRIMARY);

        this.add.text(width / 2, 130, `⏱ Time: ${timeStr}`, {
            fontSize: '28px',
            fontStyle: 'bold',
            fill: CONFIG.COLORS.PRIMARY,
            align: 'center'
        }).setOrigin(0.5);

        // Character encounter animation
        const encounterText = this.add.text(width / 2, 200, '🐱 meets', {
            fontSize: '24px',
            fill: '#333',
            align: 'center'
        }).setOrigin(0.5);

        const pokemonEmoji = this.add.text(width / 2, 260, this.pokemon, {
            fontSize: '60px'
        }).setOrigin(0.5).setScale(0);

        this.tweens.add({
            targets: pokemonEmoji,
            scale: 1,
            duration: 600,
            delay: 300,
            ease: 'Back.easeOut'
        });

        // Story progress bar
        const progressPercent = Math.floor((this.level / 15) * 100);
        const progressBox = this.add.rectangle(width / 2, 330, 400, 40, 0xffffff);
        progressBox.setStrokeStyle(2, 0x666);

        const progressFill = this.add.rectangle(
            width / 2 - 200 + (progressPercent / 100) * 400,
            330,
            (progressPercent / 100) * 400,
            36,
            CONFIG.COLORS.SUCCESS
        );

        this.add.text(width / 2, 280, 'Journey to Mother', {
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#333',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width / 2, 330, `${progressPercent}%`, {
            fontSize: '16px',
            fontStyle: 'bold',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        // Buttons with interaction
        if (this.level < 15) {
            const nextBtn = this.add.rectangle(width / 2 - 120, height - 80, 200, 60, CONFIG.COLORS.PRIMARY);
            nextBtn.setInteractive({ useHandCursor: true });
            nextBtn.on('pointerdown', () => this.scene.start('GameplayScene', { level: this.level + 1 }));
            nextBtn.on('pointerover', () => nextBtn.setScale(1.1));
            nextBtn.on('pointerout', () => nextBtn.setScale(1));

            this.add.text(width / 2 - 120, height - 80, 'NEXT LEVEL', {
                fontSize: '20px',
                fontStyle: 'bold',
                fill: '#fff'
            }).setOrigin(0.5);
        } else {
            const victoryText = this.add.text(width / 2, height - 120, '🏆 YOU FOUND YOUR MOTHER! 🏆', {
                fontSize: '28px',
                fontStyle: 'bold',
                fill: '#d32f2f',
                align: 'center'
            }).setOrigin(0.5);

            this.tweens.add({
                targets: victoryText,
                scale: 1.05,
                duration: 400,
                yoyo: true,
                repeat: -1
            });
        }

        // Menu Button
        const menuBtn = this.add.rectangle(width / 2 + 120, height - 80, 200, 60, CONFIG.COLORS.SECONDARY);
        menuBtn.setInteractive({ useHandCursor: true });
        menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
        menuBtn.on('pointerover', () => menuBtn.setScale(1.1));
        menuBtn.on('pointerout', () => menuBtn.setScale(1));

        this.add.text(width / 2 + 120, height - 80, 'MENU', {
            fontSize: '20px',
            fontStyle: 'bold',
            fill: '#fff'
        }).setOrigin(0.5);
    }
}
