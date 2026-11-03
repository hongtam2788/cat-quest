# 🚀 Deploy to GitHub Pages

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a **public** repository named `cat-quest`
3. Do NOT initialize with README (we already have one)

## Step 2: Initialize Git (from project root)

```bash
cd cat-quest

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Cat Quest game"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/cat-quest.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/src` (root folder)
4. Click **Save**
5. Wait 1-2 minutes for deployment

## Step 4: Access Your Game

Your game will be live at:
```
https://YOUR_USERNAME.github.io/cat-quest/
```

## 📝 After Deployment

### Update Game Anytime
```bash
# Make changes to files
# Then:
git add .
git commit -m "Update: Your change description"
git push origin main
```

### Check Deployment Status
- Go to **Settings** → **Pages** to see deployment status
- Look for green checkmark next to your domain

## 🔧 Troubleshooting

**Game doesn't load?**
- Check browser console (F12) for errors
- Verify all files are in the `/src` folder
- Ensure GitHub Pages is enabled

**Math questions not generating?**
- Check that `utils/math-generator.js` is loaded
- Verify `config.js` is loaded before game scenes

**Buttons not working?**
- Check that Phaser is loaded from CDN
- Verify scene names match in all files

## 📱 Mobile Testing

After deployment, test on:
- iPhone/iPad: Open in Safari
- Android: Open in Chrome
- Desktop: Test in Chrome, Firefox, Safari

## 💾 Making Backups

```bash
# Create a backup branch
git checkout -b backup-$(date +%Y%m%d)
git push origin backup-$(date +%Y%m%d)
```

---

**Your game is now live! 🎉**
