#!/usr/bin/env node
import minimist from 'minimist'
import { white, red, bgLightGreen } from 'kolorist'
import { $ } from 'execa'
import consola from 'consola'
const argv = minimist(process.argv.slice(2))
const forcePushBranch = argv._[0]

async function run(forcePushBranch: string) {
  if (forcePushBranch) {
    consola.info(`Start pushing the current branch to${forcePushBranch}...`)
    await $`git push origin --delete ${forcePushBranch}`
    await $`git branch -D ${forcePushBranch}`
    await $`git branch -c ${forcePushBranch}`
    await $`git push origin ${forcePushBranch}`
  } else {
    consola.error(red('The branch to which it will be pushed does not detect a value'))
  }
}

run(forcePushBranch).then(() => {
  consola.success(bgLightGreen(`${white('Push succeeded!')}`))
})
