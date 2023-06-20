import { defineBuildConfig } from 'unbuild'
const outDir = './dist'
export default defineBuildConfig({
  entries: [
    {
      input: './self-bin/',
      outDir: `${outDir}/self-bin`,
    },
    {
      input: './utils/',
      outDir: `${outDir}/utils`,
    },
  ],
  rollup: {
    esbuild: {
      minify: true,
    },
  },
})
