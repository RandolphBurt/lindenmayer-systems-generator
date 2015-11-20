import {bootstrap, Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import {LindenmayerSystemDefinition} from './LindenmayerSystemDefinition'
import {LindenmayerSystemRulesProcessor} from './LindenmayerSystemRulesProcessor'
import {LindenmayerSystemValidator} from "./LindenmayerSystemValidator";
import {PositionCalculator} from "./PositionCalculator";
import {LindenmayerSystemResultBoundaryCalculator} from "./LindenmayerSystemResultBoundaryCalculator";
import {LindenmayerSystemResultRenderer} from "./LindenmayerSystemResultRenderer";


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
            <canvas id="canvas" width="500" height="500"></canvas>
        </div>
    `,
    styles: [`
    `],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
class AppComponent {

    constructor(_lindenmayerSystemRulesProcessor:LindenmayerSystemRulesProcessor,
                _lindenmayerSystemValidator:LindenmayerSystemValidator) {
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
    }

    lindenmayerSystemRulesProcessor:LindenmayerSystemRulesProcessor;
    lindenmayerSystemValidator:LindenmayerSystemValidator;

    lindenmayerSystemDefinition:LindenmayerSystemDefinition = new LindenmayerSystemDefinition();
    iterationCount:number;

    addRule() {
        this.lindenmayerSystemDefinition.addRule();
    };
    deleteRule(index: number) {
        this.lindenmayerSystemDefinition.deleteRule(index);
    };
    processDefinition() {
        var validationResult = this.lindenmayerSystemValidator.validate(this.lindenmayerSystemDefinition);
        if (validationResult.result === true && this.iterationCount > 0) {
            this.lindenmayerSystemRulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);
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