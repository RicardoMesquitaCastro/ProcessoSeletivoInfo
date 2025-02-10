import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// Language
import { registerLocaleData } from '@angular/common';
import localept from '@angular/common/locales/pt';
registerLocaleData(localept, 'pt');



// Component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
