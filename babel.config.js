module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/controllers',
          '@models': './src/models',
          '@helpers': './src/helpers',
          '@interfaces': './src/interfaces',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
