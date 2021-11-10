import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

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

const getUmdConfig = (fileName, input) => ({
    ...common,
    input: input ? input : common.input,
    output: {
        ...common.output,
        file: fileName,
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
});

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
            copy({
                targets: [
                    {
                        src: 'src/proto/*.d.ts',
                        dest: 'dist/proto',
                    },
                ],
            }),
        ],
    },
    {
        ...common,
        input: ['src/createAssistant.ts', 'src/createAssistantDev.ts', 'src/assistantSdk/assistant.ts', 'src/index.ts'],
        output: {
            ...common.output,
            dir: 'esm',
            format: 'esm',
        },
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: true,
            }),
            typescript({ outDir: 'esm', declaration: false, declarationMap: false, module: 'esnext' }),
            ...common.plugins,
        ],
    },
    {
        ...getUmdConfig(pkg.unpkgdev),
    },
    {
        ...getUmdConfig(pkg.unpkg, 'src/createAssistant.ts'),
    },
];
