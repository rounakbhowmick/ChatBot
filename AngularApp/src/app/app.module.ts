import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InteractionComponent } from './interaction/interaction.component';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    InteractionComponent,
    ChatwindowComponent,
    TitlebarComponent,
    FormComponent,
    SearchbarComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
