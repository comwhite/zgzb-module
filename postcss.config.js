module.exports = {
  autoprefixer: {
    overrideBrowserslist: [
      "Android 4.1",
      "iOS 7.1",
      "Chrome > 31",
      "ff > 31",
      "ie >= 8",
      "last 10 versions", // 所有主流浏览器最近10版本用
    ],
    grid: true,
  },
  "plugins": {
    "postcss-pxtorem": {
      rootValue: 37.5,
      // Vant 官方根字体大小是 37.5
      propList: ['*'],
      selectorBlackList: ['.norem'],
      unitPrecision: 5
      // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}