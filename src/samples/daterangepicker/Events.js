export class Events {
   constructor() {
     this.daterangeValue = '5/18/2016-5/28/2016';
   }
   onChange(args) {
     this.logger.log(args.detail.value + ' value was selected');
   }
}
