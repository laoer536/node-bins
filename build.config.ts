import { defineBuildConfig } from 'unbuild'
const outDir = './dist'
export default defineBuildConfig({
  entries: [
    {
      input: './self-bin/',
      outDir: `${outDir}/self-bin`,
    },
    {
      input: './user-bin/',
      outDir: `${outDir}/user-bin`,
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
