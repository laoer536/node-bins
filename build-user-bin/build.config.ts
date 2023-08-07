import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: ['./src/index'],
  outDir: 'bin',
  clean: false,
  failOnWarn: false,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
})
