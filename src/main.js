import { Index as Theme }  from './themes/index';

export function configure(aurelia) {
  window.themeSettings = 'offline';
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-syncfusion-bridge', plugin => plugin.useAll());

  aurelia.use.globalResources('shared/collapse-panel');
  aurelia.use.globalResources('shared/markdown');
  aurelia.use.globalResources('shared/logger');
  aurelia.use.globalResources('shared/au-code');
  aurelia.use.globalResources('shared/theme');
  aurelia.start()
    .then(au => {
      let theme = au.container.get(Theme);
      let key = Object.keys(theme.themeInfo);
      let url = window.location.hash;
      if (url.includes('#!')) {
        let index = url.indexOf('#!');
        let urlName = url.substr(index + 3);
        for (let name of key) {
          let temp = theme.themeInfo[name].url;
          if (temp === urlName) {
            window.themeName = name;
            window.theme = theme.themeInfo[name].theme;
            window.theme_URL = theme.themeInfo[name].url;
            theme.path = theme.themeInfo[name].path;
            window.oldTheme = `Content/ej/web/${theme.path}/ej.web.all.min.css`;
            return theme.updateTheme(theme.path)
              .then(() => au);// eslint-disable-line no-loop-func
          }
        }
      } else {
        window.oldTheme = `Content/ej/web/bootstrap-theme/ej.web.all.min.css`;
        let themePath = System.normalizeSync(`syncfusion-javascript/Content/ej/web/bootstrap-theme/ej.web.all.min.css!`);
        System.import(themePath);
        let commonPath = System.normalizeSync(`syncfusion-javascript/Content/ej/web/responsive-css/ej.responsive.css!`);
        return System.import(commonPath)
          .then(() => au);
      }
    })
    .then(au => au.setRoot('app'));
}
