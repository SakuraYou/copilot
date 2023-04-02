#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import semver from 'semver';
import { getPackageJson,  } from './utils';
import { checkForLatestVersion } from './check';
import { createApp } from './create-app';

const packageJson = getPackageJson();

async function init() {
  const program = new Command();
  let projectName = 'my-app';

  program
    .name('create-copilot-app')
    .description('CLI to create a copilot app')
    .version(getPackageJson().version);

  program.usage(`${chalk.green('<project-directory>')} [options]`)

  program.command('create-copilot-app <project>')
    .description('Create a react project')
    .action((name) => {
      projectName = name;
    })

  program.option('--template <template type>', 'specify a template for the created project')
  program.parse(process.argv);
  
  const options = program.opts();

  try {
    // check registry version
    const latest = await checkForLatestVersion();

    if (latest && semver.lt(packageJson.version, latest)) {
      console.log();
      console.log(chalk.yellow(`You are running \`create-copilot-app\` ${packageJson.version}, which is behind the latest release (${latest}).\n\n`))
    } else {
      createApp(projectName, options.template);
    }
  } catch (error) {
    console.log('error =====', error);
  }
}

init();