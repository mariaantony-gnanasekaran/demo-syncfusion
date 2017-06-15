import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class NavBar {
  @bindable router = null;

  constructor(ea) {
    this.event = ea;
    this.themeID = window.themeSettings;
  }

  attached() {
    this.navEvent = this.event.subscribe('router:navigation:complete', response => {
      setTimeout(() => {
        let url = window.location.hash;
        if (window.theme_URL) {
          if (url.includes('#!')) {
            let index = url.indexOf('#!');
            let tempURL = url.substr(0, index - 1);
            history.pushState(null, null, tempURL + '/#!/' + window.theme_URL);
          } else {
            history.pushState(null, null, url + '/#!/' + window.theme_URL);
          }
        }
      });
    }, 100);

    jQuery(this.theme).ejDialog({
      showOnInit: false,
      actionButtons: ['close', 'pin'],
      enableAnimation: true,
      isResponsive: true,
      animation: {
        show: {
          effect: 'fade',
          duration: 700
        },
        hide: {
          effect: 'fade',
          duration: 700
        }
      },
      title: 'Themes'
    });
    this.dialogInstance = jQuery(this.theme).data('ejDialog');
  }

  showDialog() {
    this.dialogInstance.open();
  }

  higlightMenuItem(args) {
    args.detail.element.classList.add('e-active');
  }
}
