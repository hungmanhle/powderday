const css_regex = '/\\.css$/'

module.exports = {
  webpackFinal(config = {}, options = {}) {
    const cssRule = config.module.rules.find(_ => _.test.toString() === css_regex)
  
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(_ => _.test.toString() !== css_regex),
          {
            ...cssRule,
            exclude: /\.module\.css$/,
          },
          {
            ...cssRule,
            test: /\.module\.css$/,
            use: cssRule.use.map(_ => {
              if (_ && _.loader && _.loader.match(/[\/\\]css-loader/g)) {
                return {
                  ..._,
                  options: {
                    ..._.options,
                    modules: {
                      localIdentName: "[name]__[local]__[hash:base64:5]",
                    }
                  }
                }
              }
  
              return _
            })
          }
        ]
      }
    }
  },

  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ]
}