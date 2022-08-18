/* webpack */
const path = require("path");

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  // 生成环境部署路径，默认服务器根目录
  publicPath: `${
    process.env.VUE_APP_TYPE == "online" ? "https://k8s-cdn.yatiku.com" : ""
  }/yatiku/admin/activity/`,

  productionSourceMap: false, // 生产环境看不到源码

  chainWebpack: (config) => {
    // 快捷路径地址，可自定义键值对
    config.resolve.alias.set("@", resolve("src"));
    // 项目启动提示
    console.log("项目正在启动!!!");
    config.plugins.delete("prefetch");
  },

  // 本地环境代理地址
  devServer: {
    port: 8100,
    proxy: {
      "/proxy": {
        target: "http://dev.yatiku.com/",
        // target: "http://192.168.1.241:8080/",
        // target: "http://192.168.1.146:8080", // lrb
        // target: "http://192.168.1.183:8080",
        // target: "http://192.168.1.99:8080", // xy
        // target: "http://192.168.1.99:8080", // yp
        changeOrigin: true,
        pathRewrite: {
          "^/proxy": "",
        },
      },
      "/qianke": {
        target: "http://admin-dev.yatiku.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/qianke": "",
        },
      },
    },
  },

  configureWebpack: {
    output: {
      filename: `[name].${+new Date()}.js`,
      chunkFilename: `[name].[chunkhash].${+new Date()}.js`,
    },
  },

  css: {
    loaderOptions: {
      // 全局引入 scss 主题色变量 及 mixin 混合器
      sass: {
        prependData: `@import "@/common/scss/variable.scss";`,
      },
    },
  },
};
