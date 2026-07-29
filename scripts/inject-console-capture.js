const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function processHtmlFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log('No output directory found, skipping console capture injection');
    return;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      processHtmlFiles(fullPath);
    } else if (file.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace(
          '<head>',
          '<head><script src="/dashboard-console-capture.js"></script>'
        );
        fs.writeFileSync(fullPath, content);
        console.log(`Injected console capture into: ${fullPath}`);
      }
    }
  }
}

processHtmlFiles(outDir);