import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// Modules
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

const modules = [
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  HttpClientModule
]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ...modules,
    FlexLayoutModule.withConfig({
      useColumnBasisZero: false,
      printWithBreakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'lt-sm', 'lt-md', 'lt-lg', 'lt-xl', 'gt-xs', 'gt-sm', 'gt- md', 'gt-lg'],
    }),
  ],
  exports: [
    ...modules,
    FlexLayoutModule
  ],
  providers: []
})
export class SharedDataModule{}
