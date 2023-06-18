import { format, resolveConfig } from 'prettier'
import type {Config} from "prettier";

export async function getFormatCode(code:string, prettierConfig:Config) {
  if (prettierConfig) {
    return format(code, prettierConfig)
  } else {
    const options = (await resolveConfig('')) || {}
    return format(code, options)
  }
}
