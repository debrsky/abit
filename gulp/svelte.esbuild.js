import gulp from 'gulp';
import gulpEsbuild from 'gulp-esbuild';
import sveltePlugin from 'esbuild-svelte';
import {commonjs} from '@hyrious/esbuild-plugin-commonjs';

export default function svelte() {
  return gulp
    .src('src/js/svelte/*.svelte')
    .pipe(
      gulpEsbuild({
        bundle: true,
        minify: false,
        format: 'esm',
        define: {global: 'window'},
        sourcemap: 'external',
        plugins: [commonjs(), sveltePlugin()]
      })
    )
    .pipe(gulp.dest('./public/js/svelte'));
}
