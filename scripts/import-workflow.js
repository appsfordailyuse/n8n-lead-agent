/**
 * Auto-imports the lead-agent workflow into n8n on first deploy
 * Runs automatically via "postinstall" in package.json
 */

const fs = require('fs');
const path = require('path');

const N8N_DIR = process.env.N8N_USER_FOLDER || path.join(require('os').homedir(), '.n8n');
const WORKFLOWS_DIR = path.join(N8N_DIR, 'workflows');
const SOURCE = path.join(__dirname, '..', 'workflow', 'lead-agent.json');
const DEST = path.join(WORKFLOWS_DIR, 'lead-agent.json');

try {
  if (!fs.existsSync(WORKFLOWS_DIR)) {
    fs.mkdirSync(WORKFLOWS_DIR, { recursive: true });
  }
  if (fs.existsSync(SOURCE) && !fs.existsSync(DEST)) {
    fs.copyFileSync(SOURCE, DEST);
    console.log('✅ Workflow imported successfully!');
  } else {
    console.log('ℹ️  Workflow already exists or source not found, skipping import.');
  }
} catch (e) {
  console.log('ℹ️  Could not auto-import workflow:', e.message);
}
