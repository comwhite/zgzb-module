const { resolve } = require('path')
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression' // gzip
import legacy from '@vitejs/plugin-legacy'
import envConfig from './config/index' // 环境变量
import mockPlugin from 'vite-plugin-mockit' // mock

const env = process.argv[process.argv.length - 1]
console.log('当前环境:: ', env)

// 前端当前地址
const nowEnv = ['preview', 'build'].indexOf(env) > -1 ? envConfig['prod'] : envConfig[env]
const config = ({ command }) => {
	let prodMock = true
	return {
		plugins: [
			vue(),
			// 50+ chrome内核兼容
			legacy({
				targets: ['Android > 39', 'Chrome >= 50', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15']
			}),
			styleImport({
				libs: [
					{
						libraryName: 'vant',
						esModule: true,
						resolveStyle: (name) => `vant/es/${name}/style`
					}
				]
			}),
			// gzip压缩
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: 'gzip',
				ext: '.gz'
			}),
			// mock
			mockPlugin({
				entry: './mock/index.js',
				//   watchFiles: [], // watch file or dir change refresh mock
				// ignoreFiles: [], // ignore file or dir change
				debug: false // debug log
			})
		],
		mode: env,
		resolve: {
			alias: {
				'/@components': resolve(__dirname, './src/components'),
				'/@api': resolve(__dirname, './src/api'),
				'/@mock': resolve(__dirname, './src/mock'),
				'/@router': resolve(__dirname, './src/router'),
				'/@style': resolve(__dirname, './src/style'),
				'/@utils': resolve(__dirname, './src/utils'),
				'/@assets': resolve(__dirname, './src/assets'),
				'/@const': resolve(__dirname, './src/const'),
				'/@views': resolve(__dirname, './src/views')
			}
		},
		optimizeDeps: {
			// 三方依赖
			include: []
		},
		css: {
			preprocessorOptions: {
				less: {
					additionalData: '@import "./src/style/var.less";',
					modifyVars: {
						hack: `true; @import "${resolve('./src/style/theme.less')}";`
					}
				}
			}
		},
		build: {
			// minify: 'esbuild',
			terserOptions: {
				compress: {
					drop_console: false,
					drop_debugger: true
				}
			},
			rollupOptions: {
				output: {
					entryFileNames: 'assets/js/[name]-[hash].js',
					chunkFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: (assetInfo) => {
						if (/\.css$/.test(assetInfo.name)) {
							return 'assets/css/[name]-[hash][extname]'
						}
						return 'assets/img/[name]-[hash][extname]'
					}
				}
			},
			assetsInlineLimit: 4096 << 2
		},
		server: {
			host: '0.0.0.0',
			open: false,
			https: false,
			port: nowEnv.port,
			cors: true,
			proxy: nowEnv.domain,
			hmr: {
				overlay: false
			}
		}
	}
}

export default config
