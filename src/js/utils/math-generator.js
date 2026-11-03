class MathGenerator {
    static generateQuestion(level) {
        const levelConfig = CONFIG.LEVELS[level - 1];
        const operation = this.getOperation(levelConfig.operation);

        let num1, num2, result, displayOperation;

        if (operation === 'add') {
            num1 = Phaser.Math.Between(0, 10);
            num2 = Phaser.Math.Between(0, 10 - num1);
            result = num1 + num2;
            displayOperation = '+';
        } else if (operation === 'subtract') {
            num1 = Phaser.Math.Between(5, 10);
            num2 = Phaser.Math.Between(0, num1);
            result = num1 - num2;
            displayOperation = '-';
        } else {
            // mixed or random
            if (Math.random() < 0.5) {
                num1 = Phaser.Math.Between(0, 10);
                num2 = Phaser.Math.Between(0, 10 - num1);
                result = num1 + num2;
                displayOperation = '+';
            } else {
                num1 = Phaser.Math.Between(5, 10);
                num2 = Phaser.Math.Between(0, num1);
                result = num1 - num2;
                displayOperation = '-';
            }
        }

        const options = this.generateOptions(result);

        return {
            num1,
            num2,
            result,
            operation: displayOperation,
            question: `${num1} ${displayOperation} ${num2} = ?`,
            options: options.shuffled,
            correctIndex: options.correctIndex
        };
    }

    static getOperation(operationType) {
        if (operationType === 'subtract') return 'subtract';
        if (operationType === 'add') return 'add';
        if (operationType === 'mixed') {
            return Math.random() < 0.5 ? 'add' : 'subtract';
        }
        if (operationType === 'random') {
            const rand = Math.random();
            if (rand < 0.6) return 'subtract';
            return 'add';
        }
        return 'add';
    }

    static generateOptions(correctAnswer) {
        const options = [correctAnswer];

        // Generate two wrong answers
        let wrong1 = correctAnswer + Phaser.Math.Between(1, 3);
        if (wrong1 > 20) wrong1 = correctAnswer - Phaser.Math.Between(1, 2);
        options.push(wrong1);

        let wrong2 = correctAnswer - Phaser.Math.Between(1, 2);
        if (wrong2 < 0) wrong2 = correctAnswer + Phaser.Math.Between(2, 3);
        if (wrong2 === correctAnswer) wrong2 = correctAnswer + 2;
        options.push(wrong2);

        // Shuffle and track correct index
        const shuffled = Phaser.Utils.Array.Shuffle([...options]);
        const correctIndex = shuffled.indexOf(correctAnswer);

        return { shuffled, correctIndex };
    }
}
