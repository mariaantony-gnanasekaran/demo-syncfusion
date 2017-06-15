export class RemoteData {
    constructor() {
      this.OrdersList =  ej.DataManager({ // eslint-disable-line new-cap
        url: 'http://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders/'
      });
    }
}

