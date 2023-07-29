import { fileURLToPath } from 'node:url'
import { dirname, join } from 'pathe'
import minimist from 'minimist'
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import type { PackageJson } from '../build-user-bin/scripts/get-user-bin'
import { getFormatCode } from '../utils'
import { red } from 'kolorist'

const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(dirname(filename), '../..')
const buildUserBinRoot = join(nodeBinRoot, './build-user-bin')

const [deleteBin] = minimist(process.argv.slice(2))._
const userBinsJsonInfo = JSON.parse(readFileSync(join(buildUserBinRoot, 'user-bins.json'), 'utf-8')) as Record<
  string,
  string
>
if (!userBinsJsonInfo[deleteBin]) {
  throw red(`Error: You haven't created this command in 'node-bins' and can't delete it.`)
}

deleteBinFn()
  .then(updateUserBinsInfo)
  .catch((err) => {
    console.log(red(`Error: ${err}`))
  })

/** delete bin and bin file **/
async function deleteBinFn() {
  const userPackageInfo = JSON.parse(readFileSync(join(buildUserBinRoot, 'package.json'), 'utf-8')) as PackageJson
  const binObj = userPackageInfo.bin
  unlinkSync(join(buildUserBinRoot, binObj[deleteBin]))
  delete userPackageInfo[deleteBin]
  const formatCode = await getFormatCode(JSON.stringify(userPackageInfo), { parser: 'json' })
  writeFileSync(join(buildUserBinRoot, 'package.json'), formatCode)
}

/** update user bins info json **/
async function updateUserBinsInfo() {
  delete userBinsJsonInfo[deleteBin]
  const formatCode = await getFormatCode(JSON.stringify(userBinsJsonInfo), { parser: 'json' })
  writeFileSync(join(buildUserBinRoot, 'user-bins.json'), formatCode)
}
