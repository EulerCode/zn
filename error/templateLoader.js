// templateLoader.js
const fs = require('fs');
const path = require('path');

function loadTemplate(templateName, data) {
  const templatePath = path.join(__dirname, `${templateName}.html`);
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  return templateContent.replace(/{{([^{}]*)}}/g, (match, p1) => data[p1.trim()]);
}

module.exports = loadTemplate;
