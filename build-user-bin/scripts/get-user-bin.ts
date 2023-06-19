import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { cwd } from 'node:process'
import { readFileSync, writeFileSync } from 'node:fs'
import { execaCommand } from 'execa'
import consola from 'consola'

// @ts-ignore
import { getFormatCode, getPackageManager } from '../../dist/utils/index.mjs'

interface PackageJson {
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
  [key: string]: string | { [key: string]: string }
}

const filename = fileURLToPath(import.meta.url)
const buildUserBinRoot = join(filename, '../../')
const userRoot = cwd()
const packageManager = getPackageManager()

function getMainInfoUserPackagejson() {
  const userPackageJson = JSON.parse(readFileSync(`${userRoot}/package.json`, 'utf-8')) as PackageJson
  const buildUserBinPackageJson = JSON.parse(readFileSync(`${buildUserBinRoot}/package.json`, 'utf-8')) as PackageJson
  const { dependencies = {}, devDependencies = {} } = userPackageJson
  const userDependencies = { dependencies, devDependencies }

  let key: keyof typeof userDependencies
  for (key in userDependencies) {
    for (const dependencie in userDependencies[key]) {
      buildUserBinPackageJson[key][dependencie] = dependencie
    }
  }
  return { buildUserBinPackageJson }
}

async function writeUserpackagejsonIn() {
  const { buildUserBinPackageJson } = getMainInfoUserPackagejson()
  const binedPackagesJsonStr = await getFormatCode(JSON.stringify(buildUserBinPackageJson, null, 2), { parser: 'json' })
  writeFileSync(join(buildUserBinRoot, './package.json'), binedPackagesJsonStr)
}

async function run() {
  await writeUserpackagejsonIn()
  const commandList = [
    {
      command: () => execaCommand(`${packageManager} install`, { cwd: buildUserBinRoot }),
      info: '开始下载你源码需要用到的依赖项...',
    },
    {
      command: () => execaCommand(`${packageManager} unbuild`, { cwd: buildUserBinRoot }),
      info: '开始build你的nodejs源码...',
    },
  ]
  for (const command of commandList) {
    await command.command()
    consola.info(command.info)
  }
}

run()
  .then(() => {
    consola.success('你的命令源码打包完成！')
  })
  .catch((err) => {
    consola.error(new Error(`${err}`))
  })
