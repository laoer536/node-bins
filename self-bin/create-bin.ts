#!/usr/bin/env node
import minimist from 'minimist'
import { red, lightGreen } from 'kolorist'
import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { cwd } from 'node:process'
import consola from 'consola'
import {getFormatCode} from '../utils'
import { copyFileSync } from 'node:fs'
import { readFileSync, writeFileSync } from 'node:fs'
const argv = minimist(process.argv.slice(2))
console.log(argv)
const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(filename, '../../')
const userBinPath = join(filename, '../../', './user-bin')
const userRoot = cwd()

console.log(join(nodeBinRoot, './package.json'))
const isInCommandFileDir = await consola.prompt('你在执行‘create-bin’命令时,是在源码文件所对应的文件夹下？', {
  type: 'confirm',
})

if (isInCommandFileDir) {
  createBin()
    .then(({ binName }) => {
      consola.success(
        lightGreen(
          `您已经成功创建命令${binName},尝试在终端输入${binName},执行您创建的命令，或者您的命令涉及传入参数，当然后面也可以加上您的参数。`
        )
      )
    })
    .catch((err) => {
      consola.error(new Error(`${err}`))
    })
} else {
  console.error(red('请在执行‘create-bin’命令时，保证当前路径是在源码文件所对应的文件夹下'))
}

async function createBin() {
  const binName = await consola.prompt('binName', { type: 'text', placeholder: '请输入您将创建的command名称' })
  const binFileName = await consola.prompt('binFile', { type: 'text', placeholder: '请输入这个command对应的js文件路径' })
  copyFileSync(join(userRoot, binFileName), userBinPath)
  const packageJson = JSON.parse(readFileSync(nodeBinRoot, 'utf-8'))
  packageJson.bin[binName] = `user-bin/` + binFileName
  const binedPackagesJsonStr = await getFormatCode(JSON.stringify(packageJson, null, 2), { parser: 'json' })
  writeFileSync(join(nodeBinRoot, './package.json'), binedPackagesJsonStr)
  return { binName,  }
}
