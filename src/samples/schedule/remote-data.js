export class RemoteData {
    constructor() {
      let dataManager = ej.DataManager({ //eslint-disable-line new-cap
        url: 'http://js.syncfusion.com/demos/ejServices/api/Schedule/LoadData',
        crossDomain: true
      });
      this.AppointmentList = {
        dataSource: dataManager,
        id: 'Id',
        subject: 'Subject',
        startTime: 'StartTime',
        description: 'Description',
        endTime: 'EndTime',
        allDay: 'AllDay',
        recurrence: 'Recurrence',
        recurrenceRule: 'RecurrenceRule'
      };
    }
}
