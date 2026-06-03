import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(process.cwd(), 'auroratech-repo');
const destDir = path.resolve(process.cwd(), 'public/auroratech-repo');

function copyDirRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursiveSync(srcDir, destDir);
console.log('Copied repo to public');
