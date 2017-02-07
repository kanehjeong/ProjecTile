import { Component } from '@angular/core';

var styles = require('../styles.scss');

@Component({
   selector: 'my-app',
   template: require('./app.component.html')
})

export class AppComponent { }

/*
if (module.hot) {
   module.hot.accept();
   module.hot.dispose(function() {
      clearInterval(timer);
   });
}
*/
