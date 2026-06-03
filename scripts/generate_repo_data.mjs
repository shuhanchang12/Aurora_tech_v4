import fs from 'fs';
import path from 'path';

const REPO_DIR = path.resolve(process.cwd(), 'auroratech-repo');
const OUTPUT_FILE = path.resolve(process.cwd(), 'src/lib/repoData.ts');

function readDirRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(readDirRecursive(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

function processBloc(blocName) {
  const dir = path.join(REPO_DIR, blocName);
  const presDir = path.join(REPO_DIR, 'presentations', blocName.split('_')[0]); // e.g. bloc1
  let resultObjects = [];
  
  if (fs.existsSync(dir)) {
    const files = readDirRecursive(dir);
    files.forEach(file => {
      const relativePath = path.relative(dir, file);
      let content = '';
      if (!file.endsWith('.pptx') && !file.endsWith('.pkl')) {
        content = fs.readFileSync(file, 'utf-8');
      }
      resultObjects.push({
        name: relativePath,
        content,
        isBinary: file.endsWith('.pptx') || file.endsWith('.pkl')
      });
    });
  }
  
  if (fs.existsSync(presDir)) {
    const pFiles = readDirRecursive(presDir);
    pFiles.forEach(file => {
      const relativePath = path.basename(file); // For presentations, just use basename (e.g., Demo_Video.txt) so UI code matches it
      let content = '';
      if (!file.endsWith('.pptx')) {
        content = fs.readFileSync(file, 'utf-8');
      }
      resultObjects.push({
        name: relativePath,
        content,
        isBinary: file.endsWith('.pptx') || file.endsWith('.pkl')
      });
    });
  }
  
  return resultObjects;
}

const data = {
  bloc1: processBloc('bloc1_governance'),
  bloc2: processBloc('bloc2_architecture'),
  bloc3: processBloc('bloc3_pipelines'),
  bloc4: processBloc('bloc4_ai_solutions')
};

const tsContent = `// Automatically generated from auroratech-repo\n\nexport const REPO_DATA = ${JSON.stringify(data, null, 2)};\n`;

fs.writeFileSync(OUTPUT_FILE, tsContent);
console.log('Successfully generated src/lib/repoData.ts');
