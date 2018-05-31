var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanDest = require('gulp-clean-dest');
var imageMin = require('gulp-imagemin');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var browserSync = require('browser-sync');
var sequence = require('run-sequence');

var config = {

    cssIn: [
        'src/*.less',
        'src/start-template.css'
    ],
    cssOut:'build/css',
    cssFileName: 'styles.min.css',
    jsIn: [
        'src/app1.js',
        'src/app2.js'
    ],
    htmlIn: [
        'src/index.html',
    ],
    htmlOut: 'build',
    imageIn: 'src/img/*.png',
    imageOut: 'build/img',
    jsFileName:'app.min.js',
    jsOut:'build/js',
    jsOutExt: '.js',
    uglifyConfig: {
        compress: {
            drop_console:true
        },
        mangle: false,
        output: {
            beautify: false,
            comments: false 
        }
    }

};

gulp.task('default', function() {
    return del('build');
});

gulp.task('clean', function() {
    return del('build');
});

gulp.task('css', function(){
    return gulp.src(config.cssIn)
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(concat(config.cssFileName))
      .pipe(gulp.dest(config.cssOut))
});

gulp.task('js', function(cb){
    return gulp.src(config.jsIn)
        .pipe(cleanDest(config.jsOut, {
            extension: config.jsOutExt
        }))
        .pipe(sourcemaps.init())
        .pipe(concat(config.jsFileName))
        .pipe(uglify(config.uglifyConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.jsOut))
});

gulp.task('image',function(){

    return gulp.src(config.imageIn)
    .pipe(imageMin())
        .pipe(gulp.dest(config.imageOut))
});

gulp.task('html',function(){

    return gulp.src(config.htmlIn)
    .pipe(htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
        removeComments: true
      }))
        .pipe(gulp.dest(config.htmlOut))
});

/*
gulp.task('reload', function() {
    browserSync.reload();
  });
  
  gulp.task('serve', ['sass'], function() {
    browserSync({
      server: config.src
    });
  
    gulp.watch([config.htmlin, config.jsin], ['reload']);
    gulp.watch(config.scssin, ['sass']);
  });
*/
  
/*
gulp.task('compress', function (cb) {
    pump([
          gulp.src('src/*.js'),
          uglify(),
          gulp.dest('dist')
      ],
      cb
    );
});
*/  
gulp.task('watch', function (cb) {
   
});

gulp.task('build', function() {
    sequence('clean', ['css','js','image','html']);
});

//gulp.task('default', ['clean', 'css','js','image','html']);