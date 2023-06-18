import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { cwd } from 'node:process'
import { readFileSync, writeFileSync } from 'node:fs'
import { getFormatCode, getPackageManager } from '../../utils'
import { $ } from 'execa'

interface PackageJson {
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
}

const filename = fileURLToPath(import.meta.url)
const buildUserBinRoot = join(filename, '../')
const userRoot = cwd()
const packageManager = getPackageManager()

const userPackageJson = JSON.parse(readFileSync(`${userRoot}/package.json`, 'utf-8')) as PackageJson
const buildUserBinPackageJson = JSON.parse(readFileSync(`${buildUserBinRoot}/package.json`, 'utf-8')) as PackageJson
let key: keyof PackageJson
for (key in userPackageJson) {
  for (const dependencie in userPackageJson[key]) {
    buildUserBinPackageJson[key][dependencie] = dependencie
  }
}
const binedPackagesJsonStr = await getFormatCode(JSON.stringify(buildUserBinPackageJson, null, 2), { parser: 'json' })
writeFileSync(join(buildUserBinRoot, './package.json'), binedPackagesJsonStr)
const commandList = [$`${packageManager} install`, $`${packageManager} build`]
