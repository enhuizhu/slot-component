const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const srcFiles = './src/**/*.jsx'

gulp.task('build', () => {
    return browserify('./src/main.js', {debug: true})
    	.transform(babelify)
    	.bundle()
    	.on('error', function(err) { console.error(err); this.emit('end'); })
    	.pipe(source('bundle.js'))
    	// .pipe(minify())
      	.pipe(gulp.dest('./dist/'));;
});

gulp.task('build2', () => {
    return browserify('./src/main2d.js', {debug: true})
        .transform(babelify)
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('bundle2.js'))
        // .pipe(minify())
        .pipe(gulp.dest('./dist/'));;
});

gulp.task('watch', () => {
	gulp.watch(srcFiles, ['build'])
});

gulp.task('watch2', () => {
    gulp.watch(srcFiles, ['build2'])
});

gulp.task('default', ['build']);
