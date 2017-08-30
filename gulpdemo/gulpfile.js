/*!
    linfs 2017-08-08

    整体的功能实现：（编译）->压缩->合并->(重命名)->输出->监听->刷新加载
    gulp-minify-css  =>css压缩编译
    gulp-make-css-url-version  =>给css文件里引用url加版本号
    gulp-sass  =>sass,scss编译
    gulp-uglify  =>js压缩
    gulp-rename  =>重命名
    gulp-concat  =>合并文件输出
    gulp-autoprefixer  =>自动添加前缀
    browser-sync =>浏览器监听并实时刷新加载
*/
var _gulp = require('gulp'),
    _minicss = require('gulp-minify-css'),
    _cssVer = require('gulp-make-css-url-version'),
    _sass = require('gulp-sass'),
    _minijs = require('gulp-uglify'),
    _rename = require('gulp-rename'),
    _concat = require('gulp-concat'),
    _prefixer = require('gulp-autoprefixer'),
    _bs_sync = require('browser-sync').create(),
    _reload = _bs_sync.reload;


_gulp.task('minicss',function(){
    return _gulp.src('src/css/*.css')
    .pipe(_prefixer())
    .pipe(_cssVer())
    .pipe(_gulp.dest('dist/css'))
    .pipe(_minicss())
    .pipe(_rename({'suffix':'.min'}))
    .pipe(_gulp.dest('dist/css'))
    .pipe(_reload({stream:true}));
});
_gulp.task('sass',function(){
    return _gulp.src('src/sass/*.scss')
    .pipe(_sass().on('error',_sass.logError))
    .pipe(_concat('all.css'))
    .pipe(_gulp.dest('dist/sass'))
    .pipe(_minicss())
    .pipe(_concat('all.css'))
    .pipe(_rename({'suffix':'.min'}))
    .pipe(_gulp.dest('dist/sass'))
    .pipe(_reload({stream:true}));
});
_gulp.task('minijs',function(){
    return _gulp.src('src/js/*.js')
    .pipe(_gulp.dest('dist/js'))
    .pipe(_minijs())
    .pipe(_rename({'suffix':'.min'}))
    .pipe(_gulp.dest('dist/js'));
});
/*! 
    .pipe(_reload({stream:true}));
    可实现sass+css注入，实现局部改变刷新

    浏览器监听重载
    _gulp.task('css-watch',['minicss'],_bs_sync.reload);
    _gulp.task('sass-watch',['sass'],_bs_sync.reload);
    
*/
_gulp.task('js-watch',['minijs'],_bs_sync.reload);

_gulp.task('serve',['sass','minicss','minijs'],function(){
    _bs_sync.init({
        server:{
            baseDir:'./'
        }
    });

    _gulp.watch('src/**/*.css',['minicss']);
    _gulp.watch('src/**/*.scss',['sass']);
    _gulp.watch('src/**/*.js',['js-watch']);

});
_gulp.task('default',['serve']);