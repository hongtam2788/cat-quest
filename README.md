# 🐱 Cat Quest - A Math Learning Game

A delightful educational game where children help a cat find her mother by solving math problems.

## 🎮 Game Features

- **15 Progressive Levels**: Easy (addition) → Medium (mixed) → Hard (subtraction)
- **Math Practice**: Addition and subtraction within 0-10 range
- **Time Challenge**: Answer faster as levels progress
- **Story Mode**: Meet different characters (Pokemon) as you progress
- **Responsive Design**: Works on desktop, iPad, and mobile devices

## 📋 How to Play

1. Start the game from the menu
2. Read the math question
3. Click the correct answer
4. Complete 10 questions per level
5. Meet a new character at the end of each level
6. Continue until you find your mother (Level 15)!

## ⚡ Quick Start

### Local Development

```bash
# No installation needed! Just open the file
cd src
# Open index.html in a web browser
```

### GitHub Pages Deployment

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# Enable GitHub Pages in Settings
# Select "main" branch as source
# Access at: https://your-username.github.io/cat-quest
```

## 🎨 Customization

Edit `src/js/config.js` to adjust:
- Time limits per level
- Number of questions per level
- Difficulty progression
- Colors and styling

Edit `src/js/utils/math-generator.js` to:
- Change math operations
- Adjust number ranges
- Modify difficulty curves

## 📦 Project Structure

```
cat-quest/
├── src/
│   ├── index.html           # Entry point
│   ├── css/
│   │   └── style.css        # Responsive styling
│   ├── js/
│   │   ├── config.js        # Game configuration
│   │   ├── game.js          # Main game initialization
│   │   ├── utils/
│   │   │   └── math-generator.js  # Math question generation
│   │   └── scenes/
│   │       ├── MenuScene.js       # Main menu
│   │       ├── GameplayScene.js   # Core gameplay
│   │       └── ResultsScene.js    # Level results
│   └── assets/              # Game assets (placeholder)
└── design/                  # Design documentation
```

## 🛠 Technologies Used

- **Phaser 3** - HTML5 game framework
- **Vanilla JavaScript** - Game logic
- **Responsive CSS** - Mobile adaptation
- **GitHub Pages** - Free hosting

## 📱 Supported Devices

- Desktop browsers (Chrome, Firefox, Safari, Edge)
- iPad
- iPhone (tested on iOS 13+)
- Android tablets and phones

## 🎯 Educational Goals

- Improve mental math speed
- Build number fluency (0-10)
- Develop problem-solving skills
- Increase math confidence through gamification

## 🚀 Future Enhancements

- Leaderboard with top 10 times per level
- Sound effects and background music
- Custom character sprites
- Multiplayer mode
- Difficulty settings
- Achievement badges
- Daily challenges

## 📄 License

Free to use and modify for educational purposes.

---

**Created with ❤️ for young learners**
