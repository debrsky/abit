import {fileURLToPath} from 'url';
import {dirname} from 'path';

import gulp from 'gulp';

import clean from './gulp/clean.js';
import html from './gulp/html.js';
import copy from './gulp/copy.js';
import pug2html from './gulp/pug2html.js';
import script from './gulp/script.esbuild.js';
import svelte from './gulp/svelte.esbuild.js';
import serve from './gulp/serve.js';
import less from './gulp/less.js';

import ghPages from './gulp/deploy-to-gh-pages.js';

process.rootDir = dirname(fileURLToPath(import.meta.url));

export default function defaultTask(cb) {
  console.log('default');
  cb();
}

const build = gulp.series(clean, copy, less, html, pug2html, svelte, script);

export const dev = gulp.series(build, serve);
export const deployGh = gulp.series(build, ghPages);

export {
  clean,
  copy,
  less,
  html,
  pug2html,
  svelte,
  script,
  build,
  serve,
  ghPages
};
