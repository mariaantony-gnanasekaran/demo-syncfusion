export class MultipleTargets {
    constructor() {
      this.dictionarySettings = {
        dictionaryUrl: 'http://js.syncfusion.com/demos/ejservices/api/SpellCheck/CheckWords',
        customDictionaryUrl: 'http://js.syncfusion.com/demos/ejservices/api/SpellCheck/AddToDictionary'
      };
      this.ContextMenu = {enable: false};
    }
    showDialog() {
      this.spellcheck.showInDialog();
    }
    onTargetUpdating(args) {
      this.onUpdate(args.detail.previousElement);
      $(args.detail.currentElement)[0].style.border = 'thin solid blue';
    }
    onDialogClose(args) {
      this.onUpdate(args.detail.targetElement);
    }
    onUpdate(element) {
      if (!ej.isNullOrUndefined(element)) {
        if ($(element)[0].attributes.id.value === 'control2') {
          $(element)[0].style.borderColor = 'rgb(169, 169, 169)';
        }else {
          $(element)[0].style.border = 'none';
        }
      }
    }
}
