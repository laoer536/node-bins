import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { cwd } from 'node:process'
import { readFileSync, writeFileSync } from 'node:fs'
import { execaCommand } from 'execa'
import consola from 'consola'

// @ts-ignore
import { getFormatCode } from '../../dist/utils/index.mjs'

export interface PackageJson {
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
  bin: { [key: string]: string }
  [key: string]: string | { [key: string]: string }
}

const filename = fileURLToPath(import.meta.url)
const buildUserBinRoot = join(filename, '../../')
const userRoot = cwd()

function getMainInfoUserPackagejson() {
  const userPackageJson = JSON.parse(readFileSync(join(userRoot, 'package.json'), 'utf-8')) as PackageJson
  const buildUserBinPackageJson = JSON.parse(
    readFileSync(join(buildUserBinRoot, 'package.json'), 'utf-8')
  ) as PackageJson
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
}

run()
  .then((stdout) => {
    consola.success('Your command source code is packaged!')
  })
  .catch((err) => {
    consola.error(new Error(`${err}`))
  })
