#!/usr/bin/env node
// import minimist from 'minimist'
import { red, lightGreen, lightYellow } from 'kolorist'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'pathe'
import { cwd } from 'node:process'
import consola from 'consola'
import { readFileSync, writeFileSync, renameSync } from 'node:fs'
import { execaCommand } from 'execa'
import { getPackageManager, getFormatCode } from '../utils'

const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(filename, '../../..')
const buildUserBinRoot = join(nodeBinRoot, './build-user-bin')
const userBinRoot = join(nodeBinRoot, './dist/user-bin')
const userRoot = cwd()
const packageManager = getPackageManager()

const isInCommandFileDir = await consola.prompt('你在执行‘create-bin’命令时,是在源码文件所对应的文件夹下？', {
  type: 'confirm',
})

if (isInCommandFileDir) {
  createBin()
    .then(({ binName }) => {
      const logBinColored = lightYellow(binName)
      consola.success(
        lightGreen(
          `您已经成功创建命令${logBinColored},尝试在终端输入${logBinColored},执行您创建的命令，或者您的命令涉及传入参数，当然后面也可以加上您的参数。`
        )
      )
    })
    .catch((err) => {
      consola.error(new Error(`${err}`))
    })
} else {
  consola.error(red('请在执行‘create-bin’命令时，保证当前路径是在源码文件所对应的文件夹下'))
}

async function createBin() {
  const binName = await consola.prompt('binName', { type: 'text', placeholder: '请输入您将创建的command名称' })
  const binFileName = await consola.prompt('binFile', {
    type: 'text',
    placeholder: '请输入这个command对应的js文件名称（需要包含后缀，且为".js"或者".ts"）',
  })
  consola.info('开始根据你的源码文件，创建全局命令....')

  /** build user bin's code **/
  const binFileCode = readFileSync(`${userRoot}/${binFileName}`, 'utf-8')
  writeFileSync(join(buildUserBinRoot, './src/index.ts'), binFileCode)
  const { stdout } = await execaCommand(`${packageManager} run build`, { cwd: buildUserBinRoot })
  console.log(stdout)
  renameSync(`${userBinRoot}/index.mjs`, `${userBinRoot}/${binFileName}`)

  /** create user's bin **/
  const packageJson = JSON.parse(readFileSync(join(nodeBinRoot, './package.json'), 'utf-8'))
  packageJson.bin[binName] = `dist/user-bin/` + binFileName
  const binedPackagesJsonStr = await getFormatCode(JSON.stringify(packageJson, null, 2), { parser: 'json' })
  writeFileSync(join(nodeBinRoot, './package.json'), binedPackagesJsonStr)

  /** link bin **/
  const { stdout: linkStdout } = await execaCommand(`npm link`, { cwd: nodeBinRoot })
  console.log(linkStdout)
  return { binName }
}
