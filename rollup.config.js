import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const common = {
    input: 'src/index.ts',
    output: {
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
    },
    external: ['react', 'react-dom'],
    plugins: [
        commonjs({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        replace({
            'process.env.APP_VERSION': pkg.version,
        }),
        json(),
    ],
};

export default [
    {
        ...common,
        output: {
            ...common.output,
            dir: 'dist',
            format: 'cjs',
        },
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: true,
            }),
            typescript({ tsconfig: 'tsconfig.json', outDir: 'dist' }),
            ...common.plugins,
        ],
    },
    {
        ...common,
        output: {
            ...common.output,
            file: pkg.unpkg,
            format: 'umd',
            name: 'assistant',
            plugins: [terser()],
        },
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: true,
            }),
            typescript({ tsconfig: 'tsconfig.json', declaration: false, declarationMap: false }),
            ...common.plugins,
        ],
    },
];
