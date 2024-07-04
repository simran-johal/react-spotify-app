const fs = require('fs');
const path = require('path');

const isProd = process.argv.includes('--prod')

const configFile = isProd ? 'src/config.prod.js' : 'src/config.dev.js';

const targetFile = 'src/config.js';

fs.copyFileSync(configFile, targetFile); // copies content of chosen config file to config.js

console.log(`Using ${isProd ? 'production' : 'development'} configuration.`)