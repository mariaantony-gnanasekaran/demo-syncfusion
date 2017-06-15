export class DragAndDropUploadbox {
  constructor() {
    this.save = 'http://js.syncfusion.com/demos/ejServices/api/uploadbox/Save';
    this.remove = 'http://js.syncfusion.com/demos/ejServices/api/uploadbox/Remove';
    this.dragAndDrop = true;
    this.multipleFiles = true;
  }
}
document.addEventListener('dragover', function(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'none';
  return false;
}, false);
document.addEventListener('drop', function(event) {
  event.dataTransfer.dropEffect = 'none';
  event.preventDefault();
  return false;
}, false);
