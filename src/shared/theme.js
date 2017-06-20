import { noView } from 'aurelia-framework';
@noView
export class Theme {

    loadChartTheme() {
      let chartInstance = $('ej-chart').data('ejChart');
      if (chartInstance && window.theme) {
        chartInstance.model.theme = window.theme;
      }
    }

    loadSunburstTheme() {
      let sunburstInstance = $('ej-sunburst-chart').data('ejSunburstChart');
      if (sunburstInstance && window.theme) {
        if (window.theme.includes('dark') || window.theme.includes('contrast')) {
          sunburstInstance.model.theme = 'flatdark';
        } else {
          sunburstInstance.model.theme = 'flatlight';
        }
      }
    }

    loadBulletTheme() {
      let bulletInstance = $('ej-bullet-graph').data('ejBulletGraph');
      if (bulletInstance && window.theme) {
        if (window.theme.includes('dark') || window.theme.includes('contrast')) {
          bulletInstance.model.theme = 'flatdark';
        } else if (window.theme.includes('material')) {
          bulletInstance.model.theme = 'material';
        } else {
          bulletInstance.model.theme = 'flatlight';
        }
      }
    }

    loadGaugeTheme() {
      let gaugeInstance = $('ej-circular-gauge').data('ejCircularGauge') || $('ej-linear-gauge').data('ejLinearGauge') || $('ej-digital-gauge').data('ejDigitalGauge');
      if (gaugeInstance && window.theme) {
        if (window.theme.includes('dark') || window.theme.includes('contrast')) {
          gaugeInstance.model.theme = 'flatdark';
        } else {
          gaugeInstance.model.theme = 'flatlight';
        }
      }
    }

    loadRangeNavigatorTheme() {
      let rangeInstance = $('ej-range-navigator').data('ejRangeNavigator');
      if (rangeInstance && window.theme) {
        if (window.theme.includes('bootstrap') || window.theme.includes('material')) {
          rangeInstance.model.theme = 'flatlight';
        } else if (window.theme.includes('contrast')) {
          rangeInstance.model.theme = 'flatdark';
        } else {
          rangeInstance.model.theme = window.theme;
        }
      }
    }
}
