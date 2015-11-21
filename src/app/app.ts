import {bootstrap, Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import {LindenmayerSystemDefinition} from './LindenmayerSystemDefinition'
import {LindenmayerSystemRulesProcessor} from './LindenmayerSystemRulesProcessor'
import {LindenmayerSystemValidator} from "./LindenmayerSystemValidator";
import {PositionCalculator} from "./PositionCalculator";
import {LindenmayerSystemResultBoundaryCalculator} from "./LindenmayerSystemResultBoundaryCalculator";
import {LindenmayerSystemResultRenderer} from "./LindenmayerSystemResultRenderer";
import {ILindenmayerSystemResultProcessor} from "./ILindenmayerSystemResultProcessor";
import {LindenmayerSystemResultBoundaryCalculatorFactory} from "./LindenmayerSystemResultBoundaryCalculatorFactory";
import {LindenmayerSystemResultRendererFactory} from "./LindenmayerSystemResultRendererFactory";
import {LindenmayerSystemLibrary} from "./LindenmayerSystemLibrary";
import {LindenmayerSystemLibraryDefinition} from "./LindenmayerSystemDefinition";
import {LindenmayerSystemRule} from "./LindenmayerSystemDefinition";


@Component({
    selector: 'my-app',
    template: `
        <div>
            <select [(ng-model)]="selectedPredefinedDefinition" (ng-model-change)="loadAndRender()">
                <option *ng-for="#definition of library">{{definition.title}}</option>
             </select>
        </div>
        <div><label>Axiom:</label><input [(ng-model)]="lindenmayerSystemDefinition.axiom"></div>
        <div><label>Constants:</label><input [(ng-model)]="lindenmayerSystemDefinition.constants"></div>
        <div><label>Turning Angle:</label><input type="number" [(ng-model)]="lindenmayerSystemDefinition.turningAngle"></div>
        <div *ng-for="#rule of lindenmayerSystemDefinition.rules; #i = index">
            <label>Rule {{i + 1}}:</label><input [(ng-model)]="rule.input">
            <span>=&gt;</span>
            <input [(ng-model)]="rule.output">
            <input type="button" value="X" (click)="deleteRule(i)">
        </div>
        <div>
            <input type="button" value="Add Rule" (click)="addRule()">
        </div>
        <div>
            <label>Initial direction (Angle):</label><input type="number" [(ng-model)]="lindenmayerSystemDefinition.startDirection">
        </div>
        <div>
            <label>Iteration Count:</label><input type="number" [(ng-model)]="iterationCount">
            <input type="button" value="Draw" (click)="processDefinition()">
        </div>
        <div>
            <canvas id="canvas" class="canvas" width="1000" height="800"></canvas>
        </div>
    `,
    styles: [`
        .canvas { background-color: grey }
    `],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
class AppComponent {
    constructor(_lindenmayerSystemRulesProcessor:LindenmayerSystemRulesProcessor,
                _lindenmayerSystemValidator:LindenmayerSystemValidator,
                _lindenmayerSystemLibrary:LindenmayerSystemLibrary,
                _lindenmayerSystemResultBoundaryCalculatorFactory:LindenmayerSystemResultBoundaryCalculatorFactory,
                _lindenmayerSystemResultRendererFactory:LindenmayerSystemResultRendererFactory) {
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
        this.lindenmayerSystemResultBoundaryCalculatorFactory = _lindenmayerSystemResultBoundaryCalculatorFactory;
        this.lindenmayerSystemResultRendererFactory = _lindenmayerSystemResultRendererFactory;

        this.library = _lindenmayerSystemLibrary.definitions;
        this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition();
        this.selectedPredefinedDefinition = this.library[0].title;
        this.loadAndRender();
    }

    private lindenmayerSystemRulesProcessor:LindenmayerSystemRulesProcessor;
    private lindenmayerSystemValidator:LindenmayerSystemValidator;
    private lindenmayerSystemResultBoundaryCalculatorFactory:LindenmayerSystemResultBoundaryCalculatorFactory;
    private lindenmayerSystemResultRendererFactory:LindenmayerSystemResultRendererFactory;
    private lindenmayerSystemDefinition:LindenmayerSystemDefinition;

    private iterationCount:number = 3;
    private library:LindenmayerSystemLibraryDefinition[];
    private selectedPredefinedDefinition:string;

    private processResult(resultProcessor:ILindenmayerSystemResultProcessor, result:string): void {
        for (var char of result) {
            switch (char) {
                case "0": // brown
                    resultProcessor.setColour("#663300");
                    break;
                case "1": // dark green
                    resultProcessor.setColour("#003300");
                    break;
                case "2": // light green
                    resultProcessor.setColour("#008000");
                    break;
                case "A":
                case "B":
                case "F":
                    resultProcessor.moveForward(10);
                    break;
                case "+":
                    resultProcessor.rotate(-this.lindenmayerSystemDefinition.turningAngle);
                    break;
                case "-":
                    resultProcessor.rotate(this.lindenmayerSystemDefinition.turningAngle);
                    break;
                case "[":
                    resultProcessor.savePosition();
                    break;
                case "]":
                    resultProcessor.restorePosition();
                    break;
            }
        }
    }

    addRule(): void {
        this.lindenmayerSystemDefinition.addRule();
    };

    deleteRule(index: number): void {
        this.lindenmayerSystemDefinition.deleteRule(index);
    };

    loadAndRender():void {
        this.loadFromLibrary();
        this.processDefinition();
    };

    loadFromLibrary():void {
        var chosenDefinition = this.library.filter((x) => x.title === this.selectedPredefinedDefinition)[0];

        this.lindenmayerSystemDefinition.axiom = chosenDefinition.axiom;
        this.lindenmayerSystemDefinition.constants = chosenDefinition.constants;
        this.lindenmayerSystemDefinition.startDirection = chosenDefinition.startDirection;
        this.lindenmayerSystemDefinition.turningAngle = chosenDefinition.turningAngle;
        this.iterationCount = chosenDefinition.suggestedIterationCount;

        if (chosenDefinition.rules) {
            this.lindenmayerSystemDefinition.rules = chosenDefinition.rules.map((r) => new LindenmayerSystemRule(r.input, r.output));
        }
    }

    processDefinition(): void {
        var canvas = <HTMLCanvasElement> document.getElementById('canvas');
        var canvasContext = canvas.getContext('2d');
        canvasContext.beginPath();
        canvasContext.setTransform(1, 0, 0, 1, 0, 0);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.closePath();

        var validationResult = this.lindenmayerSystemValidator.validate(this.lindenmayerSystemDefinition);
        if (validationResult.result === true && this.iterationCount > 0) {
            // Iterate over the axiom and generated results 'iterationCount' times....
            var result = this.lindenmayerSystemRulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);

            // Calculate the space/rectangular-size required to draw the resultant shape
            var lindenmayerSystemResultBoundaryCalculator = this.lindenmayerSystemResultBoundaryCalculatorFactory.Create(this.lindenmayerSystemDefinition.startDirection);
            this.processResult(lindenmayerSystemResultBoundaryCalculator, result);

            var diffX = lindenmayerSystemResultBoundaryCalculator.maxX - lindenmayerSystemResultBoundaryCalculator.minX;
            var diffY = lindenmayerSystemResultBoundaryCalculator.maxY - lindenmayerSystemResultBoundaryCalculator.minY;

            var scale:number = Math.min(canvas.width / diffX, canvas.height / diffY);
            var startX:number = -1 * lindenmayerSystemResultBoundaryCalculator.minX;
            var startY:number = -1 * lindenmayerSystemResultBoundaryCalculator.minY;

            // scale the canvas to fit the size required
            canvasContext.scale(scale, scale);
            canvasContext.strokeStyle  = "#000000";

            // render the results on screen...
            var lindenmayerSystemResultRenderer = this.lindenmayerSystemResultRendererFactory.Create(canvasContext, startX, startY, this.lindenmayerSystemDefinition.startDirection);
            this.processResult(lindenmayerSystemResultRenderer, result);
        } else {
            // TODO: show errors etc
        }
    };
}

bootstrap(AppComponent, [
    LindenmayerSystemRulesProcessor,
    LindenmayerSystemValidator,
    PositionCalculator,
    LindenmayerSystemResultBoundaryCalculatorFactory,
    LindenmayerSystemResultRendererFactory,
    LindenmayerSystemResultBoundaryCalculator,
    LindenmayerSystemResultRenderer,
    LindenmayerSystemLibrary
]);