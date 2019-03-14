/**
 * gulpfile.js
 * gulpで走らせるタスクを記述しています。
 * ここでは以下のことをしています。
 * 
 * ・ローカルサーバーの生成→自動ブラウザリロード(browser-sync)
 * ・nunjucksでHTMLレンダリング→静的HTMLファイル保存(gulp-nunjucks-render)
 * ・HTML整形(gulp-html-beautify)
 * ・自動更新検知(watch)
 * 
 * 
 * TODO: ファイル一括アップロード、死亡リンクチェック
 */

"use strict";

//各種モジュール読み込み。
const gulp          = require("gulp");                  //gulp本体。
const nunjucks      = require("gulp-nunjucks-render");  //nunjucksのレンダリングをgulpで出来るようにするモジュール。このタスクの柱。
const data          = require("gulp-data");             //ファイルを扱えるようにするモジュール？実はよく理解していない。
const beautify      = require("gulp-html-beautify");    //HTMLファイルをきれいに整形してくれる。人がやるより確実。
const plumber       = require("gulp-plumber");          //エラーを吐いてもgulp.watchが死なないようにするモジュール。これがないとプロセスが死ぬ。

//各サイトのbrowser-sync 自動でブラウザを起動してページを開くモジュール。まじ便利。
let browserSyncs = require("browser-sync").create();

//各種パス。何か機能追加したときはこちらにも手を加えるはず。
const paths = {
    src: {
        root: "app/src/",
        template: "app/src/template/",
        html: "app/src/template/page/",
        json: "./app/src/template/data/constant.json"
    },
    dest: {
        root: "app/html/",
        port: 3001,
        uiPort: 3501
    }
};

//HTML整形ルール。
const beautifyOption = {
    indent_size: 4
};

//task: nunjucks
gulp.task("nunjucks", () => {
    //njkファイル取得→nunjucksコンパイル→インデント適正化→htmlとして保存
    return gulp.src(paths.src.html + "**/*.njk")
        .pipe(plumber({
            errorHandler: (error) => {
                //詳しいエラーを吐いて落ちる。しかしplumberなのでプロセス自体は落ちない。
                console.log("Error Message: \n", error.message, "\n", "=====");
                console.log("Stack: \n", error.stack);
            }
        }))
        .pipe(data(() => {
            return require(paths.src.json);
        }))
        .pipe(nunjucks({ path: paths.src.template }))
        .pipe(beautify(beautifyOption))
        .pipe(gulp.dest(paths.dest.root));
});
//task: browser-sync
gulp.task("browser-sync", () => {
    browserSyncs.init({
        server: {
            baseDir: paths.dest.root,
            index: "index.html"
        },
        watch: true,
        port: paths.dest.port,
        ui: {port: paths.dest.uiPort}
    });
});
//task: watch
gulp.task("watch", () => {
    gulp.watch(paths.src.template + "**/*.njk", ["nunjucks"]);
});

gulp.task("default", ["browser-sync", "nunjucks", "watch"]);