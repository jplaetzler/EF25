const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to output file
const outputFile = path.join(__dirname, '..', 'linter-issues.log');

try {
  // Run ESLint and capture output
  const lintOutput = execSync('npx eslint src/**/*.{ts,tsx} --format json', { 
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  // Write to file
  fs.writeFileSync(outputFile, lintOutput);
  console.log(`Linter issues written to ${outputFile}`);
} catch (error) {
  // Even when ESLint finds issues, it exits with code 1, so we need to handle this
  if (error.stdout) {
    fs.writeFileSync(outputFile, error.stdout);
    console.log(`Linter issues written to ${outputFile}`);
  } else {
    console.error('Error running ESLint:', error.message);
    fs.writeFileSync(outputFile, JSON.stringify({ error: error.message }, null, 2));
  }
}
