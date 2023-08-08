#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import { join } from 'pathe'
import { execaCommandSync } from 'execa'
import { green } from 'kolorist'
const filename = fileURLToPath(import.meta.url)
const nodeBinRoot = join(filename, '../../')
const userPackageRoot = join(nodeBinRoot, './build-user-bin')
execaCommandSync('npm install', { cwd: userPackageRoot })
console.log(green(`Welcome to node-bins, a nodejs script manager.`))
