import gulp from 'gulp';
import gulpEsbuild from 'gulp-esbuild';
import {commonjs} from '@hyrious/esbuild-plugin-commonjs';

export default function script() {
  return gulp
    .src('src/js/*.js')
    .pipe(
      gulpEsbuild({
        metafile: false, // https://www.bundle-buddy.com/esbuild
        bundle: true,
        minify: false,
        define: {global: 'window'},
        sourcemap: 'linked',
        plugins: [commonjs()]
      })
    )
    .pipe(gulp.dest('./public/js'));
}