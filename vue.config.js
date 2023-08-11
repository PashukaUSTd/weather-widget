const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  configureWebpack: {
    mode: 'production',

    output: {
      library: 'WeatherWidget',
      libraryExport: 'default'
    }
  },

  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
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
        spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true
      }
    }
  }
})

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/imports.styl')
      ]
    })
}
