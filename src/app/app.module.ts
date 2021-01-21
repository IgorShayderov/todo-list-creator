import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { TodoCreateFormComponent } from './todo-create-form/todo-create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TodoCreateFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
