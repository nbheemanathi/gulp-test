var gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  browserSync = require("browser-sync").create(),
  panini = require("panini"),
  concat = require('gulp-concat'),
  rimraf = require('rimraf').sync,
  nodepath = './node_modules/';
var assetspath = 'assets/';



var sassOptions = {
  errLogToConsole: true,
  outputStyle: "compressed"
};
// Copy Bulma filed into Bulma development folder
gulp.task('setupBulma', function () {
  //Get Bulma from node modules
  gulp.src([nodepath + 'bulma/*.sass']).pipe(gulp.dest('./bulma'));
  gulp.src([nodepath + 'bulma/**/*.sass']).pipe(gulp.dest('./bulma'));
});

//Copy assets to dist folder
gulp.task('copy', () => {
  gulp.src(['assets/css/*.css']).pipe(gulp.dest('docs/assets/css/'));
  gulp.src(['assets/fonts/**/*']).pipe(gulp.dest('docs/assets/fonts/'));
});
//Copy images to dist site
gulp.task('copy-images', function () {
  gulp.src('images/**/*')
    .pipe(gulp.dest('./docs/assets/images/'));
});


gulp.task("scss", function () {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./docs/assets/css"))
    .pipe(browserSync.stream());
});
gulp.task("sass", function () {
  return gulp
    .src("./bulma/bulma.sass")
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./docs/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("scss-watch", () => {
  gulp.watch("./scss/**/*.scss", ["scss", "sass"]);
});
gulp.task("compile-html", () => {
  gulp
    .src("./html/pages/**/*.html")
    .pipe(
      panini({
        root: "./html/pages/",
        layouts: "./html/layouts/",
        partials: "./html/includes/",
        helpers: "./html/helpers/",
        data: "./html/data/"
      })
    )
    .pipe(gulp.dest("docs"));
});
// Compile css from node modules and assets
gulp.task('compile-css', function () {
  gulp.src([
    nodepath + 'izitoast/dist/css/iziToast.min.css',
    nodepath + 'wickedpicker/dist/wickedpicker.min.css',
    nodepath + 'billboard.js/dist/billboard.min.css',
    nodepath + 'jqvmap/dist/jqvmap.min.css',

    //Additional static css assets    
    assetspath + 'css/datepicker/datepicker.css',
    assetspath + 'css/chosen/chosen.css',

    nodepath + 'jquery-ui-dist/jquery-ui.min.css',
  ])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./docs/assets/css/'));
});

// Compile js 
gulp.task('compile-js', function() {
  gulp.src([
    nodepath + 'jquery/dist/jquery.min.js', 
    nodepath + 'jquery-ui-dist/jquery-ui.min.js',
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./docs/assets/js/'));
});


//Copy js to production site
gulp.task('copy-js', function() {
  gulp.src('js/**/*.js')
      .pipe(gulp.dest('./docs/assets/js/'));
});

gulp.task("compile-html:reset", function (done) {
  panini.refresh();
  done();
});
gulp.task('init', ['setupBulma']);
// Erases the dist folder
gulp.task('clean', function () {
  rimraf('./docs');
});

gulp.task('build', ['clean', 'copy', 'copy-images','copy-js', 'sass', 'scss', 'compile-html','compile-css' ,'compile-js'], () => {

});
gulp.task("watch", ["scss-watch"], () => {
  browserSync.init({ notify: false, server: { baseDir: "./docs" } });
  gulp.watch("./docs/**/*.html", () => { browserSync.reload(); });
  gulp.watch('js/**/*', ['copy-js'] ,() =>{ browser.reload();} );
  // gulp.watch("./html/{layouts,includes,helpers,data}/**/*", ["compile-html"]);
  gulp.watch(["./html/{layouts,includes,helpers,data}/**/*"], ["compile-html:reset", "compile-html"]);
  gulp.watch(['./src/{layouts,partials,helpers,data}/**/*'], [panini.refresh]);
});
