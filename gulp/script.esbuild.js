import gulp from 'gulp';
import gulpEsbuild from 'gulp-esbuild';
import {commonjs} from '@hyrious/esbuild-plugin-commonjs';
import pug from 'pug';
import fs from 'fs';

const pugPlugin = () => ({
  name: 'pug',
  setup(build) {
    build.onLoad({filter: /\.pug$/}, async (args) => {
      const source = await fs.promises.readFile(args.path, 'utf8');

      const pugFnStr = pug.compileClient(source, {});
      const contents = pugFnStr + '\nexport default template;';
      return {contents};
    });
  }
});

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
        plugins: [commonjs(), pugPlugin()]
      })
    )
    .pipe(gulp.dest('./public/js'));
}
