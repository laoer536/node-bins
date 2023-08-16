import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { cwd } from 'node:process'
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

async function run() {
  const { stdout } = await execaCommand(`npm install`, {
    cwd: buildUserBinRoot,
  })
  return stdout
}

run()
  .then((stdout) => {
    consola.success('Your command source code is packaged!')
  })
  .catch((err) => {
    consola.error(new Error(`${err}`))
  })
