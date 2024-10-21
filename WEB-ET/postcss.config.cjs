/*
 * @Date: 2024-07-24 18:59:12
 * @FilePath: /AS-WEB-3.5/postcss.config.cjs
 * @Description:
 */
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
};