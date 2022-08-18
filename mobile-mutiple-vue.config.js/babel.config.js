/*
 * @Author: likang xie
 * @Date: 2019-08-31 13:38:32
 * @Last Modified by: likang xie
 * @Last Modified time: 2020-11-04 15:51:30
 * @Usage Babel配置入口
 */

module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry",
      },
    ],
  ],

  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
};
