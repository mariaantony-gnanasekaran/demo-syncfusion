export class API {
    constructor() {
      this.datetimeValue = '5/18/2016 - 5/21/2016';
      this.btnStatus = true;
      this.dtStatus = true;
    }
    ontglbtnCreate() {
      $('.e-togglebutton').mousedown(function(e) {
        e.stopPropagation();
      });
    }
    onClose() {
      let tgleBtn = $('#show').ejToggleButton('instance');
      tgleBtn.option('toggleState', false);
    }
    onOpen() {
      let tgleBtn = $('#show').ejToggleButton('instance');
      tgleBtn.option('toggleState', true);
    }
    onEnable(args) {
      if (args.detail.isChecked) {
        this.dtStatus = false;
        this.btnStatus = false;
      } else {
        this.dtStatus = true;
        this.btnStatus = true;
      }
    }
    getSelectedValue() {
      let dateRangeObj = $('#daterangepick').ejDateRangePicker('instance');
      /*eslint-disable */
        alert('Selected Date&Time is : ' + dateRangeObj.getSelectedRange().StartDate);
        alert('Selected Date&Time is : ' + dateRangeObj.getSelectedRange().EndDate);
      /*eslint-enable */
    }
    onShow(args) {
      let dateRangeObj = $('#daterangepick').ejDateRangePicker('instance');
      if (args.detail.isChecked) dateRangeObj.popupShow();
      else dateRangeObj.popupHide();
    }
}
