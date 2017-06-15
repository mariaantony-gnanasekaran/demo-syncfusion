export class BasicUse {
  constructor() {
    this.fields = { text: 'CustomerID' };
    this.dataManger = ej.DataManager({url: 'http://js.syncfusion.com/ejServices/wcf/NorthWind.svc/'});  // eslint-disable-line new-cap
     // Query creation
    this.query = ej.Query().from('Customers'); // eslint-disable-line new-cap
  }
}
