const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');
const inject = require('gulp-inject');
const browserSync = require('browser-sync').create();
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const path = require('path');
const through2 = require('through2');
const fs = require('fs');
const { build } = require('esbuild');
const glob = require('glob');
const cheerio = require('cheerio');
const beautify = require('js-beautify').html;

// Paths configuration
const paths = {
  src: {
    pages: 'src/pages/**/*.html',
    pageRoutes: 'src/pages/**/index.html', // Only index.html files for routes
    partials: 'src/pages/**/*.html', // All HTML files including partials
    scss: {
      global: 'src/styles/main.scss',
      pages: 'src/pages/**/index.scss'
    },
    js: {
      services: 'src/services/**/*.js',
      pages: 'src/pages/**/index.js'
    },
    composables: 'src/composables/**/*.html'
  },
  staticAssets: 'public',
  build: {
    root: 'build/',
    public: 'build/',
    assets: 'build/assets/',
    css: 'build/assets/css/',
    js: 'build/assets/js/'
  }
};

// Clean build directory
function clean() {
  return del([paths.build.root]);
}

// Compile global SCSS
function compileGlobalStyles() {
  return gulp.src(paths.src.scss.global)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build.css))
    .pipe(browserSync.stream());
}

// Compile page-specific SCSS with directory structure preservation
function compilePageStyles() {
  return gulp.src(paths.src.scss.pages)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(through2.obj((file, enc, cb) => {
      // Get the relative path from src/pages
      const relativePath = path.relative(path.join(process.cwd(), 'src/pages'), file.path);
      const dirPath = path.dirname(relativePath);

      // Set the new base and path to preserve directory structure
      file.base = path.join(process.cwd(), paths.build.css);
      file.path = path.join(process.cwd(), paths.build.css, dirPath, 'index.css');

      cb(null, file);
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build.css))
    .pipe(browserSync.stream());
}

// Build services JS using esbuild
async function compileServicesJS() {
  if (!fs.existsSync('src/services/main.js')) {
    return Promise.resolve();
  }

  try {
    await build({
      entryPoints: ['src/services/main.js'],
      bundle: true,
      outfile: 'build/assets/js/services.js',
      format: 'esm', // ES modules format
      sourcemap: true,
      minify: false,
      target: 'es2020',
      platform: 'browser'
    });
  } catch (error) {
    console.error('esbuild services error:', error);
  }
}

// Build page-specific JS using esbuild with directory structure preservation
async function compilePageJS() {
  const pageJSFiles = glob.sync(paths.src.js.pages);

  for (const file of pageJSFiles) {
    try {
      // Get the relative path from src/pages
      const relativePath = path.relative(path.join(process.cwd(), 'src/pages'), file);
      const dirPath = path.dirname(relativePath);
      const outputPath = path.join(paths.build.js, dirPath, 'index.js');

      await build({
        entryPoints: [file],
        bundle: true,
        outfile: outputPath,
        format: 'esm',
        sourcemap: true,
        minify: false,
        target: 'es2020',
        platform: 'browser',
        treeShaking: false,
      });
    } catch (error) {
      console.error(`esbuild error for ${file}:`, error);
    }
  }
}

// Compile HTML with includes, file-based routing, and gulp-inject for assets
function compileHTML() {
  return gulp.src(paths.src.pageRoutes, { ignore: ['src/pages/index.html'] })
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(rename(function (pathObj) {
      if (pathObj.basename === 'index') {
        pathObj.basename = pathObj.dirname;
        pathObj.dirname = '';
      }
    }))
    .pipe(through2.obj((file, enc, cb) => {
      const filePath = file.path;
      const routePath = path.relative(path.join(process.cwd(), 'build'), filePath).replace(/\\/g, '/');
      const route = routePath.replace(/\.html$/, '').replace(/\.\.\/src\/pages\//, '');

      const cssFiles = [
        '/assets/css/main.css',
        `/assets/css/${route}/index.css`
      ];

      const jsFiles = [
        `/assets/js/${route}/index.js`
      ];

      const $ = cheerio.load(file.contents.toString());

      cssFiles.forEach(css => {
        if (fs.existsSync(path.join('build', css))) {
          $('head').append(`<link rel="stylesheet" href="${css}">`);
        }
      });

      jsFiles.forEach(js => {
        if (fs.existsSync(path.join('build', js))) {
          $('body').append(`<script type="module" src="${js}"></script>`);
        }
      });

      const formatted = beautify($.html(), {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 1
      });

      file.contents = Buffer.from(formatted);

      cb(null, file);
    }))
    .pipe(gulp.dest(paths.build.root))
    .pipe(browserSync.stream());
}

// Create index.html for home page (if exists)
function createIndexPage() {
  if (!fs.existsSync('src/pages/index.html')) {
    return Promise.resolve();
  }

  return gulp.src('src/pages/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(through2.obj(function (file, enc, cb) {
      const $ = cheerio.load(file.contents.toString());

      const cssFiles = [
        '/assets/css/main.css',
        '/assets/css/index.css'
      ];

      const jsFiles = [
        '/assets/js/services.js',
        '/assets/js/index.js'
      ];

      cssFiles.forEach(css => {
        if (fs.existsSync(path.join('build', css))) {
          $('head').append(`<link rel="stylesheet" href="${css}">`);
        }
      });

      jsFiles.forEach(js => {
        if (fs.existsSync(path.join('build', js))) {
          $('body').append(`<script type="module" src="${js}"></script>`);
        }
      });

      const formatted = beautify($.html(), {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 1
      });

      file.contents = Buffer.from(formatted);

      cb(null, file);
    }))
    .pipe(gulp.dest(paths.build.root))
    .pipe(browserSync.stream());
}

// Handle index page styles and JS (if exists)
function compileIndexAssets() {
  const tasks = [];

  // Index CSS
  if (fs.existsSync('src/pages/index.scss')) {
    const indexCSS = gulp.src('src/pages/index.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('index.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.build.css))
      .pipe(browserSync.stream());
    tasks.push(indexCSS);
  }

  // Index JS using esbuild
  if (fs.existsSync('src/pages/index.js')) {
    const indexJSTask = build({
      entryPoints: ['src/pages/index.js'],
      bundle: true,
      outfile: 'build/assets/js/index.js',
      format: 'esm',
      sourcemap: true,
      minify: false,
      target: 'es2020',
      platform: 'browser'
    }).then(() => {
      browserSync.reload(); // Manually trigger reload after JS build
    }).catch(error => {
      console.error('esbuild index error:', error);
    });
    tasks.push(indexJSTask);
  }

  return tasks.length > 0 ? Promise.all(tasks) : Promise.resolve();
}

// Copy static assets to build directory
function copyStatic() {
  return gulp.src(paths.staticAssets + '/**/*', { dot: true, encoding: false })
    .pipe(gulp.dest(paths.build.public))
    .on('end', () => browserSync.reload());
}

// Watch files for changes
function watchFiles() {
  gulp.watch(paths.src.scss.global, gulp.series(compileGlobalStyles, compileHTML, createIndexPage));
  gulp.watch(paths.src.scss.pages, gulp.series(compilePageStyles, compileHTML, createIndexPage));
  gulp.watch('src/pages/index.scss', gulp.series(compileIndexAssets, createIndexPage));
  gulp.watch(paths.src.js.services, gulp.series(compileServicesJS, compileHTML, createIndexPage));
  gulp.watch(paths.src.js.pages, gulp.series(compilePageJS, compileHTML, createIndexPage));
  gulp.watch('src/pages/index.js', gulp.series(compileIndexAssets, createIndexPage));
  gulp.watch([paths.src.partials, paths.src.composables], gulp.series(compileHTML, createIndexPage));
}

// Browser-sync server
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build.root
    },
    serveStaticOptions: {
      extensions: ['html']
    },
    port: 3000,
    open: true
  });
}

// Build task
const gulpBuild = gulp.series(
  clean,
  gulp.parallel(
    compileGlobalStyles,
    compilePageStyles,
    compileServicesJS,
    compilePageJS,
    compileIndexAssets,
  ),
  gulp.parallel(
    compileHTML,
    createIndexPage
  ),
  copyStatic
);

// Development task
const dev = gulp.series(gulpBuild, gulp.parallel(serve, watchFiles));

// Export tasks
exports.clean = clean;
exports.build = gulpBuild;
exports.dev = dev;
exports.default = dev;