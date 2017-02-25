import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { createNewHosts, createInputTransfer, removeNgStyles } from "@angularclass/hmr";
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppState, InternalStateType } from './app.service';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

const APP_PROVIDERS = [
   ...APP_RESOLVER_PROVIDERS,
   AppState
];

type StoreType = {
   state: InternalStateType,
   restoreInputValues: () => void,
   disposeOldHosts: () => void
};

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
      DashboardComponent
	],
	bootstrap: [
		AppComponent
	],
   providers: [
      APP_PROVIDERS
   ]
})
export class AppModule {

   constructor(
      public appRef: ApplicationRef,
      public appState: AppState
   ) {}

   public hmrOnInit(store: StoreType) {
      if (!store || !store.state) {
         return;
      }
      console.log('HMR store', JSON.stringify(store, null, 2));
      // set state
      this.appState._state = store.state;
      // set input values
      if ('restoreInputValues' in store) {
         let restoreInputValues = store.restoreInputValues;
         setTimeout(restoreInputValues);
      }

      this.appRef.tick();
      delete store.state;
      delete store.restoreInputValues;
   }

   public hmrOnDestroy(store: StoreType) {
      const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
      // save state
      const state = this.appState._state;
      store.state = state;
      // recreate root elements
      store.disposeOldHosts = createNewHosts(cmpLocation);
      // save input values
      store.restoreInputValues  = createInputTransfer();
      // remove styles
      removeNgStyles();
   }

   public hmrAfterDestroy(store: StoreType) {
      // display new elements
      store.disposeOldHosts();
      delete store.disposeOldHosts;
   }

}
