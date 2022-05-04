import {rollup} from 'rollup';
import {terser} from 'rollup-plugin-terser';
import sveltePlugin from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import glob from 'glob';
import path from 'path';

const INPUT_DIR = 'src/js/svelte';
const OUTPUT_DIR = 'public/js/svelte';

export default function svelte() {
  const files = glob.sync(`${INPUT_DIR}/*.svelte`, {});

  return Promise.all(
    files.map(async (file) => {
      const {base, name: filename} = path.parse(file); //eslint-disable-line

      const plugins = [
        sveltePlugin({
          emitCss: false,
          onwarn: (warning, handler) => {
            // e.g. don't warn on <marquee> elements, cos they're cool
            if (warning.code === 'a11y-distracting-elements') return;

            // let Rollup handle all other warnings normally
            handler(warning);
          },
          compilerOptions: {
            customElement: false
          }
        }),
        nodeResolve({browser: true, dedupe: ['svelte']}),
        commonjs()
      ];

      const bundle = await rollup({input: file, plugins});
      await bundle.write({
        file: `${OUTPUT_DIR}/${filename}.js`,
        name: filename,
        sourcemap: true,
        format: 'esm',
        plugins: [terser()]
      });
    })
  );
}
