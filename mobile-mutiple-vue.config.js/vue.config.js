/*
 * @Author: likang xie
 * @Date: 2020-01-04 11:44:10
 * @Purpose: 配置入口
 */

let initAllPages = require("./src/common/js/initAllPages"); // 自动生成所有活动页面路径

let runPath =
  process.argv[process.env.VUE_APP_TYPE == "online" ? 4 : 3] || "/index"; // 获取scripts命令的第4个参数
if (runPath.includes("--")) runPath = runPath.split("--")[1];

let pages = initAllPages(runPath); // 页面合集
let themePath =
  runPath == "/index" ? "@/common/scss" : `@/projects${runPath}/common/scss`;

module.exports = {
  publicPath:
    process.env.VUE_APP_TYPE == "development" ? "/mobile/mutiple/" : process.env.VUE_APP_TYPE == "online" ? `https://k8s-cdn.yatiku.com/mobile/mutiple${runPath}` : `/mobile/mutiple${runPath}`,
  productionSourceMap: false, // 生产环境看不到源码
  outputDir: `./dist/${runPath}`,
  pages: pages,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "${themePath}/variable.scss";`,
      },
    },
  },

  // 跨域配置
  devServer: {
    port: 3000,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },

  configureWebpack: {
    output: {
      filename: `[name].${+new Date()}.js`,
      chunkFilename: `[name].${+new Date()}.js`,
    }
  },


  chainWebpack: (config) => {
    config.entry('main').add('babel-polyfill');
  },
};
