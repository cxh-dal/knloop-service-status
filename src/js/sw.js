self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/index.css',
        '/src/index.js',
        '/src/urls.cfg',
        '/src/js/chart.umd.js',
        '/src/js/dataProcessing.js',
        '/src/js/domManipulation.js',
        '/src/js/fetchurlsconfig.js',
        '/src/js/genReports.js',
        '/src/js/getclieninfo.js',
        '/src/js/getyear.js',
        '/src/js/lastupdated.js',
        '/src/js/reloadreports.js',
        '/src/js/reslogs.js',
        '/src/js/scroll.js',
        '/src/js/timelapsechart.js',
        '/src/js/tooltip.js',
        '/src/js/utils.js',
        '/public/favicon.ico',
        '/public/logo.svg',
        '/public/logo.png',
        '/public/check/degraded.svg',
        '/public/check/down.svg',
        '/public/check/nodata.svg',
        '/public/check/up.svg',

        // 本地日志
        './logs/Web_report.log',
        './logs/Dev_report.log',
        './logs/Mojocn_report.log',
        './logs/Mojoo_report.log',
        './logs/ShadowQ_report.log',
        './logs/Google_report.log',

        // 网络资源
        'https://raw.github.knloop.com/shadowqcom/knloop-service-status/page/logs/Web_report.log',
        'https://raw.github.knloop.com/shadowqcom/knloop-service-status/page/logs/Dev_report.log',
        'https://raw.github.knloop.com/shadowqcom/knloop-service-status/page/logs/Mojocn_report.log',
        'https://raw.github.knloop.com/shadowqcom/knloop-service-status/page/logs/Mojoo_report.log',
        'https://raw.github.knloop.com/shadowqcom/knloop-service-status/page/logs/ShadowQ_report.log',
        'https://raw.github.knloop.com/shadowqcom/knloop-service-status/page/logs/Google_report.log'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 如果缓存中有响应，则直接返回
      if (response) {
        return response;
      }

      // 尝试从网络获取资源
      return fetch(event.request).catch(function () {
        // 如果网络请求失败，再次尝试从缓存中获取资源
        return caches.match(event.request);
      });
    })
  );
});