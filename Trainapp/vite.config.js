const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue')

const { defineConfig } = require('vite');

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    root: Path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [vuePlugin()],
    
    pluginOptions: {
        electronBuilder: {
          builderOptions: {
              target: [
                {
                  target: 'portable', // 'zip', 'nsis', 'portable'
                  arch: ['x64'], // 'x64', 'ia32'
                },
              ],
          }
        }
      }
});

module.exports = config;
