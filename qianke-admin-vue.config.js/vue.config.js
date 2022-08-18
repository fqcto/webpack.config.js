/* webpack */
const path = require('path');
const MODES = require('./src/common/js/domainModes.ts');

const resolve = dir => {
  return path.join(__dirname, dir);
};

/**
 * 构造代理模式
 * @returns {{proxy}}
 */
const constructorProxyMode = () => {
  let result = {};
  for (let key in MODES) {
    result[MODES[key].PROXY_STR] = {
      target: `http:${MODES[key].DEV_DOMAIN}`,
      changeOrigin: true,
      pathRewrite: {
        [`^${MODES[key].PROXY_STR}`]: ''
      }
    };
  }

  console.log('代理模式：', result);
  return result;
};

module.exports = {
  // 生成环境部署路径，默认服务器根目录
  publicPath: '/',
  productionSourceMap: false, // 生产环境看不到源码
  assetsDir: './', // 静态资源存放路径，对应部署路径

  chainWebpack: config => {
    // 快捷路径地址，可自定义键值对
    config.resolve.alias.set('@', resolve('src'));
    // 项目启动提示
    console.log('项目正在启动!!!');
    config.plugins.delete('prefetch');
  },

  // 本地环境代理地址
  devServer: {
    port: 8100,
    proxy: constructorProxyMode()
  },

  css: {
    loaderOptions: {
      // 全局引入 scss 主题色变量 及 mixin 混合器
      sass: {
        additionalData: `@import "@/common/style/variable.scss";`
      }
    }
  },

  configureWebpack: config =>  {
    config.module.rules.filter(rule => {
      return rule.test.toString().indexOf("scss") !== -1;
    })
      .forEach(rule => {
        rule.oneOf.forEach(oneOfRule => {
          oneOfRule.use.splice(oneOfRule.use.indexOf(require.resolve('sass-loader')), 0,
            { loader: require.resolve("css-unicode-loader")});
        });
      });
  },
};
