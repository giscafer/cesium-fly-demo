# cesium-fly-demo

文章说明：https://xiaozhuanlan.com/topic/6354190287

The minimum recommended setup for an application using [Cesium](https://cesiumjs.org/) with [Webpack](https://webpack.js.org/concepts/).

在线 demo：http://demo.felearn.com/demo%E7%BB%83%E4%B9%A0/11_cesium%E9%A3%9E%E8%A1%8C/

如果地图加载失败报错，见文章：https://blog.csdn.net/danfengw/article/details/52794625

如果三维球出不来，可能是网络问题，能上 google.com 的话肯定是可以的。

如果打得开测试连接，球体应该是显示正常的：https://api.cesium.com/v1/assets/2/endpoint?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YzNkNDQyMC0wMGE5LTQ4NTEtOGE0OS05YTM2ZGQxNDZlODgiLCJpZCI6MTA3MzEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJnYyJdLCJpYXQiOjE1NTcyNDI5NDF9.Oy2kUMLrKbDIWiKVyqMNWLNwlL86OhVGREkbls_dMm8

![截图](./cover.gif)

### Running this application

```bash
  npm install
  npm start
```

Navigate to `localhost:8080`.

##### Available scripts

- `npm start` - Runs a webpack build with `webpack.config.js` and starts a development server
- `npm run build` - Runs a webpack build with `webpack.config.js`
- `npm run release` - Runs an optimized webpack build with `webpack.release.config.js`
- `npm run serve-release` - Runs an optimized webpack build with `webpack.release.config.js` and starts a development server

##### Configurations

We've included two webpack configuration files in this repository. `webpack.config.js` contains the minimum recommended configuration for getting setup and configuration for running the development server. `webpack.release.config.js` contains an optimized configuration for production use.

### Requiring Cesium in your application

Using either the `build` or `release` configurations provided, there are several ways to include Cesium in your application. There is the [CommonJS](http://requirejs.org/docs/commonjs.html) style syntax which uses `require`, and the newer [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) style syntax which uses the `import` keyword. Both are supported by webpack.

You can also include all modules under the global Cesium object using `Cesium.js`, or the individual modules. Requiring individual modules is preferred, resulting in smaller bundle sizes and better performance in your application. See the [Performance Configurations](#performance-configurations) section for more information on improving performance in your application.

#### CommonJS `require`

##### Require specific modules from Cesium (preferred over global)

    var Color = require('cesium/Core/Color');
    var c = Color.fromRandom();

##### Require the global Cesium object

var Cesium = require('cesium/Cesium');
var viewer = new Cesium.Viewer('cesiumContainer');

##### Require Cesium static asset files

require('cesium/Widgets/widgets.css');

require('cesium/Assets/Textures/pin.svg');

#### ES6 style `import`

##### Import specific modules specific modules from Cesium (preferred over global)

    import Color from 'cesium/core/Color';
    var c = Color.fromRandom();

##### Import the global Cesium object

import Cesium from 'cesium/Cesium';
var viewer = new Cesium.Viewer('cesiumContainer');

##### Import Cesium static asset files

    import 'cesium/Widgets/widgets.css';

    import 'cesium/Assets/Textures/pin.svg';

### Using another Cesium location

We've set the `cesiumSource` location to be the contents of the Cesium npm module.

    var cesiumSource = path.resolve(__dirname, 'node_modules/cesium/Source');

If, however, you want to use a different version of Cesium— for example, if you've cloned the Cesium source code directly— just set the Cesium location to the appropriate path.

    var cesiumSource = path.resolve(__dirname, '../path/to/cesium/Source');

You could even point to a branch in GitHub or another url in your `package.json` file.

### Source maps

Enable source maps in development for easier debugging. They are only available when using the development server. There are many [options](https://webpack.js.org/configuration/devtool/) available. The one suggested here is `eval` for a balance of fast build and rebuild time and allowing evaluation of the webpack generated code.

Source maps can be enabled with the following config object:

    devTool: `eval`

### Performance configurations

The following optimizations are recommended for building for production and will increase performance and result in smaller bundle sizes. An example of these configurations can be found in `webpack.release.config.js`.

For best performance, make sure you are requiring individual modules from Cesium instead of the global Cesium object. Additionally, copy only the static assets that your app requires with the `CopyWebpackPlugin` by taking advantage of the [pattern options](https://github.com/webpack-contrib/copy-webpack-plugin#pattern-properties).

#### Bundle size comparisons

Here is a comparison of the size of the separated `cesium.js` bundle for `release` and `build` configurations, for using the global `Cesium` object and including individual modules for the Hello World viewer.

|                 | `build` | `release` | 'build' (gzipped) | `release` (gzipped) |
| --------------- | ------- | --------- | ----------------- | ------------------- |
| `Cesium` object | 9.91 MB | 2.82 MB   | 1.64 MB           | 745 kB              |
| modules         | 7.43 MB | 1.91 MB   | 1.17 MB           | 513 kB              |

##### Removing pragmas

To remove pragmas such as a traditional Cesium release build, use the [`strip-pragma-loader`](https://www.npmjs.com/package/strip-pragma-loader).

Install the plugin with npm,

```
npm install strip-pragma-loader --save-dev
```

and include the loader in `module.rules` with `debug` set to `false`.

```
rules: [{
	test: /\.js$/,
	enforce: 'pre',
	include: path.resolve(__dirname, cesiumSource),
	use: [{
		loader: 'strip-pragma-loader',
		options: {
		    pragmas: {
				debug: false
			}
		}
	}]
}]
```

##### Uglify and minify

Compress the final size of the bundle by minifying included JavaScript using UglifyJS with the [`uglifyjs-webpack-plugin`](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/).

Install the plugin,

```
npm install uglifyjs-webpack-plugin --save-dev
```

require it,

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
```

and include it in the list of plugins.

```
plugins: [
	new UglifyJsPlugin()
]
```

Additionally, minify the CSS files when loaded with the `css-loader`

```
module: {
	rules: [
	{
		test: /\.css$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					minimize: true
				}
			}
		]
	},
}
```
