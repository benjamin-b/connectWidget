var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    sass      = require('gulp-sass'),
    cssmin    = require('gulp-cssmin'),
    uglify    = require('gulp-uglifyjs'),
    svgSprite = require('gulp-svg-sprites');
    rename    = require('gulp-rename');

gulp.task('webserver', function() {
    connect.server({
      port: 9898,
      livereload: true
    });
});
gulp.task('sprites', function () {
  console.log("Im in");
    return gulp.src('images/svg/*.svg')
        .pipe(svgSprite({
            selector: "lssvg-%f",
            svg: {
                sprite: "svg.svg"
            },
            preview: {
                sprite: "index.html"
            }
        }))
        .pipe(gulp.dest("./svg/"));
});
gulp.task('sass', function () {
  gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '-min'}))
    .pipe(cssmin())
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});
gulp.task('script', function () {
  gulp.src('./scripts/*.js')
    .pipe(gulp.dest('./scripts'))
    // .pipe(rename({suffix: '-min'}))
    // .pipe(uglify())
    // .pipe(gulp.dest('./scripts'))
    .pipe(connect.reload());
});


gulp.task('watch',function(){
  gulp.watch(['scss/**/*.scss'],['sass']);
  gulp.watch(['*.html'],['html']);
  gulp.watch(['scripts/*.js'],['script']);
});

gulp.task('default',['sass','html','script', 'webserver','watch', 'sprites']);
