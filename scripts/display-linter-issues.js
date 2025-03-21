import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const issuesFile = path.join(__dirname, '..', 'linter-issues.json');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  bold: '\x1b[1m'
};

try {
  // Check if file exists
  if (!fs.existsSync(issuesFile)) {
    console.log(`${colors.red}No linter issues file found. Run 'npm run lint:file' first.${colors.reset}`);
    process.exit(1);
  }

  // Read and parse the issues file
  const issuesData = fs.readFileSync(issuesFile, 'utf8');
  const lintResults = JSON.parse(issuesData);
  
  // Count total issues
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFiles = 0;
  
  lintResults.forEach(result => {
    if (result.errorCount > 0 || result.warningCount > 0) {
      totalFiles++;
      totalErrors += result.errorCount;
      totalWarnings += result.warningCount;
    }
  });
  
  // Display summary
  console.log(`\n${colors.bold}ESLint Results Summary:${colors.reset}`);
  console.log(`${colors.bold}Files with issues:${colors.reset} ${totalFiles}`);
  console.log(`${colors.bold}Total errors:${colors.reset} ${totalErrors > 0 ? colors.red + totalErrors + colors.reset : totalErrors}`);
  console.log(`${colors.bold}Total warnings:${colors.reset} ${totalWarnings > 0 ? colors.yellow + totalWarnings + colors.reset : totalWarnings}`);
  
  // Sort files by number of issues (most issues first)
  const sortedResults = [...lintResults]
    .filter(result => result.errorCount > 0 || result.warningCount > 0)
    .sort((a, b) => {
      const aTotal = a.errorCount + a.warningCount;
      const bTotal = b.errorCount + b.warningCount;
      return bTotal - aTotal;
    });
  
  // Display details for each file with issues
  if (sortedResults.length > 0) {
    console.log(`\n${colors.bold}Issue Details:${colors.reset}`);
    
    sortedResults.forEach(file => {
      // Create a relative path for better readability
      const relativePath = path.relative(path.join(__dirname, '..'), file.filePath);
      
      console.log(`\n${colors.cyan}${relativePath}${colors.reset} (${file.errorCount > 0 ? colors.red + file.errorCount + ' errors' + colors.reset : '0 errors'}, ${file.warningCount > 0 ? colors.yellow + file.warningCount + ' warnings' + colors.reset : '0 warnings'})`);
      
      // Display each message
      file.messages.forEach(msg => {
        const issueType = msg.severity === 2 ? `${colors.red}Error${colors.reset}` : `${colors.yellow}Warning${colors.reset}`;
        const lineCol = `${colors.blue}${msg.line}:${msg.column}${colors.reset}`;
        console.log(`  ${issueType} at ${lineCol}: ${msg.message} (${msg.ruleId || 'no rule'})`);
      });
    });
  } else {
    console.log(`\n${colors.green}No linter issues found. All files are clean!${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}Error reading or parsing linter issues:${colors.reset}`, error);
}
