import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Theme } from './../shared/theme';
@inject(Theme, EventAggregator)
export class Index {

    constructor(theme, ea) {
      this.update = theme;
      this.ea = ea;
      this.themeInfo = {
        'Flat Azure': { 'path': 'default-theme', 'theme': 'flatlight', 'url': 'azure' }, 'Flat Azure Dark': { 'path': 'flat-azure-dark', 'theme': 'flatdark', 'url': 'azuredark' }, 'Flat Lime': { 'path': 'flat-lime', 'theme': 'flatlight', 'url': 'lime' }, 'Flat Lime Dark': { 'path': 'flat-lime-dark', 'theme': 'flatdark', 'url': 'limedark' }, 'Flat Saffron': { 'path': 'flat-saffron', 'theme': 'flatlight', 'url': 'saffron' },
        'Flat Saffron Dark': { 'path': 'flat-saffron-dark', 'theme': 'flatdark', 'url': 'saffrondark' }, 'Gradient Azure': { 'path': 'gradient-azure', 'theme': 'gradientlight', 'url': 'gradientazure' }, 'Gradient Azure Dark': { 'path': 'gradient-azure-dark', 'theme': 'gradientdark', 'url': 'gradientazuredark' }, 'Gradient Lime': { 'path': 'gradient-lime', 'theme': 'gradientlight', 'url': 'gradientlime' }, 'Gradien Lime Dark': { 'path': 'gradient-lime-dark', 'theme': 'gradientdark', 'url': 'gradientlimedark' },
        'Gradient Saffron': { 'path': 'gradient-saffron', 'theme': 'gradientlight', 'url': 'gradientsaffron' }, 'Gradient Saffron Dark': { 'path': 'gradient-saffron-dark', 'theme': 'gradientdark', 'url': 'gradientsaffrondark' }, 'Bootstrap': { 'path': 'bootstrap-theme', 'theme': 'bootstrap', 'url': 'bootstrap' }, 'High contrast 1': { 'path': 'high-contrast-01', 'theme': 'high-contrast-01', 'url': 'high-contrast-01' }, 'High contrast 2': { 'path': 'high-contrast-02', 'theme': 'high-contrast-01', 'url': 'high-contrast-02' }, 'Material': { 'path': 'material', 'theme': 'material', 'url': 'material' }, 'Office 365': { 'path': 'office-365', 'theme': 'material', 'url': 'office-365' }
      };
      this.name = ['Flat Azure', 'Flat Azure Dark', 'Flat Lime', 'Flat Lime Dark', 'Flat Saffron', 'Flat Saffron Dark', 'Gradient Azure', 'Gradient Azure Dark', 'Gradient Lime', 'Gradien Lime Dark', 'Gradient Saffron', 'Gradient Saffron Dark', 'Bootstrap', 'High contrast 1', 'High contrast 2', 'Material'];//office 365 is currently in development
    }

    click(theme) {
      let url = window.location.hash;
      window.themeName = theme;
      window.theme = this.themeInfo[theme].theme;
      window.theme_URL = this.themeInfo[theme].url;
      if (url.includes('#!')) {
        let index = url.indexOf('#!');
        let tempURL = url.substr(0, index - 1);
        history.pushState(null, null, tempURL + '/#!/' + window.theme_URL);
      } else {
        history.pushState(null, null, url + '/#!/' + window.theme_URL);
      }
      jQuery('body').fadeOut(0, () => {
        this.path = this.themeInfo[theme].path;
        this.updateTheme(this.path)
        .then(() => jQuery('body').fadeIn(2000));
      });
    }

    updateTheme(path) {
      return Promise.all([this.removeCss(), this.updateCss(), this.themePath(path), this.commonPath(), this.datavisualizationTheme()]).then(() => this.ea.publish('Theme', theme));
    }

    datavisualizationTheme() {
      this.update.loadChartTheme();
      this.update.loadSunburstTheme();
      this.update.loadBulletTheme();
      this.update.loadGaugeTheme();
      this.update.loadRangeNavigatorTheme();
      window.oldTheme = `Content/ej/web/${this.path}/ej.web.all.min.css`;
    }

    themePath(path) {
      let themePath = System.normalizeSync(`syncfusion-javascript/Content/ej/web/${path}/ej.web.all.min.css!`);
      this.deletePath(themePath);
      return System.import(themePath);
    }

    commonPath() {
      let commonPath = System.normalizeSync(`syncfusion-javascript/Content/ej/web/responsive-css/ej.responsive.css!`);
      this.deletePath(commonPath);
      return System.import(commonPath);
    }

    updateCss() {
      if (!window.theme.includes('bootstrap')) {
        jQuery('body').addClass('iconFix');
      } else {
        jQuery('body').removeClass('iconFix');
      }
      if (window.themeName.includes('Material')) {
        jQuery('body').addClass('material');
      } else {
        jQuery('body').removeClass('material');
      }
      if (window.theme.includes('dark') || window.theme.includes('contrast')) {
        jQuery('body').addClass('theme-dark');
      } else {
        jQuery('body').removeClass('theme-dark');
      }
    }

    removeCss() {
      jQuery('head > link').each(function() {
        if (this.href.includes(window.oldTheme) || this.href.includes('Content/ej/web/responsive-css/ej.responsive.css')) {
          DOM.removeNode(this);
        }
      });
      return 0;
    }

    deletePath(Path) {
      if (System.has(Path)) {
        System.delete(Path);
      }
    }
}
