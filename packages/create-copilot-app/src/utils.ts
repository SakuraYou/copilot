import path from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';

export function getPackageJson(): Record<string, any> {
  return require(path.resolve(__dirname, '../package.json'));
}

export function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'docs',
    'LICENSE',
    'README.md',
    'mkdocs.yml',
    'Thumbs.db',
  ];
  
  const errorLogFilePatterns = [
    'npm-debug.log',
    'yarn-error.log',
    'yarn-debug.log',
    'pnpm-error.log'
  ]

  const isErrorLog = (file) => {
    return errorLogFilePatterns.some(pattern => file.startWith(pattern))
  }
  
  // check files 
  const conflicts = fs.readdirSync(root).filter(file => !validFiles.includes(file)).filter(file => !isErrorLog(file));
  if (conflicts.length > 0) {
    console.log(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    );
    console.log();

    for(const file of conflicts) {
      try {
        const stats = fs.lstatSync(fs.json(root, file));
        if (stats.isDirectory()) {
          console.log(` ${chalk.blue(`${file}/`)}`)
        } else {
          console.log(`  ${file}`);
        }
      } catch (error) {
        console.log(`  ${file}`);
      }
    }

    console.log();
    console.log(
      'Either try using a new directory name, or remove the files listed above.'
    );
    
    return false;
  }

  fs.readdirSync(root).forEach((file) => {
    if (isErrorLog(file)) {
      fs.removeSync(path.join(root, file));
    }
  })

  return true;
}
