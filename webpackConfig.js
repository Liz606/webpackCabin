let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
let OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
console.log(path.resolve(path.resolve(__dirname, 'build')), 'xxxxxxxxxxxxxxx');
module.exports = {
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,//缓存
                parallel: true,//并发压缩
                sourceMap: true
            }),
            new OptimizeCSSAssetsWebpackPlugin()
        ]
    },
    devServer: { // 开发服务器配置
        port: 3000, // 服务器端口
        progress: true, // 是否显示进度条
        contentBase: './build', // 服务器根目录
    },
    mode: 'production', // 打包模式
    entry: "./src/index.js", // 打包入口
    output: { // 打包出口
        filename: 'bundle.[hash:8].js', // 出口文件名,并添加8位hash戳
        path: path.resolve(path.resolve(__dirname, 'build')) // 出口文件存放路径
    },
    module: { // 模块
        rules: [{// 规则数组
            test: /\.css|scss|less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'sass-loader', 'postcss-loader'],
        }]
    },
    plugins: [// 数组，存放所有的webpack插件
        new  HtmlWebpackPlugin({ // html文件抽离插件
            template: './src/index.html', // 模板来源
            filename: path.resolve(path.resolve(__dirname,'build/index.html')),
            // minify: { // 页面压缩配置
                // removeAttributeQuotes: true, //删除属性引号
                // collapseWhitespace: true, //折叠空行
            // },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}