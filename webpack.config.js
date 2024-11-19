const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const appDirectory = fs.realpathSync(process.cwd());
module.exports = function (options, webpack) {
  console.log('My Webpack Config ...');
  return {
    ...options,
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        src: path.resolve(appDirectory, 'src'),
      },
    },
    externals: [
      nodeExternals({
        allowlist: [
          'rehype-stringify',
          'rehype-highlight',
          'remark-gfm',
          'remark-parse',
          'remark-rehype',
          'unified',
        ],
      }),
    ],
  };
};
