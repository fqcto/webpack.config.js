/*
 * @Author: likang xie
 * @Date: 2019-08-31 13:38:32
 * @Last Modified by: likang xie
 * @Last Modified time: 2020-08-28 14:18:07
 * @Usage Webpack配置入口
 */

const TIMESTAMP = new Date().getTime();
const PUBLIC_FILE_NAME = `[name].${process.env.VUE_APP_TYPE}.${TIMESTAMP}`;

// ---- css配置 ----
let css = {
  loaderOptions: {
    sass: {
      data: `@import "@/common/scss/variable.scss";`,
    },
  },
};

process.env.VUE_APP_TYPE != "development"
  ? (css.extract = {
      filename: `${PUBLIC_FILE_NAME}.css`,
      chunkFilename: `${PUBLIC_FILE_NAME}.css`,
    })
  : null;

module.exports = {
  css,

  devServer: {
    port: 3000,
    disableHostCheck: true,
    proxy: {
      '/api/organizational': {
        target: 'http://admin-dev.yatiku.com',
        changeOrigin: true,
        pathRewrite: {
          "^/api/organizational": "/organizational",
        },
      },

      '/api/yatiku/admin/certificate': {
        target: 'http://admin-dev.yatiku.com',
        changeOrigin: true,
        pathRewrite: {
          "^/api/yatiku/admin/certificate": "/yatiku/admin/certificate",
        },
      },

      "/api": {
        target: process.env.VUE_APP_API_URL,
        // target: "http://192.168.1.236:8080",
        // target: "http://192.168.1.3:8090",
        // target: "http://192.168.1.187:8092",
        // target: "http://192.168.1.3:8090",
        // target: "http://dl5kmwi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      }
    },
  },

  configureWebpack: {
    output: {
      filename: `${PUBLIC_FILE_NAME}.js`,
      chunkFilename: `${PUBLIC_FILE_NAME}.js`,
    },
  },

  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },

  publicPath: "/youxue/mobile",
};
