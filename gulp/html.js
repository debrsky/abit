import gulp from 'gulp';

export default function html() {
  return gulp.src(`src/**/*.html`).pipe(gulp.dest(`public`));
}
