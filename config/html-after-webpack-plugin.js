// const pluginName = 'html-after-webpack-plugin';

// const getAssetsResult = function (assets) {
//     let scripts = '',
//         styles = '';

//     assets.js.map(jsFile => {
//         scripts += '<script type="text/javascript"  src="..' + jsFile + '"></script>';
//     });

//     assets.css.map(cssFile => {
//         styles += '<link rel="stylesheet" type="text/css" href="..' + cssFile + '"/>';
//     });

//     return {
//         scripts,
//         styles
//     }
// }

// class HtmlAfterWebpackPlugin {

//     apply(compiler) {
//         compiler.hooks.compilation.tap(pluginName, (compilation) => {
//             console.log('The compiler is starting a new compilation...');

//             compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
//                 pluginName,
//                 htmlData => {

//                     let htmlContent = htmlData.html;

//                     const result = getAssetsResult(htmlData.assets);

//                     htmlContent = htmlContent
//                         .replace("<!--injectcss-->", result.styles)
//                         .replace("<!--injectjs-->", result.scripts);

//                     htmlData.html = htmlContent;
//                 }
//             )
//         })
//     }
// }

// module.exports = HtmlAfterWebpackPlugin;