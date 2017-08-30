# GULP
# 入门指南

#### 1. 全局安装 gulp：

__如果你之前有全局安装过一个版本的 gulp，请执行一下 `npm rm --global gulp` 来避免和 gulp-cli 冲突__

```sh
$ npm install --global gulp-cli
```

#### 2. 作为项目的开发依赖（devDependencies）安装：

```sh
$ npm install --save-dev gulp
```

#### 3. 在项目根目录下创建一个名为 `gulpfile.js` 的文件：

```js
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

#### 4. 运行 gulp：

```sh
$ gulp
```

默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。

想要单独执行特定的任务（task），请输入 `gulp <task> <othertask>`。


