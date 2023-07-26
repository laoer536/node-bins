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

const isInCommandFileDir = await consola.prompt(
  `When you execute the 'create-bin' command, is it in the folder corresponding to the source file?`,
  {
    type: 'confirm',
  }
)

if (isInCommandFileDir) {
  createBin()
    .then(({ binName }) => {
      const logBinColored = lightYellow(binName)
      consola.success(
        lightGreen(
          `You have successfully created the command ${logBinColored},Try typing in the terminal ${logBinColored}, execute the command you created，Or your command involves passing in parameters，of course you can also add your parameters later.`
        )
      )
    })
    .catch((err) => {
      consola.error(new Error(`${err}`))
    })
} else {
  consola.error(
    red(
      `When executing the 'create-bin' command, make sure that the current path is in the folder corresponding to the source file`
    )
  )
}

async function createBin() {
  const binName = await consola.prompt('binName', {
    type: 'text',
    placeholder: 'Please enter the name of the command you will create',
  })
  const binFileName = await consola.prompt('binFile', {
    type: 'text',
    placeholder: `Please enter the name of the js file corresponding to this command (need to include the suffix, and be ".js" or ".ts" or "cjs" or "mjs")`,
  })
  consola.info('Start creating global commands based on your source files....')

  /** build user bin's code **/
  const binFileCode = readFileSync(`${userRoot}/${binFileName}`, 'utf-8')
  writeFileSync(join(buildUserBinRoot, './src/index.ts'), binFileCode)
  const { stdout } = await execaCommand(`${packageManager} run build`, { cwd: buildUserBinRoot })
  console.log(stdout)
  const getBinFileNameWithoutSuffix = (binFileName: string) => {
    const nameArr = binFileName.split('.')
    const suffix = nameArr.pop()
    if (suffix) {
      return nameArr.join('.')
    } else {
      consola.error(new Error(red('The file name entered does not have a suffix (js, ts, cjs, mjs)')))
    }
  }
  const binFileNameWithoutSuffix = getBinFileNameWithoutSuffix(binFileName)
  renameSync(`${buildUserBinRoot}/bin/index.mjs`, `${buildUserBinRoot}/bin/${binFileNameWithoutSuffix}.mjs`)

  /** create user's bin **/
  const packageJson = JSON.parse(readFileSync(join(buildUserBinRoot, './package.json'), 'utf-8'))
  packageJson.bin[binName] = `./bin/${binFileNameWithoutSuffix}.mjs`
  const binedPackagesJsonStr = await getFormatCode(JSON.stringify(packageJson, null, 2), { parser: 'json' })
  writeFileSync(join(buildUserBinRoot, './package.json'), binedPackagesJsonStr)

  /** link bin **/
  const { stdout: linkStdout } = await execaCommand(`${packageManager} run link`, { cwd: buildUserBinRoot })
  return { binName }
}
