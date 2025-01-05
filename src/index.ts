/**
 * DISCLAIMER
 * 
 * This code is provided for educational and demonstration purposes only.
 * It is intended to facilitate learning and understanding of Vite plugin development
 * and should not be used in production environments.
 * 
 * Users of this code must comply with Mapbox's terms of service and licensing agreements.
 * Please ensure you have the appropriate Mapbox license and access token for your use case.
 * 
 * The author(s) of this code do not encourage or support any unauthorized use of Mapbox services.
 * Use of Mapbox services without proper authentication may violate their terms of service
 * and could result in legal consequences.
 * 
 * For proper usage of Mapbox services, please visit:
 * https://www.mapbox.com/legal/tos
 */
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