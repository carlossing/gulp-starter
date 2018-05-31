var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
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
var htmlReplace = require('gulp-html-replace');
var qunit = require('gulp-qunit');

var config = {

    cssIn: [
        'src/css/*.less',
        'src/css/start-template.css'
    ],
    cssOut:'build/css',
    cssFileName: 'styles.min.css',
    cssReplaceOut: 'css/styles.min.css',
    jsIn: [
        'src/js/app1.js',
        'src/js/app2.js'
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
    jsReplaceOut: 'js/app.min.js',
    src: 'src',
    testIn: [
       'src/test/*.html'
    ],
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

gulp.task('clean', function() {
    return del('build');
});

gulp.task('css', function(){
    del(config.cssOut)
    return gulp.src(config.cssIn)
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(concat(config.cssFileName))
        .pipe(gulp.dest(config.cssOut))
});

gulp.task('js', function(cb){
    del(config.jsOut)
    return gulp.src(config.jsIn)
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
    .pipe(htmlReplace({
        'css': config.cssReplaceOut,
        'js': config.jsReplaceOut
      }))
    // .pipe(htmlMin({
    //     sortAttributes: true,
    //     sortClassName: true,
    //     collapseWhitespace: true,
    //     removeComments: true
    //   }))
        .pipe(gulp.dest(config.htmlOut))
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', ['css'], function() {
    browserSync({
      server: config.src
    });
  
    gulp.watch([config.htmlIn, config.jsIn], ['reload']);
    gulp.watch(config.cssIn, ['css']);
});


gulp.task('watch', function () {

    gulp.watch([config.htmlIn], ['html']);
    gulp.watch([config.jsIn], ['js']);
    gulp.watch([ config.cssIn], ['css']);
});

gulp.task('build', function() {
    sequence('clean', ['css','js','image','html']);
});

gulp.task('test', function() {
    return gulp.src(config.testIn)
        .pipe(qunit());
});

gulp.task('default', ['serve']);
