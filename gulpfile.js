"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const del = require("del");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const rigger = require(`gulp-rigger`);

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

const images = () => {
  return gulp.src(`source/img/**/*.{png,jpg,svg}`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(`source/img`));
}
exports.images = images;

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
}
exports.createWebp = createWebp;

const sprite = () => {
  return gulp.src("source/img/icon_*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename(`sprite_auto.svg`))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

const scripts = () => {
    return gulp.src("source/js/**/*.js")
      .pipe(plumber())
      .pipe(rigger())
      .pipe(gulp.dest("build/js"))
  };
exports.scripts = scripts;

const reload = (done) => {
    sync.reload();
    done();
  };
exports.reload = reload;


const html = () => {
    return gulp.src("source/*.html")
        .pipe(gulp.dest("build"));
  };
exports.html = html;

const server = () => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/**/*.js").on("change", gulp.series("scripts", "reload"));
  gulp.watch("source/*.html").on("change", gulp.series("html", "reload"));
};
exports.server = server;

const clean = () => {
  return del("build");
};
exports.clean = clean;

const copy = () => {
  return gulp.src([
    `source/*.html`,
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico",
    "source/css/**",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};
exports.copy = copy;

const build = gulp.series(
  clean, images, createWebp, sprite, copy, styles, scripts
);
exports.build = build;

const start = gulp.series(
  build, server
);
exports.start = start;
