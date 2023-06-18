import { defineBuildConfig } from 'unbuild'
const outDir = '../dist/user-bin/'
export default defineBuildConfig({
  entries: ['./src/index'],
  outDir,
  clean: false,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
})
