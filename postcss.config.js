// const autoprefixer = require('autoprefixer')

// module.exports = {
//   plugins: [
//     require('postcss-flexbugs-fixes'),
//     autoprefixer({
//       browsers: [
//         '>1%',
//         'last 4 versions',
//         'Firefox ESR',
//         'not ie < 9', // React doesn't support IE8 anyway
//       ],
//       flexbox: 'no-2009',
//     }),
//   ]
// }

const autoprefixer = require('autoprefixer')
const posrcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini')
const postcssWriteSvg = require('postcss-write-svg')
const postcssCssnext = require('postcss-cssnext')
const postcssPxToViewport = require('postcss-px-to-viewport')
const postcssViewportUnits = require('postcss-viewport-units')
const cssnano =  require('cssnano')

// postcss 后处理css   优化css代码

module.exports = {
  plugins: [
    autoprefixer(), // 这个方法用于给css加浏览器前缀
    posrcssImport(),
    postcssUrl(),
    postcssAspectRatioMini(),
    // postcssWriteSvg({
    //   utf8: false
    // }),
    postcssCssnext(),
    postcssPxToViewport({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.am', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    }),
    postcssViewportUnits(),
    cssnano({
      // preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    })
  ]
}