"use strict";var precacheConfig=[["/index.html","d342aaade00d425413cb09e36f420afb"],["/static/css/main.e27eb20c.css","960355f414e19255a77ac3536837049e"],["/static/js/main.21930544.js","e21b4220ade08ce12a601edc722c50b7"],["/static/media/default.030eb72b.png","030eb72b411beba9a5efd159ddc4f861"],["/static/media/error.7854d688.png","7854d688eb6a55a0f60726de30fca695"],["/static/media/fox.684b6fd4.png","684b6fd4875e930c22076d3ba3578647"],["/static/media/fox1.684b6fd4.png","684b6fd4875e930c22076d3ba3578647"],["/static/media/fox2.684b6fd4.png","684b6fd4875e930c22076d3ba3578647"],["/static/media/fox3.684b6fd4.png","684b6fd4875e930c22076d3ba3578647"],["/static/media/fox4.684b6fd4.png","684b6fd4875e930c22076d3ba3578647"],["/static/media/job.886c2c0a.png","886c2c0ad64c17d8682384f7d1cb902c"],["/static/media/rabbit.70be06e4.png","70be06e4aa324e991e3baed0362bab67"],["/static/media/rabbit1.70be06e4.png","70be06e4aa324e991e3baed0362bab67"],["/static/media/rabbit2.70be06e4.png","70be06e4aa324e991e3baed0362bab67"],["/static/media/rabbit3.70be06e4.png","70be06e4aa324e991e3baed0362bab67"],["/static/media/rabbit4.70be06e4.png","70be06e4aa324e991e3baed0362bab67"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});