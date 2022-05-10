import gulp from 'gulp';

export default function copy() {
  return gulp.src(`src/**/*.{ttf,json,txt}`).pipe(gulp.dest(`public`));
}
