/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/**
 * @type {Cypress.PluginConfig}
 */
const wp = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
    const options = {
        webpackOptions: {
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        options: { transpileOnly: true },
                    },
                    {
                        test: /\.css$/,
                        exclude: [/node_modules/],
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.(png|jpe?g|gif)$/i,
                        use: [
                            {
                                loader: 'file-loader',
                            },
                        ],
                    },
                ],
            },
        },
    };
    on('file:preprocessor', wp(options));
    return config;
};
