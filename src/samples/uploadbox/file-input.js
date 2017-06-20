export class FileInputUploadbox {
  constructor() {
    this.save = 'http://js.syncfusion.com/demos/ejServices/api/uploadbox/Save';
    this.remove = 'http://js.syncfusion.com/demos/ejServices/api/uploadbox/Remove';
    this.multipleFiles = true;
  }

  create() {
    this.uploadobject = $('#UploadInput').data('ejUploadbox');
  }

  error(event) {
    alert(event.detail.error); // eslint-disable-line no-alert
  }

  allowFileType(event) {
    this.uploadobject.option('extensionsAllow', $('#fileallow').val());
    this.uploadobject.option('extensionsDeny', '');
    $('#filedeny').val('');
  }

  denyFileType(event) {
    this.uploadobject.option('extensionsAllow', '');
    this.uploadobject.option('extensionsDeny', $('#filedeny').val());
    $('#fileallow').val('');
  }
}
