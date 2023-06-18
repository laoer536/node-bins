#!/usr/bin/env node
import minimist from 'minimist'
import { white, red, bgLightGreen } from 'kolorist'
import { $ } from 'execa'
import consola from 'consola'
const argv = minimist(process.argv.slice(2))
const forcePushBranch = argv._[0]
if (forcePushBranch) {
  consola.info(`开始push当前分支到${forcePushBranch}...`)
  await $`git push origin --delete ${forcePushBranch}`
  await $`git branch -D ${forcePushBranch}`
  await $`git branch -c ${forcePushBranch}`
  await $`git push origin ${forcePushBranch}`
  consola.success(bgLightGreen(`${white('push成功!')}`))
} else {
  consola.error(red('将要push到的Branch未检测到值'))
}
