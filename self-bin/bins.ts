import minimist from 'minimist'
import { green, red, yellow } from 'kolorist'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'pathe'
import { readFileSync } from 'node:fs'

const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(dirname(filename), '../..')
const buildUserBinRoot = join(nodeBinRoot, './build-user-bin')

enum CommandArgumentList {
  'help' = '--help',
  'list' = '--list',
}
const userCommandArgument = minimist<Record<keyof typeof CommandArgumentList, boolean>>(process.argv.slice(2))
if (userCommandArgument.help) {
  console.log(`${green('✨ node-bins help tip:')}
  Here are some built-in commands to choose from.
  🎈 1. ${yellow(`bins ${CommandArgumentList.help}`)}: Display Help Information.
  🎈 2. ${yellow(`bins ${CommandArgumentList.list}`)} : Check which commands are currently managed by node-bins.
  `)
} else if (userCommandArgument.list) {
  const userBinsJsonInfo = JSON.parse(readFileSync(join(buildUserBinRoot, 'user-bins.json'), 'utf-8')) as Record<
    string,
    string
  >
  const userBins = Object.entries(userBinsJsonInfo)
  if (userBins.length) {
    const coloredBinName = userBins.map(
      ([binName, binDescription], index) => `${index + 1}. ${yellow(binName)}: ${green(binDescription)}`
    )
    console.log('You have currently created the following commands in node bins:\n' + coloredBinName.join(' \n '))
  } else {
    throw red('Error: You have not yet created a new command in node-bins.')
  }
} else {
  throw red('Error: This parameter is not recognized. Please check your command.')
}
