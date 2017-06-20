export class Api {
    ignoreWordsData = [
                { word: 'audiobook' }, { word: 'Blu' }, { word: 'DVDs' }
    ];
    cssNameList = [
        { id: 'highlighter1', text: 'Highlight1', value: 'errorword' },
        { id: 'highlighter1', text: 'Highlight2', value: 'highlighter' },
        { id: 'highlighter1', text: 'Highlight3', value: 'e-errorword' }
    ];
    constructor() {
      this.dictionarySettings = {
        dictionaryUrl: 'http://js.syncfusion.com/demos/ejservices/api/SpellCheck/CheckWords',
        customDictionaryUrl: 'http://js.syncfusion.com/demos/ejservices/api/SpellCheck/AddToDictionary'
      };
      this.value = true;
      this.numericValue = '6';
      this.cWidth = '110';
      this.dataSource = this.ignoreWordsData;
      this.fields = {text: 'word'};
      this.cssNameData = this.cssNameList;
      this.cssFields = { dataSource: this.cssNameList, text: 'text', value: 'value' };
    }
    showDialog() {
      this.spellcheck.validate();
    }
    addIgnoreWords(args) {
      this.spellcheck.option('ignoreWords', !ej.isNullOrUndefined(args.detail.model.value()) ? args.detail.model.value().split(',') : []);
    }
    changeErrorHighlight(args) {
      this.spellcheck.option('misspellWordCss', args.detail.value);
    }
    onIgnoreAlphaNumericWords(args) {
      this.spellcheck.option('ignoreSettings.ignoreAlphaNumericWords', args.detail.isChecked);
    }
    onIgnoreUrl(args) {
      this.spellcheck.option('ignoreSettings.ignoreUrl', args.detail.isChecked);
    }
    onIgnoreUpperCase(args) {
      this.spellcheck.option('ignoreSettings.ignoreUpperCase', args.detail.isChecked);
    }
    onIgnoreMixedCaseWords(args) {
      this.spellcheck.option('ignoreSettings.ignoreMixedCaseWords', args.detail.isChecked);
    }
    onIgnoreFileNames(args) {
      this.spellcheck.option('ignoreSettings.ignoreFileNames', args.detail.isChecked);
    }
    onIgnoreEmailAddress(args) {
      this.spellcheck.option('ignoreSettings.ignoreEmailAddress', args.detail.isChecked);
    }
    maxSuggestionChange(args) {
      this.spellcheck.option('maxSuggestionCount', args.detail.value);
    }
    attached() {
      setTimeout(()=>{
        this.spellcheck.validate();
      }, 50);
    }
}
