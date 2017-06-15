import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator } from 'aurelia-event-aggregator';
import json from './samples.json!';
@inject(Router, EventAggregator)
export class Dashboard {

    constructor(router, event) {
      this.router = router;
      this.event = event;
      this.lightTheme = true;
      this.darkTheme = false;
      this.data = json;
      this.sampleDetails = [];
      this.count = Object.keys(this.data).length;
      this.objKey = Object.keys(this.data);
      for (let i = 0; i < this.count; i++) {
        let _URL = this.objKey[i];
        let _name = this.data[this.objKey[i]].name;
        let _imgURL = this.data[this.objKey[i]].imageURL;
        let _qrURL = this.data[this.objKey[i]].qrURL;
        let _themeURL = this.data[this.objKey[i]].darkTheme;
        let _desc = this.data[this.objKey[i]].description;
        this.sampleDetails.push({ name: _name, URL: _URL, imageURL: _imgURL, themeURL: _themeURL, qrURL: _qrURL, description: _desc });
      }
    }

    attached() {
      this.navEvent = this.event.subscribe('router:navigation:complete', response => {
        if (this.router.currentInstruction.fragment.includes('/dashboard')) {
          this.themeUpdate();
        }
      });
    }

    themeUpdate() {
      if (window.theme) {
        if (window.theme.includes('dark') || window.theme.includes('contrast')) {
          this.lightTheme = false;
          this.darkTheme = true;
        } else {
          this.lightTheme = true;
          this.darkTheme = false;
        }
      }
    }

    created() {
      window.onclick = () => {
        this.themeUpdate();
      };
    }
}
