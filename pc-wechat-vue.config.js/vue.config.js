module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/scss/youxue-theme.scss";`,
      },
    },
  },

  devServer: {
    port: 3000,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: `https:${process.env.VUE_APP_API_URL}`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },

  configureWebpack: {
    output: {
      filename: `js/[name].${Date.now()}.js`,
      chunkFilename: `js/[name].${Date.now()}.js`,
    },
  },
};
