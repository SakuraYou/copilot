import semverCoerce from 'semver/functions/coerce'
import semverLt from 'semver/functions/lt'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import os from 'os'
import { isSafeToCreateProjectIn } from './utils'

export function createApp(name: string, template: string) {
  const unsupportedNodeVersion = !semverLt('14.0.0',
    semverCoerce(process.version)
  )

  if (unsupportedNodeVersion) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to Node 14 or higher for a better, fully supported experience.\n`
      )
    )
  }

  const root = path.resolve(name)
  const appName = path.basename(root)

  fs.ensureDirSync(name)

  isSafeToCreateProjectIn(root, name)

  console.log()

  console.log(`Creating a new React app in ${chalk.green(root)}.`)
  console.log()

  const packageJson = {
    name: appName,
    version: '1.0.0',
    private: true,
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  const originalDirectory = process.cwd()
  process.chdir(root)

  run({
    root,
    name: appName,
    template,
    originalDirectory,
  })
}

async function run({
  root,
  name,
  template,
  originalDirectory
}: {
  root: string
  name: string
  template: string
  originalDirectory: string
}) {
  
}
