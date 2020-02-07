# scaffold-gulp-nunjucks-website

## Feature
テンプレート管理可能なサイトを作成するための足場(Scaffold)です。
テンプレートはnunjucksで実現しています。
動作検証用のローカルサーバーも入っています。
### Links
https://mozilla.github.io/nunjucks/

https://www.browsersync.io/


## Structure
<pre>
root
├ app
│ ├ html
│ │ ├ assets
│ │ │ ├ js
│ │ │ │ └ hoge.js
│ │ │ ├ css
│ │ │ │ └ hoge.css
│ │ │ └ img
│ │ │ 　 └ logo.png
│ │ ├ index.html
│ │ └ hogehoge.html
│ └ src
│ 　 ├ assets
│ 　 │ └ (no-use-yet)
│ 　 └ template
│ 　 　 ├ data
│ 　 　 │ └ constant.json
│ 　 　 ├ layout
│ 　 　 │ └ _default.njk
│ 　 　 ├ page
│ 　 　 │ ├ index.njk
│ 　 　 │ └ hoge.njk
│ 　 　 └ partial
├ gulpfile.js
├ package.json
└ README.md
</pre>

## Usage
<pre>
npm install -g gulp
npm install
gulp
</pre>