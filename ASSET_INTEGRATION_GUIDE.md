# 🎨 Asset Integration Guide - Cat Quest

## Phase 2: Asset Setup & Animation

This guide explains how to integrate your cat sprite images into the game.

---

## Step 1: Prepare Your Cat Sprite

### Image Format:
- **Format**: PNG with transparency (recommended) or JPG
- **Size**: 200x200px or larger (will be scaled)
- **Resolution**: 72 DPI minimum

### Create States (Optional but Recommended):
```
cat-sprite/
├── idle.png          (Cat standing still)
├── running.png       (Cat running forward)
├── jumping.png       (Cat in mid-jump)
└── dizzy.png         (Cat dizzy after wrong answer)
```

**Or single sprite sheet:**
- `cat-spritesheet.png` (800x200px with 4 frames, 200x200 each)

---

## Step 2: Add Images to Project

```bash
cd cat-quest/src/assets/sprites/

# Copy your images here
cp ~/Downloads/cat-idle.png ./idle.png
cp ~/Downloads/cat-jump.png ./jumping.png
cp ~/Downloads/cat-dizzy.png ./dizzy.png
```

---

## Step 3: Update Game Code

### Option A: Multiple Image Files

Edit `src/js/scenes/GameplayScene.js` - in the `preload()` method:

```javascript
preload() {
    this.load.image('cat-idle', 'assets/sprites/idle.png');
    this.load.image('cat-jump', 'assets/sprites/jumping.png');
    this.load.image('cat-dizzy', 'assets/sprites/dizzy.png');
}

create() {
    // Replace: this.cat = this.add.text(80, height - 120, '🐱', ...);
    // With:
    this.cat = this.add.image(80, height - 120, 'cat-idle');
    this.cat.setScale(0.8);
    this.cat.setDepth(5);
}
```

### Option B: Sprite Sheet (Advanced)

```javascript
preload() {
    this.load.spritesheet('cat', 'assets/sprites/cat-spritesheet.png', {
        frameWidth: 200,
        frameHeight: 200
    });
}

create() {
    this.cat = this.add.sprite(80, height - 120, 'cat', 0);
    this.cat.setScale(0.5);
}

animateCatIdle() {
    this.anims.create({
        key: 'cat-idle',
        frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });
    this.cat.play('cat-idle');
}
```

---

## Step 4: Update Animation Methods

### Current Implementation (using emoji states):

Replace these methods in `GameplayScene.js`:

```javascript
animateCatIdle() {
    // Replace emoji with image
    this.cat.setTexture('cat-idle');
    // ... rest of animation
}

animateCatJump() {
    this.cat.setTexture('cat-jump');
    // ... jump animation
}

animateCatDizzy() {
    this.cat.setTexture('cat-dizzy');
    // ... dizzy animation
}
```

---

## Step 5: Test Locally

```bash
cd cat-quest/src
# Start local server
python3 -m http.server 8000

# Open browser
# http://localhost:8000/index.html
```

---

## Step 6: Sound Effects (Optional)

Add these files to `assets/sounds/`:

```
cat-quest/src/assets/sounds/
├── correct.mp3        # Positive sound (0.5s)
├── wrong.mp3          # Wrong answer buzz
├── jump.mp3           # Jump sound effect
└── level-up.mp3       # Level complete sound
```

### Add to Code:

```javascript
preload() {
    this.load.audio('correct', 'assets/sounds/correct.mp3');
    this.load.audio('wrong', 'assets/sounds/wrong.mp3');
}

answerQuestion(buttonIndex) {
    if (isCorrect) {
        this.sound.play('correct');
    }
}
```

---

## Quick Sizing Reference

| Element | Size | Notes |
|---------|------|-------|
| Cat sprite | 200x200px | Main character |
| Button icons | 50x50px | Optional |
| Background | 1200x600px | Game area |
| Title font | 64px | Menu title |

---

## Troubleshooting

**Cat not showing?**
- Check file path in `load.image()`
- Verify file exists and is readable
- Check browser console for errors

**Image looks blurry?**
- Increase source image resolution
- Use `setScale()` carefully
- Use `pixelArt: true` in config for pixel-perfect rendering

**Animations not working?**
- Verify animation names match
- Check frame indices are correct
- Ensure `preload()` runs before `create()`

---

## Next Steps

1. ✅ Prepare cat sprite images
2. ✅ Add to `assets/sprites/` folder
3. ✅ Update game code with file paths
4. ✅ Test locally
5. ✅ Push to GitHub
6. ✅ Deploy to GitHub Pages

---

**Ready to integrate! 🐱**
