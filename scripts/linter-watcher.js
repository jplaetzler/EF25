import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFile = path.join(__dirname, '..', 'linter-issues.json');

// Set interval in ms (e.g., check every 5 seconds)
const INTERVAL = 5000;

// Function to run ESLint
function runLinter() {
  console.log('Checking for linter issues...');
  
  exec('npx eslint . --format json', { 
    encoding: 'utf-8',
    maxBuffer: 1024 * 1024 // Increase buffer to handle large outputs
  }, (error, stdout, stderr) => {
    if (stderr) {
      console.error('Error:', stderr);
      return;
    }
    
    // Write output to file
    fs.writeFileSync(outputFile, stdout);
    
    // Parse JSON to count issues
    try {
      const lintResults = JSON.parse(stdout);
      let errorCount = 0;
      let warningCount = 0;
      
      lintResults.forEach(result => {
        errorCount += result.errorCount;
        warningCount += result.warningCount;
      });
      
      if (errorCount > 0 || warningCount > 0) {
        console.log(`Found ${errorCount} errors and ${warningCount} warnings. See ${outputFile} for details.`);
      } else {
        console.log('No linter issues found.');
      }
    } catch (e) {
      console.error('Error parsing linter output:', e);
    }
  });
}

// Initial run
runLinter();

// Set up interval
console.log(`Linter watcher started. Checking every ${INTERVAL/1000} seconds...`);
setInterval(runLinter, INTERVAL);

// Also watch for file changes
fs.watch(path.join(__dirname, '..', 'src'), { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.ts') || filename.endsWith('.tsx'))) {
    console.log(`File ${filename} changed, running linter...`);
    runLinter();
  }
});
