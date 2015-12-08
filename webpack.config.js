'use strict'

//引用
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-loader");

module.exports = {
	//项目入口
	entry: ['./src/main'],
	//输出文件
	output: {
		path: __dirname + '/dist',
		filename: 'build.js'
	},
	//服务器配置
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
	},
	devtool: 'eval-source-map',
	vue: {
        loader: {
            css: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!sass-loader!cssnext-loader")
        }
	},
	module: {
        loaders: [
        	{
        		test: /\.vue$/,
        		loader: 'vue'
        	},
	        {
	            test: /\.scss$/,
	            loader: ExtractTextPlugin.extract(
	                "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
	        },
	        {
	            test: /\.css$/,
	            loader: ExtractTextPlugin.extract(
	                "style-loader", "css-loader?sourceMap!cssnext-loader")
	        },
	        {
	            test: /\.(jpg|png|gif)$/,
	            loader: "file-loader?name=images/[hash].[ext]"
	        },
	        {
	            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	            loader: "url-loader?limit=10000&minetype=application/font-woff"
	        },
	        {
	            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	            loader: "file-loader"
	        },
	        {
	            test: /\.json$/,
	            loader: 'json'
	        },
	        {
	            test: /\.(html|tpl)$/,
	            loader: 'html-loader'
	        }
	    ]
    },
    resolve: {
        extension: ['', '.js']
    },
    plugins: [
    	new webpack.optimize.CommonsChunkPlugin('common.js'),
    	new ExtractTextPlugin("style.css", {
	        allChunks: true,
	        disable: false
	    }),
    ]
}