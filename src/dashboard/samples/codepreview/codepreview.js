import json from './registry.json!';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
@inject(Router)
export class CodePreview {
    constructor(router) {
      this.url = router.history.fragment.substr(33);
      this.name = json[this.url].name;
      let filename = json[this.url].filename;
      this.html = `dashboard/samples/${filename}/${filename}.html`;
      this.js = `dashboard/samples/${filename}/${filename}.js`;
      this.css = `dashboard/samples/${filename}/${filename}.css`;
    }
}
