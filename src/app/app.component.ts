import { Component } from '@angular/core';

import { DefinitionLibrary } from './definition-library';
import { LindenmayerSystemLibraryDefinition } from './data-definitions/lindenmayer-system-library-definition';
import { LindenmayerSystemDefinition } from './data-definitions/lindenmayer-system-definition';
import { LindenmayerSystemRule } from './data-definitions/lindenmayer-system-rule';
import { DefinitionValidator } from './validation/definition-validator';
import { RulesProcessor } from './result-processing/rules-processor';
import { ResultBoundaryCalculatorFactory } from './result-processing/result-boundary-calculator-factory'; 
import { ResultRendererFactory } from './result-processing/result-renderer-factory'; 
import { ResultParser } from './result-processing/result-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  constructor(_rulesProcessor:RulesProcessor,
              _definitionValidator:DefinitionValidator,
              _definitionLibrary:DefinitionLibrary,
              _resultBoundaryCalculatorFactory:ResultBoundaryCalculatorFactory,
              _resultRendererFactory:ResultRendererFactory,
              _resultParser:ResultParser) {
      this.rulesProcessor = _rulesProcessor;
      this.definitionVAlidator = _definitionValidator;
      this.resultBoundaryCalculatorFactory = _resultBoundaryCalculatorFactory;
      this.resultRendererFactory = _resultRendererFactory;
      this.resultParser = _resultParser;

      this.libraryDefinitions = _definitionLibrary.definitions;
      this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition();
      this.selectedPredefinedDefinition = this.libraryDefinitions[0].title;
      this.loadAndRender();
  }

  private resultParser:ResultParser;
  private rulesProcessor:RulesProcessor;
  private definitionVAlidator:DefinitionValidator;
  private resultBoundaryCalculatorFactory:ResultBoundaryCalculatorFactory;
  private resultRendererFactory:ResultRendererFactory;
  private lindenmayerSystemDefinition:LindenmayerSystemDefinition;
  private showBusy:boolean = false;
  private iterationCount:number = 3;
  private libraryDefinitions:LindenmayerSystemLibraryDefinition[];
  private selectedPredefinedDefinition:string;

  private processDefinition(): void {
      var canvas = <HTMLCanvasElement> document.getElementById('canvas');
      var canvasContext = canvas.getContext('2d');
      canvasContext.beginPath();
      canvasContext.setTransform(1, 0, 0, 1, 0, 0);
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.closePath();

      var validationResult = this.definitionVAlidator.validate(this.lindenmayerSystemDefinition);
      if (validationResult.result === true && this.iterationCount > 0) {
          // Iterate over the axiom and generated results 'iterationCount' times....
          var result = this.rulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);

          // Calculate the space/rectangular-size required to draw the resultant shape
          var lindenmayerSystemResultBoundaryCalculator = this.resultBoundaryCalculatorFactory.Create();
          this.resultParser.parseResult(lindenmayerSystemResultBoundaryCalculator, this.lindenmayerSystemDefinition, result);

          var diffX = lindenmayerSystemResultBoundaryCalculator.maxX - lindenmayerSystemResultBoundaryCalculator.minX;
          var diffY = lindenmayerSystemResultBoundaryCalculator.maxY - lindenmayerSystemResultBoundaryCalculator.minY;

          var scale:number = Math.min(canvas.width / diffX, canvas.height / diffY);
          var startX:number = (-1 * lindenmayerSystemResultBoundaryCalculator.minX) + (0.5 * ((canvas.width / scale) - diffX));
          var startY:number = (-1 * lindenmayerSystemResultBoundaryCalculator.minY) + (0.5 * ((canvas.height / scale) - diffY));

          // scale the canvas to fit the size required
          canvasContext.scale(scale, scale);
          canvasContext.strokeStyle  = "#000000";

          // render the results on screen...
          var lindenmayerSystemResultRenderer = this.resultRendererFactory.Create(canvasContext, startX, startY);
          this.resultParser.parseResult(lindenmayerSystemResultRenderer, this.lindenmayerSystemDefinition, result);
      } else {
          // TODO: show errors etc
      }
  };

  addRule(): void {
      this.lindenmayerSystemDefinition.addRule();
  };

  deleteRule(index: number): void {
      this.lindenmayerSystemDefinition.deleteRule(index);
  };

  loadAndRender():void {
      var chosenDefinition = this.libraryDefinitions.filter((x) => x.title === this.selectedPredefinedDefinition)[0];

      this.lindenmayerSystemDefinition.axiom = chosenDefinition.axiom;
      this.lindenmayerSystemDefinition.constants = chosenDefinition.constants;
      this.lindenmayerSystemDefinition.turningAngle = chosenDefinition.turningAngle;
      this.iterationCount = chosenDefinition.suggestedIterationCount;

      if (chosenDefinition.rules) {
          this.lindenmayerSystemDefinition.rules = chosenDefinition.rules.map((r) => new LindenmayerSystemRule(r.input, r.output));
      }

      this.queueProcessDefinition();
  };

  queueProcessDefinition(): void {
      this.showBusy = true;

      setTimeout(() => {
          this.processDefinition();
          this.showBusy = false;
      }, 100);
  }
}
