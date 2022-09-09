import gulp from 'gulp'
import gap from 'gulp-append-prepend'

gulp.task("licenses", async function () {
  // this is to add Copyright in the production mode for the minified js
  gulp
    .src("dist/js/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* © 2018-2022 Association Highcanfly
=========================================================
This website use:
- Vuejs v3
- Font Awesome
- Vue Notus theme from Creative Tim (MIT License)
- And many others
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
This website use:
- Vuejs v3
- Font Awesome
- Vue Notus theme from Creative Tim (MIT License)
- And many others
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
This website use:
- Vuejs v3
- Font Awesome
- Vue Notus theme from Creative Tim (MIT License)
- And many others

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
