## Overview
This is a Vite plugin that allows your 'mapbox-gl' to be used offline without setting a token or send a request to the Mapbox server. Please ensure that your “mapbox-gl“ only loads unofficial tiles

## Install
```bash
npm install vite-plugin-mapbox-gl-offline --save-dev
```

## Usage

In `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import mapboxGlOffline from 'vite-plugin-mapbox-gl-offline'

export default defineConfig({
  plugins: [
    // ...
    mapboxGlOffline()
  ]
  // ...
})
```
