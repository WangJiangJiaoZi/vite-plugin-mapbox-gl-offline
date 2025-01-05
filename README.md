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

## Disclaimer
This code is provided for educational and demonstration purposes only.
It is intended to facilitate learning and understanding of Vite plugin development
and should not be used in production environments.

Users of this code must comply with Mapbox's terms of service and licensing agreements.
Please ensure you have the appropriate Mapbox license and access token for your use case.

The author(s) of this code do not encourage or support any unauthorized use of Mapbox services.
Use of Mapbox services without proper authentication may violate their terms of service
and could result in legal consequences.

https://www.mapbox.com/legal/tos
