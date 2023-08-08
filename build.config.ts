import { defineBuildConfig } from 'unbuild'
const outDir = './dist'
export default defineBuildConfig({
  clean: true,
  entries: [
    {
      input: './self-bin/',
      outDir: `${outDir}/self-bin`,
    },
    {
      input: './utils/',
      outDir: `${outDir}/utils`,
    },
    {
      input: './scripts/user-package-install',
    },
  ],
  rollup: {
    esbuild: {
      minify: true,
    },
  },
})
