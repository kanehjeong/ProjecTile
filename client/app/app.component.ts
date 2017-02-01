import { Component } from '@angular/core';

var styles = require('../styles.scss');
var appComponentCss = require('./app.component.scss');

@Component({
   selector: 'my-app',
   templateUrl: './app.component.html'
   //styleUrls: [styles, appComponentCss]
})

export class AppComponent { }