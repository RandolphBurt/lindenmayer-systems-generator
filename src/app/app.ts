import {bootstrap, Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

class Rule {
    input: string;
    output: string;
}
class LindenmayerSystem {
    axiom: string;
    constants: string;
    rules: Rule[];
}

@Component({
    selector: 'my-app',
    template: `
        <div><label>Axiom:</label><input [(ng-model)]="lindenmayerSystem.axiom"></div>
        <div><label>Constants:</label><input [(ng-model)]="lindenmayerSystem.constants"></div>
            <div *ng-for="#rule of lindenmayerSystem.rules; #i = index">
                <label>Rule {{i + 1}}:</label><input [(ng-model)]="rule.input">
                <span>=</span>
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
    public lindenmayerSystem:LindenmayerSystem = {
        axiom: "FX",
        constants: "",
        rules: [],
    };

    addRule() {
        this.lindenmayerSystem.rules.push(new Rule());
    };
    deleteRule(index: number) {
        this.lindenmayerSystem.rules.splice(index, 1);
    }
}
bootstrap(AppComponent);