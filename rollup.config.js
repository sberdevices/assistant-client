import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [{
        file: pkg.unpkg,
        name: 'assistant',
        format: 'umd',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        plugins: [terser()]
    },{ 
        file: pkg['jsnext:main'],
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        format: 'esm'
    }],
    external: ['react', 'react-dom'],
    plugins: [
        nodeResolve({
            browser: true,
            preferBuiltins: true
        }),
        typescript({
            tsconfig: 'tsconfig.json',
            declaration: false,
            declarationMap: false,
            composite: false,
        }),
        commonjs()
    ]
};
