import {bootstrap, Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import {LindenmayerSystemDefinition} from './LindenmayerSystemDefinition'
import {LindenmayerSystemRulesProcessor} from './LindenmayerSystemRulesProcessor'
import {LindenmayerSystemValidator} from "./LindenmayerSystemValidator";
import {PositionCalculator} from "./PositionCalculator";
import {LindenmayerSystemResultBoundaryCalculator} from "./LindenmayerSystemResultBoundaryCalculator";
import {LindenmayerSystemResultRenderer} from "./LindenmayerSystemResultRenderer";
import {ILindenmayerSystemResultProcessor} from "./ILindenmayerSystemResultProcessor";


@Component({
    selector: 'my-app',
    template: `
        <div><label>Axiom:</label><input [(ng-model)]="lindenmayerSystemDefinition.axiom"></div>
        <div><label>Constants:</label><input [(ng-model)]="lindenmayerSystemDefinition.constants"></div>
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
            <input [(ng-model)]="iterationCount">
            <input type="button" value="Draw" (click)="processDefinition()">
        </div>
        <div>
            <canvas id="canvas" class="canvas" width="500" height="500"></canvas>
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
                _lindenmayerSystemResultBoundaryCalculator:LindenmayerSystemResultBoundaryCalculator,
                _lindenmayerSystemResultRenderer:LindenmayerSystemResultRenderer) {
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
        this.lindenmayerSystemResultBoundaryCalculator = _lindenmayerSystemResultBoundaryCalculator;
        this.lindenmayerSystemResultRenderer = _lindenmayerSystemResultRenderer;

        // TODO: TEMP
        this.lindenmayerSystemDefinition.axiom = "F";
        this.lindenmayerSystemDefinition.constants = "+-";
        this.lindenmayerSystemDefinition.addRule()
        this.lindenmayerSystemDefinition.rules[0].input = "F";
        this.lindenmayerSystemDefinition.rules[0].output = "F+F-F-F+F";
    }

    private lindenmayerSystemRulesProcessor:LindenmayerSystemRulesProcessor;
    private lindenmayerSystemValidator:LindenmayerSystemValidator;
    private lindenmayerSystemResultBoundaryCalculator:LindenmayerSystemResultBoundaryCalculator;
    private lindenmayerSystemResultRenderer:LindenmayerSystemResultRenderer;

    private lindenmayerSystemDefinition:LindenmayerSystemDefinition = new LindenmayerSystemDefinition();

    private iterationCount:number = 3;

    private processResult(resultProcessor:ILindenmayerSystemResultProcessor, result:string): void {
        for (var char of result) {
            switch (char) {
                case "F":
                    resultProcessor.moveForward(10);
                    break;
                case "+":
                    resultProcessor.rotate(-90);
                    break;
                case "-":
                    resultProcessor.rotate(90);
                    break;
            }
        }
    }

    addRule() {
        this.lindenmayerSystemDefinition.addRule();
    };

    deleteRule(index: number) {
        this.lindenmayerSystemDefinition.deleteRule(index);
    };

    processDefinition() {
        var canvas = document.getElementById('canvas');
        var canvasContext = canvas.getContext('2d');
        canvasContext.beginPath();
        canvasContext.setTransform(1, 0, 0, 1, 0, 0);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.closePath();

        var validationResult = this.lindenmayerSystemValidator.validate(this.lindenmayerSystemDefinition);
        if (validationResult.result === true && this.iterationCount > 0) {
            var result = this.lindenmayerSystemRulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);

            var resultProcessor:ILindenmayerSystemResultProcessor = this.lindenmayerSystemResultBoundaryCalculator;
            this.lindenmayerSystemResultBoundaryCalculator.initialise();
            this.processResult(resultProcessor, result);

            var diffX = this.lindenmayerSystemResultBoundaryCalculator.maxX - this.lindenmayerSystemResultBoundaryCalculator.minX;
            var diffY = this.lindenmayerSystemResultBoundaryCalculator.maxY - this.lindenmayerSystemResultBoundaryCalculator.minY;

            var scale:number = Math.min(canvas.width / diffX, canvas.height / diffY);
            var startX:number = -1 * this.lindenmayerSystemResultBoundaryCalculator.minX;
            var startY:number = -1 * this.lindenmayerSystemResultBoundaryCalculator.minY;

            canvasContext.scale(scale, scale);

            this.lindenmayerSystemResultRenderer.initialise(canvasContext, startX, startY);
            resultProcessor = this.lindenmayerSystemResultRenderer;
            this.processResult(resultProcessor, result);
        } else {
            // TODO: show errors etc
        }
    };
}

bootstrap(AppComponent, [
    LindenmayerSystemRulesProcessor,
    LindenmayerSystemValidator,
    PositionCalculator,
    LindenmayerSystemResultBoundaryCalculator,
    LindenmayerSystemResultRenderer
]);