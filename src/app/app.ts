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
import {LindenmayerSystemResultParser} from "./LindenmayerSystemResultParser";


@Component({
    selector: 'lindenmayer-system-editor',
    templateUrl: 'templates/lindenmayer-system.html',
    styles: [`
        .canvas { background-color: grey }
        .busy {cursor:wait}
    `],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
class AppComponent {
    constructor(_lindenmayerSystemRulesProcessor:LindenmayerSystemRulesProcessor,
                _lindenmayerSystemValidator:LindenmayerSystemValidator,
                _lindenmayerSystemLibrary:LindenmayerSystemLibrary,
                _lindenmayerSystemResultBoundaryCalculatorFactory:LindenmayerSystemResultBoundaryCalculatorFactory,
                _lindenmayerSystemResultRendererFactory:LindenmayerSystemResultRendererFactory,
                _lindenmayerSystemResultParser:LindenmayerSystemResultParser) {
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
        this.lindenmayerSystemResultBoundaryCalculatorFactory = _lindenmayerSystemResultBoundaryCalculatorFactory;
        this.lindenmayerSystemResultRendererFactory = _lindenmayerSystemResultRendererFactory;
        this.lindenmayerSystemResultParser = _lindenmayerSystemResultParser;

        this.library = _lindenmayerSystemLibrary.definitions;
        this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition();
        this.selectedPredefinedDefinition = this.library[0].title;
        this.loadAndRender();
    }

    private lindenmayerSystemResultParser:LindenmayerSystemResultParser;
    private lindenmayerSystemRulesProcessor:LindenmayerSystemRulesProcessor;
    private lindenmayerSystemValidator:LindenmayerSystemValidator;
    private lindenmayerSystemResultBoundaryCalculatorFactory:LindenmayerSystemResultBoundaryCalculatorFactory;
    private lindenmayerSystemResultRendererFactory:LindenmayerSystemResultRendererFactory;
    private lindenmayerSystemDefinition:LindenmayerSystemDefinition;
    private showBusy:boolean = false;
    private iterationCount:number = 3;
    private library:LindenmayerSystemLibraryDefinition[];
    private selectedPredefinedDefinition:string;

    private processDefinition(): void {
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
            var lindenmayerSystemResultBoundaryCalculator = this.lindenmayerSystemResultBoundaryCalculatorFactory.Create();
            this.lindenmayerSystemResultParser.parseResult(lindenmayerSystemResultBoundaryCalculator, this.lindenmayerSystemDefinition, result);

            var diffX = lindenmayerSystemResultBoundaryCalculator.maxX - lindenmayerSystemResultBoundaryCalculator.minX;
            var diffY = lindenmayerSystemResultBoundaryCalculator.maxY - lindenmayerSystemResultBoundaryCalculator.minY;

            var scale:number = Math.min(canvas.width / diffX, canvas.height / diffY);
            var startX:number = (-1 * lindenmayerSystemResultBoundaryCalculator.minX) + (0.5 * ((canvas.width / scale) - diffX));
            var startY:number = (-1 * lindenmayerSystemResultBoundaryCalculator.minY) + (0.5 * ((canvas.height / scale) - diffY));

            // scale the canvas to fit the size required
            canvasContext.scale(scale, scale);
            canvasContext.strokeStyle  = "#000000";

            // render the results on screen...
            var lindenmayerSystemResultRenderer = this.lindenmayerSystemResultRendererFactory.Create(canvasContext, startX, startY);
            this.lindenmayerSystemResultParser.parseResult(lindenmayerSystemResultRenderer, this.lindenmayerSystemDefinition, result);
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
        var chosenDefinition = this.library.filter((x) => x.title === this.selectedPredefinedDefinition)[0];

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

bootstrap(AppComponent, [
    LindenmayerSystemRulesProcessor,
    LindenmayerSystemValidator,
    PositionCalculator,
    LindenmayerSystemResultBoundaryCalculatorFactory,
    LindenmayerSystemResultRendererFactory,
    LindenmayerSystemResultBoundaryCalculator,
    LindenmayerSystemResultRenderer,
    LindenmayerSystemLibrary,
    LindenmayerSystemResultParser
]);