const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const srcFiles = './src/**/*.js'

gulp.task('build', () => {
    return browserify('./src/main.js', {debug: true})
    	.transform(babelify)
    	.bundle()
    	.on('error', function(err) { console.error(err); this.emit('end'); })
    	.pipe(source('bundle.js'))
    	// .pipe(minify())
      	.pipe(gulp.dest('./dist/'));;
});

gulp.task('watch', () => {
	gulp.watch(srcFiles, ['build'])
});

gulp.task('default', ['build']);
