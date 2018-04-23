//gulp 停止维护了
//为什么用？已经很完善了， 简单，快
const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const eslint = require('gulp-eslint');
const gulpSequence = require('gulp-sequence');//管理任务，按顺序执行

gulp.task('build:dev', () => {
    return watch('src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('src/nodeuii/**/*.js')
            .pipe(babel({
                babelrc: false,
                "plugins": [
                    'transform-decorators-legacy',
                    'transform-es2015-modules-commonjs'
                ]
            }))
            .pipe(gulp.dest('dist'));
    })
});

gulp.task('build:prod', () => {

    gulp.src('src/nodeuii/**/*.js')
        .pipe(babel({
            babelrc: false,
            ignore: ['./src/nodeuii/config/*.js'],
            "plugins": [
                'transform-decorators-legacy',
                'transform-es2015-modules-commonjs'
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:config', () => {
    gulp.src('./src/nodeuii/pm2.json')
        .pipe(gulp.dest('dist'));
    gulp.src('src/nodeuii/**/*.js')//目的是为了tree-shaking config里面的代码
        .pipe(rollup({
            output: {
                format: 'cjs'
            },
            input: 'src/nodeuii/config/index.js',
            plugins: [
                replace({
                    //gulp和node不是同一个进程，强制修改进程名
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

let _task = ['build:dev'];

//上线阶段 hint 编译 清洗&拷贝热启动文件
if (process.env.NODE_ENV == "production") {
    _task = gulpSequence(['build:prod', 'build:config']);
}

if (process.env.NODE_ENV == "lint") {
    _task = ["lint"];
}

gulp.task('default', _task);