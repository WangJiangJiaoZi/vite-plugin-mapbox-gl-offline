import type { Plugin } from 'vite'

const plugin = (): Plugin => {
  return {
    name: 'vite-plugin-mapbox-gl-offline',
    transform(code, id) {
      if (id.includes('mapbox-gl.js')) {
        const myFetchDefinition = `((...args) => {
                const url = typeof args[0] === 'string' ? args[0] : args[0].url;
                if (url.includes('https://events.mapbox.com') || url.includes('https://api.mapbox.com')) {
                return Promise.resolve();
                }
                return fetch(...args);
        })`
        
        let modifiedCode = code.replace(/(\s)fetch\(/g, `$1${myFetchDefinition}(`);

        const exportDefaultRegex = /export\s+default\s+(.+?)(?=[;\n])/;
        modifiedCode = modifiedCode.replace(exportDefaultRegex, (match, exportedExpr) => {
          return `const mapboxExport = ${exportedExpr};\nmapboxExport.accessToken = 'null';\nexport default mapboxExport`
        });
        
        return {
          code: modifiedCode,
          map: null
        };
      }
      return null
    },
    enforce: 'pre'
  }
}

export default plugin

if (typeof module !== 'undefined' && module.exports) {
  module.exports = plugin
  module.exports.default = plugin
}