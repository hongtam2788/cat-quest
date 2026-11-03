class GameplayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameplayScene' });
    }

    preload() {
        // Load cat sprite sheet
        this.load.image('cat-sprite', 'assets/sprites/cat-spritesheet.png');
    }

    init(data) {
        this.currentLevel = data.level || 1;
        this.currentQuestion = 0;
        this.levelConfig = CONFIG.LEVELS[this.currentLevel - 1];
        this.timeLeft = this.levelConfig.time;
        this.correctAnswers = 0;
        this.levelStartTime = Date.now();
        this.answerLocked = false;
    }

    create() {
        const { width, height } = this.cameras.main;

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x87ceeb);

        // Create forest/trees background
        this.createBackground();

        // HUD Background
        this.add.rectangle(width / 2, 40, width, 80, 0xffffff).setAlpha(0.9);

        // Level Info
        this.levelText = this.add.text(30, 20, `Level ${this.currentLevel}/15 | 🎯 Finding Mother`, {
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#333'
        });

        // Timer
        this.timerText = this.add.text(width - 30, 20, `⏱ ${this.timeLeft}s`, {
            fontSize: '20px',
            fontStyle: 'bold',
            fill: '#d32f2f',
            align: 'right'
        }).setOrigin(1, 0);

        // Progress
        this.progressText = this.add.text(width / 2, 50, `Question ${this.currentQuestion + 1}/${CONFIG.QUESTIONS_PER_LEVEL}`, {
            fontSize: '16px',
            fill: '#666',
            align: 'center'
        }).setOrigin(0.5);

        // Create cat sprite from spritesheet
        this.cat = this.add.image(80, height - 120, 'cat-sprite');
        this.cat.setDisplaySize(100, 100);
        this.cat.setDepth(5);
        this.catAnimationState = 'idle';
        this.catBounceY = this.cat.y;

        // Question box background
        this.questionBox = this.add.rectangle(width / 2, height / 2 - 60, 420, 160, 0xffffff);
        this.questionBox.setStrokeStyle(3, 0x667eea);
        this.questionBox.setDepth(10);

        // Question text
        this.questionText = this.add.text(width / 2, height / 2 - 90, '', {
            fontSize: '36px',
            fontStyle: 'bold',
            fill: '#333',
            align: 'center',
            wordWrap: { width: 350 }
        }).setOrigin(0.5).setDepth(11);

        // Answer buttons
        this.answerButtons = [];
        const buttonWidth = 90;
        const buttonHeight = 60;
        const startX = width / 2 - buttonWidth - 60;
        const buttonY = height / 2 + 70;

        for (let i = 0; i < 3; i++) {
            const btnX = startX + i * (buttonWidth + 40);

            // Button background
            const btn = this.add.rectangle(btnX, buttonY, buttonWidth, buttonHeight, 0xffffff);
            btn.setStrokeStyle(2, 0x667eea);
            btn.setInteractive({ useHandCursor: true });
            btn.on('pointerdown', () => this.answerQuestion(i));
            btn.on('pointerover', () => {
                if (!this.answerLocked) btn.setScale(1.08);
            });
            btn.on('pointerout', () => btn.setScale(1));
            btn.setDepth(10);

            // Button text
            const btnText = this.add.text(btnX, buttonY, '', {
                fontSize: '26px',
                fontStyle: 'bold',
                fill: '#333',
                align: 'center'
            }).setOrigin(0.5).setDepth(11);

            this.answerButtons.push({ rect: btn, text: btnText, index: i });
        }

        // Start timer
        this.timerEvent = this.time.addTimer({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Load first question
        this.loadQuestion();

        // Add subtle animations to buttons
        this.tweens.add({
            targets: this.questionBox,
            scaleY: 1.02,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    createBackground() {
        const { width, height } = this.cameras.main;
        // Simple trees decoration
        for (let i = 0; i < 5; i++) {
            const treeX = width * (0.15 + i * 0.18);
            const treeY = height * 0.25;
            this.add.text(treeX, treeY, '🌲', { fontSize: '60px' }).setAlpha(0.3).setDepth(-1);
        }
        // Path decoration
        this.add.rectangle(width / 2, height - 130, width * 0.8, 40, 0x8b6914).setAlpha(0.2).setDepth(0);
    }

    loadQuestion() {
        if (this.currentQuestion >= CONFIG.QUESTIONS_PER_LEVEL) {
            this.levelComplete();
            return;
        }

        this.currentQuestion++;
        this.answerLocked = false;
        const question = MathGenerator.generateQuestion(this.currentLevel);
        this.currentQuestion_data = question;

        // Update progress
        this.progressText.setText(`Question ${this.currentQuestion}/${CONFIG.QUESTIONS_PER_LEVEL}`);

        // Animate question appearance
        this.questionText.setScale(0.8).setAlpha(0);
        this.questionText.setText(question.question);
        this.tweens.add({
            targets: this.questionText,
            scale: 1,
            alpha: 1,
            duration: 300
        });

        // Reset answer buttons
        for (let i = 0; i < 3; i++) {
            this.answerButtons[i].text.setText(question.options[i]);
            this.answerButtons[i].rect.setFillStyle(0xffffff);
            this.answerButtons[i].rect.setScale(1);
            this.answerButtons[i].text.setFill('#333');
        }

        // Reset timer
        this.timeLeft = this.levelConfig.time;
        this.updateTimerDisplay();

        // Animate cat idle
        this.animateCatIdle();
    }

    answerQuestion(buttonIndex) {
        if (this.answerLocked) return;
        this.answerLocked = true;
        this.timerEvent.paused = true;

        const isCorrect = buttonIndex === this.currentQuestion_data.correctIndex;
        const button = this.answerButtons[buttonIndex];

        if (isCorrect) {
            // Correct answer animation
            button.rect.setFillStyle(CONFIG.COLORS.SUCCESS);
            button.text.setFill('#fff');

            this.tweens.add({
                targets: button.rect,
                scaleX: 1.15,
                scaleY: 1.15,
                duration: 200,
                yoyo: true
            });

            this.animateCatJump();
            this.correctAnswers++;

            this.time.delayedCall(900, () => {
                if (this.currentQuestion < CONFIG.QUESTIONS_PER_LEVEL) {
                    this.timerEvent.paused = false;
                    this.loadQuestion();
                } else {
                    this.levelComplete();
                }
            });
        } else {
            // Wrong answer animation
            button.rect.setFillStyle(CONFIG.COLORS.ERROR);
            button.text.setFill('#fff');

            this.tweens.add({
                targets: button.rect,
                x: button.rect.x + (Math.random() > 0.5 ? 20 : -20),
                duration: 100,
                yoyo: true,
                repeat: 2
            });

            this.animateCatDizzy();

            this.time.delayedCall(1500, () => {
                this.scene.restart();
            });
        }
    }

    updateTimer() {
        this.timeLeft--;
        this.updateTimerDisplay();

        if (this.timeLeft <= 0) {
            this.timerEvent.remove();
            // Time's up - wrong answer
            this.answerLocked = true;
            this.animateCatDizzy();
            this.time.delayedCall(1500, () => {
                this.scene.restart();
            });
        }
    }

    updateTimerDisplay() {
        const color = this.timeLeft <= 5 ? '#d32f2f' : '#333';
        this.timerText.setText(`⏱ ${this.timeLeft}s`);
        this.timerText.setFill(color);
    }

    animateCatIdle() {
        if (this.catAnimationState !== 'idle') {
            this.cat.setScale(1);
            this.cat.setRotation(0);
            this.cat.setTint(0xffffff);
        }
        this.catAnimationState = 'idle';

        // Gentle bobbing
        this.tweens.add({
            targets: this.cat,
            y: this.catBounceY - 10,
            duration: 600,
            yoyo: true,
            repeat: -1
        });
    }

    animateCatJump() {
        this.catAnimationState = 'jumping';

        // Remove existing animation
        this.tweens.killTweensOf(this.cat);

        this.tweens.add({
            targets: this.cat,
            y: this.catBounceY - 80,
            duration: 300,
            ease: 'Quad.easeOut'
        });

        this.tweens.add({
            targets: this.cat,
            y: this.catBounceY,
            duration: 300,
            delay: 300,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                if (this.catAnimationState === 'jumping') {
                    this.animateCatIdle();
                }
            }
        });
    }

    animateCatDizzy() {
        this.catAnimationState = 'dizzy';

        // Remove existing animation
        this.tweens.killTweensOf(this.cat);

        // Visual feedback for dizzy state
        this.cat.setTint(0xff6666);

        // Spin animation
        this.tweens.add({
            targets: this.cat,
            rotation: Math.PI * 4,
            duration: 800,
            ease: 'Quad.easeInOut'
        });

        this.tweens.add({
            targets: this.cat,
            scaleX: 0.9,
            scaleY: 0.9,
            duration: 400,
            yoyo: true
        });
    }

    levelComplete() {
        this.timerEvent.remove();
        this.tweens.killTweensOf(this.cat);

        const timeElapsed = Math.floor((Date.now() - this.levelStartTime) / 1000);

        this.scene.start('ResultsScene', {
            level: this.currentLevel,
            timeElapsed: timeElapsed,
            pokemon: this.levelConfig.pokemon
        });
    }
}
