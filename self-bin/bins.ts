import minimist from 'minimist'
import { green, red, yellow } from 'kolorist'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'pathe'
import { readFileSync } from 'node:fs'
import type { PackageJson } from '../build-user-bin/scripts/get-user-bin'

const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(dirname(filename), '..')
const buildUserBinRoot = join(nodeBinRoot, './build-user-bin')

enum CommandArgumentList {
  'help' = '--help',
  'list' = '--list',
}
const userCommandArgument = minimist<Record<keyof typeof CommandArgumentList, boolean>>(process.argv.slice(2))
if (userCommandArgument.help) {
  console.log(`${green('✨ node-bins help tip:')}
  Here are some built-in commands to choose from.
  🎈 1. ${yellow('bins --help')}: Display Help Information.
  🎈 2. ${yellow('bins --list')} : Check which commands are currently managed by node-bins.
  `)
} else if (userCommandArgument.list) {
  const userBinsJsonInfo = JSON.parse(readFileSync(join(buildUserBinRoot, 'package.json'), 'utf-8')) as PackageJson
  const userBins = Object.keys(userBinsJsonInfo.bin)
  if (userBins.length) {
    const coloredBinName = userBins.map((binName) => yellow(binName))
    console.log('You have currently created the following commands in node bins:\n' + coloredBinName.join(' | '))
  } else {
    throw red('Error: You have not yet created a new command in node-bins.')
  }
} else {
  throw red('Error: This parameter is not recognized. Please check your command.')
}
