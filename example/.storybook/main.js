module.exports = {
  stories: ['../stories/**/*.stories.*'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: (config) => {
      config.module.rules.push({
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                //require('@babel/preset-typescript').default,
                [require('@babel/preset-react').default, { runtime: 'automatic' }],
                require('@babel/preset-env').default,
              ],
            },
          },
        ],
      })
    return config
  }
}
