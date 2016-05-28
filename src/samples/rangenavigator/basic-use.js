export class BasicUse {
  constructor() {
    this.dataSource = this.getdata().Open;
    this.legend = {visible: false};
    this.style = {borderWidth: 2};
    this.crosshair = {visible: true, type: 'trackball', marker: {shape: 'circle', size: {height: 9, width: 9}, visible: true, border: {width: 1}}, line: {color: 'transparent'}};
    this.tooltip = {visible: true, format: '#point.x#  :  ej.format(#point.y#,n2)'};
    this.selectedRangeSettings = {start: '2010/5/1', end: '2011/10/1'};
    this.sizeSettings = {width: '950', height: '120'};
    this.size = {width: '1000', height: '300'};
  }

  onchartloaded(sender) {
    let chartobj = $('#chart').data('ejChart');
    if (chartobj) {
      chartobj.model.primaryXAxis.zoomPosition = sender.detail.zoomPosition;
      chartobj.model.primaryXAxis.zoomFactor = sender.detail.zoomFactor;
      $('#chart').ejChart('redraw');
    }
  }
  onchartload(sender) {
    let data = this.getdata();
    sender.detail.model.series[0].dataSource = data.Open;
    sender.detail.model.series[0].xName = 'XValue';
    sender.detail.model.series[0].yName = 'YValue';
    sender.detail.model.series[1].dataSource = data.Close;
    sender.detail.model.series[1].xName = 'XValue';
    sender.detail.model.series[1].yName = 'YValue';
  }

  getdata() {
    let series1 = [];
    let series2 = [];
    let data;
    let value = 100;
    let value1 = 120;
    let point1;
    let point2;
    for (let i = 1; i < 730; i++) {
      if (Math.random() > 0.5) {
        value += Math.random();
        value1 += Math.random();
      } else {
        value -= Math.random();
        value1 -= Math.random();
      }
      point1 = { XValue: new Date(2010, 0, i), YValue: value };
      point2 = { XValue: new Date(2010, 0, i), YValue: value1 };
      series1.push(point1);
      series2.push(point2);
    }
    data = { Open: series1, Close: series2 };
    return data;
  }
}