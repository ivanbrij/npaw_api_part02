## For this project I'm using json-server for loading adapter json file, because I cannot use the link provided, 

I got this error:

Access to fetch at 'https://qa-smartplugin.youbora.com/catalog/v7/js/lib/last-build/samples/adapters-json/video/videojs/7.0.5-videojs-js.json' from origin 'null' has been blocked by CORS policy.

## For install json-server:

npm install -g json-server

## For running adapter.json as server on http://localhost:3000/adapter

json-server --watch adapter.json
