import { writeFileSync, readFileSync, readdirSync } from 'node:fs'
const selfBinsFiles = readdirSync('dist/self-bin')
function addNodeEnv(fileName: string) {
  const distCode = readFileSync(`./dist/self-bin/${fileName}`, 'utf-8')
  writeFileSync(`./dist/self-bin/${fileName}`, '#!/usr/bin/env node\n' + distCode, 'utf-8')
}

selfBinsFiles.forEach((binFileName) => {
  addNodeEnv(binFileName)
})
