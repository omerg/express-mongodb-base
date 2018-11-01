const gulp = require('gulp');
const ts = require('gulp-typescript');
const run = require('gulp-run');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const sourcemaps = require('gulp-sourcemaps');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    return new Promise(function(resolve) {
        gulp.watch('src/**/*.ts', gulp.series('scripts'));
        resolve();
    });
});

gulp.task('assets', () => {
    return gulp.src(JSON_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('start', () => {
    return new Promise(function(resolve) {
        run('npm run debug').exec();
        resolve();
    });
});

gulp.task('default', gulp.series('scripts', 'assets', gulp.parallel('start', 'watch')));
