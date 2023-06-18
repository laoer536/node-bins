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
    {
      input: './build-user-bin/scripts/',
      outDir: `${outDir}/build-user-bin/scripts`,
    },
    {
      input: './build-user-bin/src/',
      outDir: `${outDir}/build-user-bin/src`,
    },
  ],
  rollup: {
    esbuild: {
      minify: true,
    },
  },
})
