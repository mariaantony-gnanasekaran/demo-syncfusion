export class RemoteDataTagCloud {
  constructor() {
    this.title = 'Employee List';
    this.data = ej.DataManager({ url: 'http://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/', crossDomain: true}); // eslint-disable-line new-cap
    this.query = ej.Query().from('Orders').take(10); // eslint-disable-line new-cap
    this.fields = {text: 'CustomerID', frequency: 'EmployeeID'};
  }
}
