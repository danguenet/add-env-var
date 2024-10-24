#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import inquirer from 'inquirer';

const program = new Command();

program
  .name('add-env-var')
  .description('Add environment variables to .env files')
  .version('1.2.0')
  .arguments('<variables...>')
  .option('-l, --length <number>', 'Length of the generated secret in bytes', parseInt)
  .option('-f, --file <filepath>', 'Specify the env file to use', '.env')
  .option('-e, --encoding <type>', 'Specify encoding: hex, base64, base64url', 'hex')
  .action(async (variables, options) => {
    const length = options.length || 32;
    const encoding = options.encoding || 'hex';
    const envFile = options.file || '.env';
    const envPath = path.join(process.cwd(), envFile);

    let envContent = '';

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    } else {
      fs.writeFileSync(envPath, '');
    }

    const envVars = {};

    envContent.split('\n').forEach((line) => {
      const [key, val] = line.split('=');
      if (key) {
        envVars[key.trim()] = val ? val.trim() : '';
      }
    });

    for (const variable of variables) {
      let [varName, varValue] = variable.split('=');

      if (envVars.hasOwnProperty(varName)) {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `Variable ${varName} already exists in ${envFile}. Overwrite?`,
            default: false,
          },
        ]);

        if (!overwrite) {
          continue;
        }
      }

      if (!varValue) {
        // Generate a random secret
        const randomBytes = crypto.randomBytes(length);

        switch (encoding.toLowerCase()) {
          case 'base64':
            varValue = randomBytes.toString('base64');
            break;
          case 'base64url':
            // Node.js v14.18.0 and above support 'base64url' encoding
            varValue = randomBytes.toString('base64url');
            break;
          case 'hex':
          default:
            varValue = randomBytes.toString('hex');
            break;
        }
      }

      envVars[varName] = varValue;
    }

    // Write the updated env file
    const newEnvContent = Object.entries(envVars)
      .map(([key, val]) => `${key}=${val}`)
      .join('\n');

    fs.writeFileSync(envPath, newEnvContent);

    console.log(`Updated ${envPath} successfully.`);
  });

program.parse(process.argv);
