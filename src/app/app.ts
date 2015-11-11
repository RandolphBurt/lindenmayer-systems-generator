import {bootstrap, Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import {LindenmayerSystemProcessor} from './LindenmayerSystemProcessor'

class Rule {
    input: string;
    output: string;
}
class LindenmayerSystem {
    axiom: string;
    constants: string;
    rules: Rule[];

    addRule() {
        if (!this.rules) {
            this.rules = [];
        }
        this.rules.push(new Rule());
    }

    deleteRule(index: number) {
        this.rules.splice(index, 1);
    }
}

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

    constructor(_lindenmayerSystemProcessor:LindenmayerSystemProcessor) {
        this.lindenmayerSystemProcessor = _lindenmayerSystemProcessor;
    }

    lindenmayerSystemProcessor:LindenmayerSystemProcessor;

    lindenmayerSystem:LindenmayerSystem = new LindenmayerSystem();

    addRule() {
        this.lindenmayerSystem.addRule();
    };
    deleteRule(index: number) {
        this.lindenmayerSystem.deleteRule(index);
    }

}

bootstrap(AppComponent, [LindenmayerSystemProcessor]);