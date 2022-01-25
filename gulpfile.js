const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  // this is to add Copyright in the production mode for the minified js
  gulp
    .src("dist/js/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* © 2018-2022 Association Highcanfly
=========================================================
This website use Vue Notus theme from Creative Tim (MIT License)
*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Copyright in the production mode for the minified html
  gulp
    .src("dist/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--
=========================================================
* © 2018-2022 Association Highcanfly
=========================================================
This website use Vue Notus theme from Creative Tim (MIT License)
-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Copyright in the production mode for the minified css
  gulp
    .src("dist/css/*.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* © 2018-2022 Association Highcanfly
=========================================================
This website use Vue Notus theme from Creative Tim (MIT License)

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
