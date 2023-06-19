import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { readFileSync, writeFileSync } from 'node:fs'

const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(filename, '../../')
const createBinCode = readFileSync(join(nodeBinRoot, './dist/self-bin/create-bin.mjs'), 'utf-8')
createBinCode.replace('../utils', '../utils/index.mjs')
writeFileSync(join(nodeBinRoot, './dist/self-bin/create-bin.mjs'), createBinCode)
