const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },

  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/scss/shared/variables.scss"; @import "~@/assets/scss/shared/mixins.scss";'
      }
    }
  },

  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: 'src/assets/svg',
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: false
      }
    }
  }
})
