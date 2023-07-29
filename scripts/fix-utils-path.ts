import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(filename, '../../')
const needDealFiles = readdirSync(join(nodeBinRoot, './dist/self-bin'))
needDealFiles.forEach((filename) => {
  const createBinCode = readFileSync(join(nodeBinRoot, `./dist/self-bin/${filename}`), 'utf-8')
  const fixCode = createBinCode.replace('../utils', '../utils/index.mjs')
  writeFileSync(join(nodeBinRoot, `./dist/self-bin/${filename}`), fixCode)
})
