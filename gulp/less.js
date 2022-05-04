import gulp from 'gulp';
import gulpLess from 'gulp-less';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';

export default function less() {
  return gulp
    .src('src/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(gulpLess())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename('style.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('./public/css'));
}
