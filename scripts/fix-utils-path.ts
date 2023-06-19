import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { readFileSync, writeFileSync } from 'node:fs'

const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(filename, '../../')
console.log(join(nodeBinRoot, './dist/self-bin/create-bin.mjs'))
const createBinCode = readFileSync(join(nodeBinRoot, './dist/self-bin/create-bin.mjs'), 'utf-8')
const fixCode = createBinCode.replace('../utils', '../utils/index.mjs')
writeFileSync(join(nodeBinRoot, './dist/self-bin/create-bin.mjs'), fixCode)
