export class Localization {
    constructor() {
      this.daterangeValue = '3/14/2017 - 4/17/2017';
      this.target = 'localelist';
      this.watermarkText = 'Select Culture';
    }
    get updateLocale() {
      return this.localeValue;
    }
    set updateLocale(value) {
      this.localeValue = value;
      if (this.localeValue === 'fr-FR') {
        this.btnText = {
          apply: 'Appliquer',
          cancel: 'Annuler',
          reset: 'Réinitialiser'
        };
        this.placeholder = 'Sélectionnez lintervalle de date';
      }
      if (this.localeValue === 'de-DE') {
        this.btnText = { apply: 'anwenden', cancel: 'stornieren', reset: 'zurückstellen' };
        this.placeholder = 'Datumbereik selecteren';
      }
      if (this.localeValue === 'en-US') {
        this.btnText = { apply: 'Apply', cancel: 'Cancel', reset: 'Reset' };
        this.placeholder = 'Select DateRange';
      }
    }
}
