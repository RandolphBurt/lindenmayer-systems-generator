import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DefinitionLibrary } from './definition-library';
import { DefinitionValidator } from './validation/definition-validator';
import { LindenmayerSystemRulesProcessor } from './result-processing/rules-processor';
import { ResultBoundaryCalculatorFactory } from './result-processing/result-boundary-calculator-factory'; 
import { ResultRendererFactory } from './result-processing/result-renderer-factory'; 
import { ResultParser } from './result-processing/result-parser';
import { PositionCalculator } from './position-calculator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      LindenmayerSystemRulesProcessor, 
      DefinitionValidator,
      DefinitionLibrary,
      ResultBoundaryCalculatorFactory,
      ResultRendererFactory,
      ResultParser,
      PositionCalculator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
