import gulp from 'gulp';
import browserSync from 'browser-sync';

import copy from './copy.js';
import html from './html.js';
import pug2html from './pug2html.js';
import svelte from './svelte.esbuild.js';
import script from './script.esbuild.js';
import less from './less.js';

const server = browserSync.create();

function readyFullReload(cb) {
  console.log('reloading...');
  server.reload();
  cb(null);
}

// eslint-disable-next-line
function readyStyleReload() {
  return less().pipe(server.stream());
}

export default function serve() {
  server.init({
    server: `public/`,
    notify: false,
    open: true,
    cors: true,
    ghostMode: false,
    // ui: false
    ui: {
      port: 3080
    }
  });

  gulp.watch(`src/**/*.{ttf,json,txt}`, gulp.series(copy, readyFullReload));
  gulp.watch(`src/**/*.html`, gulp.series(html, readyFullReload));
  gulp.watch(
    `src/js/svelte/**/*.{svelte,js}`,
    gulp.series(svelte, readyFullReload)
  );
  gulp.watch(
    [
      `src/js/**/*.{js,svelte}`,
      'src/pug/includes/**/*.pug',
      'src/pug/templates/**/*.pug'
    ],
    gulp.series(script, readyFullReload)
  );
  gulp.watch(`src/**/*.pug`, gulp.series(pug2html, readyFullReload));
  // gulp.watch(`src/pages/**/*.pug`, gulp.series(pages, readyFullReload));

  // gulp.watch(`src/css/**/*.css`, gulp.series(style, readyStyleReload));
  gulp.watch(`src/less/**/*.less`, readyStyleReload);

  // gulp.watch(`src/js/**/*.js`, gulp.series(script, readyFullReload));
  // gulp.watch(`src/img/**/!(*.svg)`, gulp.series(copy, readyFullReload));
  // gulp.watch(
  //   `src/img/**/*.svg`,
  //   gulp.series(svg, html, pug2html, readyFullReload)
  // );
}
