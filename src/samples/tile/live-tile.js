export class BasisUseUploadbox {
  constructor() {
    this.caption1 = {text: 'Play' };
    this.caption2 = {text: 'People' };
    this.caption3 = {text: 'Photos' };
    this.caption4 = {text: 'Weather'};
    this.liveTile1 = {updateInterval: 3000,  enabled: true, type: 'flip', imageUrl: ['images/tile/windows/alerts.png', 'images/tile/windows/bing.png', 'images/tile/windows/camera.png']};
    this.liveTile2 =  {updateInterval: 3500,  enabled: true, type: 'flip', imageUrl: ['images/tile/windows/alerts.png', 'images/tile/windows/bing.png', 'images/tile/windows/camera.png']};
    this.liveTile3 = {updateInterval: 5000,  enabled: true, type: 'slide', imageUrl: ['images/tile/windows/people_1.png', 'images/tile/windows/people_2.png', 'images/tile/windows/people_3.png']};
    this.liveTile4 = {updateInterval: 4000,  enabled: true, type: 'slide', imageUrl: ['images/tile/windows/pictures.png', 'images/tile/windows/Photo_1.png', 'images/tile/windows/Photo_2.png', 'images/tile/windows/pictures.png', 'images/tile/windows/Photo_1.png']};
    this.liveTile5 = {updateInterval: 3000, enabled: true, type: 'carousel', imageUrl: ['images/tile/windows/weather.png', 'images/tile/windows/Weather_1.png', 'images/tile/windows/Weather_2.png']};
    this.badge1 = {enabled: 'true', value: '10'};
  }
}
