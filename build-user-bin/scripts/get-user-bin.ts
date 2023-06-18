import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { cwd } from 'node:process'
import { readFileSync, writeFileSync } from 'node:fs'
import { getFormatCode, getPackageManager } from '../../utils'
import { $ } from 'execa'
import consola from 'consola'

interface PackageJson {
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
  [key: string]: string | { [key: string]: string }
}

const filename = fileURLToPath(import.meta.url)
const buildUserBinRoot = join(filename, '../')
const userRoot = cwd()
const packageManager = getPackageManager()

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
const binedPackagesJsonStr = await getFormatCode(JSON.stringify(buildUserBinPackageJson, null, 2), { parser: 'json' })
writeFileSync(join(buildUserBinRoot, './package.json'), binedPackagesJsonStr)
const commandList = [$`${packageManager} install`, $`${packageManager} build`]

for (const command of commandList) {
  const { stdout } = await command
  consola.info(stdout)
}
