import {bootstrap, Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import {LindenmayerSystemDefinition} from './LindenmayerSystemDefinition'
import {LindenmayerSystemProcessor} from './LindenmayerSystemProcessor'
import {LindenmayerSystemValidator} from "./LindenmayerSystemValidator";


@Component({
    selector: 'my-app',
    template: `
        <div><label>Axiom:</label><input [(ng-model)]="lindenmayerSystem.axiom"></div>
        <div><label>Constants:</label><input [(ng-model)]="lindenmayerSystem.constants"></div>
            <div *ng-for="#rule of lindenmayerSystem.rules; #i = index">
                <label>Rule {{i + 1}}:</label><input [(ng-model)]="rule.input">
                <span>=&gt;</span>
                <input [(ng-model)]="rule.output">
                <input type="button" value="X" (click)="deleteRule(i)">
            </div>
        <div>
            <input type="button" value="Add Rule" (click)="addRule()">
        </div>
    `,
    styles: [`
    `],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
class AppComponent {

    constructor(_lindenmayerSystemProcessor:LindenmayerSystemProcessor,
                _lindenmayerSystemValidator:LindenmayerSystemValidator) {
        this.lindenmayerSystemProcessor = _lindenmayerSystemProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
    }

    lindenmayerSystemProcessor:LindenmayerSystemProcessor;
    lindenmayerSystemValidator:LindenmayerSystemValidator;

    lindenmayerSystem:LindenmayerSystemDefinition = new LindenmayerSystemDefinition();

    addRule() {
        this.lindenmayerSystem.addRule();
    };
    deleteRule(index: number) {
        this.lindenmayerSystem.deleteRule(index);
    }

}

bootstrap(AppComponent, [LindenmayerSystemProcessor]);