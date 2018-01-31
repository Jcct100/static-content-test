const gulp        = require('gulp');
const sass        = require('gulp-sass');
const nodemon     = require('gulp-nodemon'); //--> To be able to have gulp run nodemon for me
const babel       = require('gulp-babel'); //--> To convert JS ES6 into ES5 --> convert JS into different versions
const cleanCSS    = require('gulp-clean-css'); //--> To minify CSS file (loads faster)
const uglify      = require('gulp-uglify'); //--> To minify JS file (loads faster)
const browserSync = require('browser-sync').create(); //--> To proxy what we're running on localhost:3000 and run it on another port and instantly refresh the page every time I save

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({ presets: ['es2015'] })) //--> convert to ES5
    .pipe(uglify()) //--> minify it
    .pipe(gulp.dest('public/js')); //--> add min.JS file to js directory
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' })) //--> minify CSS.
    .pipe(gulp.dest('public/css')); //--> add min.CSS file to css directory
});

//--> Purely added bonus we are having for ourselves. **NOT NEEDED**
gulp.task('serve', ['js', 'sass'], () => { //--> I use to serve my app, to run nodemon. I can dictate the order of how I want these actions to run. In [] I specify which tasks need to be completed first before running the serve task
  browserSync.init({
    proxy: 'http://localhost:3000', //--> specify proxy.
    port: 8000, //--> Take the data from the server and broadcast it on this channel
    files: ['public/**/*.*'],
    reloadDelay: 500 //--> If there are changes, wait a little bit and then reload
  });

  return nodemon({ script: 'index.js'}) //--> I wanna run nodemon when I run gulp. It points to what file I wanna run when I run nodemon
    .on('start', () => browserSync.reload()); //--> refresh on change
});

gulp.task('default', ['sass', 'js', 'serve'], () => { //--> I wanna watch for changes in certain files. If there is any change to any of these files, run the task connected to it.
  gulp.watch('src/scss/**/*.scss', ['sass']); //--> If sass file changes, I wanna run sass task
  gulp.watch('src/js/**/*.js', ['js']); //--> If js file changes, I wanna run sass task
  gulp.watch('views/**/*.ejs', browserSync.reload); //--> If ejs file changes, I wanna run sass task
});
