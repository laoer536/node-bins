import { format, resolveConfig } from 'prettier'
import type { Config } from 'prettier'

export async function getFormatCode(code: string, prettierConfig: Config) {
  if (prettierConfig) {
    return format(code, prettierConfig)
  } else {
    const options = (await resolveConfig('')) || {}
    return format(code, options)
  }
}

export function getPackageManager(npm_execpath = process.env.npm_execpath) {
  if (!npm_execpath) {
    throw `Should use 'yarn' or 'pnpm' or 'npm' to run.`
  }
  const packageManagerList: ['yarn', 'pnpm', 'npm'] = ['yarn', 'pnpm', 'npm']
  let userPackageManager: 'yarn' | 'pnpm' | 'npm' | undefined
  for (const packageManager of packageManagerList) {
    if (npm_execpath.includes(packageManager)) {
      userPackageManager = packageManager
    }
  }
  if (!userPackageManager) {
    throw `Can't find this packageManager. Should use 'yarn' or 'pnpm' or 'npm' to run.`
  }
  return userPackageManager
}
