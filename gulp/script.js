import gulp from "gulp";
import rollup from "@rollup/stream";
import {terser} from "rollup-plugin-terser";
import polyfillNode from 'rollup-plugin-polyfill-node';
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import sourcemaps from "gulp-sourcemaps";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import glob from "glob";
import path from "path";

const OUTPUT_DIR = 'public/js';

// TODO add cache
// https://github.com/rollup/stream#caching

export default function script() {
  const files = glob.sync("src/js/*.js", {});

  return Promise.all(
    files.map((file) => {
      const {base, name: filename} = path.parse(file);
      return new Promise((resolve, reject) => {
        rollup({
          input: file,
          output: {
            name: filename,
            sourcemap: true,
            format: "iife",
            plugins: [terser()]
          },
          plugins: [
            // https://stackoverflow.com/questions/71886246/bundling-pouchdb-adapter-memory-with-rollup
            commonjs(),
            polyfillNode(),
            nodeResolve({
              preferBuiltins: true,
              browser: true,
              dedupe: ['readable-stream']
            })
          ]
        })
          // point to the entry file.
          .pipe(source(base))

          // buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
          .pipe(buffer())

          // tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
          .pipe(sourcemaps.init({loadMaps: true}))

          // transform the code further here.

          // if you want to output with a different name from the input file, use gulp-rename here.
          // .pipe(rename('index.js'))

          // write the sourcemap alongside the output file.
          .pipe(sourcemaps.write("."))

          // and output to ./dist/main.js as normal.
          .pipe(gulp.dest(OUTPUT_DIR))
          .on("error", (err) => reject(err))
          .on("finish", () => resolve());
      });
    })
  );
}
