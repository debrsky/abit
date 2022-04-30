import gulp from "gulp";

export default function copy() {
  return gulp
    .src(`src/**/*.ttf`)
    .pipe(gulp.dest(`public`));
}
