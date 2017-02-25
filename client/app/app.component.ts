import {Component, OnInit} from '@angular/core';
import {AppState} from "./app.service";

//require('../styles.scss');

@Component({
   selector: 'my-app',
   template: require('./app.component.html')
})

export class AppComponent implements OnInit {

   constructor(public appState: AppState) { }

   public ngOnInit() {
      console.log('Initial App State', this.appState.state);
   }
}

