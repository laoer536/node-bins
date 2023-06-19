import prettier from 'prettier'
import type { Config } from 'prettier'

const { format, resolveConfig } = prettier
export async function getFormatCode(code: string, prettierConfig: Config) {
  if (prettierConfig) {
    return format(code, prettierConfig)
  } else {
    const options = (await resolveConfig('')) || {}
    return format(code, options)
  }
}

export function getPackageManager(npm_execpath = process.env.npm_execpath || 'npm') {
  const packageManagerList: ['yarn', 'pnpm', 'npm'] = ['yarn', 'pnpm', 'npm']
  let userPackageManager: 'yarn' | 'pnpm' | 'npm' = 'npm'
  for (const packageManager of packageManagerList) {
    if (npm_execpath.includes(packageManager)) {
      userPackageManager = packageManager
      break
    }
  }
  return userPackageManager
}
