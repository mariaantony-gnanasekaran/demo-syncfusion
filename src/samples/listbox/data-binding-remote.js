export class BasicUse {
  constructor() {
     // declaration
    this.fields = { text: 'CustomerID' };
    this.dataManger = ej.DataManager({url: 'http://js.syncfusion.com/ejServices/wcf/NorthWind.svc/', crossDomain: true}); // eslint-disable-line new-cap
     // Query creation
    this.query = ej.Query().from('Customers').take(10);// eslint-disable-line new-cap
  }
}
