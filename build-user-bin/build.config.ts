import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      outDir: `bin`,
    },
  ],
  clean: false,
  failOnWarn: false,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
})
