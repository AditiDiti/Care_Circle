const svgSprite = require('svg-sprite');
const fs = require('fs');
const path = require('path');

const config = {
  mode: {
    symbol: {
      dest: '.',
      sprite: 'sprite.svg',
    },
  },
};

const sprite = new svgSprite(config);

// Add all SVG files to the sprite
const svgFolder = path.resolve(__dirname, 'src/images/svgs');
fs.readdirSync(svgFolder).forEach(file => {
  const filePath = path.join(svgFolder, file);
  sprite.add(filePath, null, fs.readFileSync(filePath, 'utf-8'));
});

// Compile the sprite
sprite.compile((error, result) => {
  if (error) {
    console.error('Error creating sprite:', error);
  } else {
    // Write the sprite file to the destination
    const outputPath = path.resolve(__dirname, 'public/sprite.svg');
    fs.writeFileSync(outputPath, result.symbol.sprite.contents);
    console.log('Sprite created successfully at', outputPath);
  }
});
