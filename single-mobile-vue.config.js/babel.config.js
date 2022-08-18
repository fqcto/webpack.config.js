/*
 * @Author: likang xie 
 * @Date: 2019-08-31 13:38:32 
 * @Last Modified by: likang xie
 * @Last Modified time: 2019-08-31 13:38:32 
 * @Usage Babel配置入口
 */

module.exports = {
  presets: [
    "@vue/app"
  ],

  plugins: [
    ["import", {
      libraryName: "vant",
      libraryDirectory: "es",
      style: true
    }, "vant"],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}