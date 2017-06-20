export class Ranges {
    constructor() {
      this.daterangeValue = '5/18/2016 - 6/1/2016';
      this.ranges =  [
            { label: 'Today', range: [new Date(), new Date()] },
            { label: 'Last 1 Week', range: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()] },
            { label: 'Last 1 Month', range: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()] },
            { label: 'Last 2 Month', range: [new Date(new Date().setMonth(new Date().getMonth() - 2)), new Date()] }
      ];
    }
}
