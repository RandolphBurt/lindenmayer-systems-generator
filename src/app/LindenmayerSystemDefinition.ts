export class LindenmayerSystemDefinition {
    axiom: string;
    turningAngle: number;
    constants: string;
    rules: LindenmayerSystemRule[];

    addRule() {
        if (!this.rules) {
            this.rules = [];
        }
        this.rules.push(new LindenmayerSystemRule());
    }

    deleteRule(index: number) {
        this.rules.splice(index, 1);
    }
}

export class LindenmayerSystemRule {
    input: string;
    output: string;
    constructor(_input?:string, _output?:string) {
        this.input = _input;
        this.output = _output;
    }
}

export class LindenmayerSystemLibraryDefinition extends LindenmayerSystemDefinition {
    title: string;
    suggestedIterationCount:number;

    constructor(_title:string, _suggestedIterationCount:number, _axiom:string, _constants:string, _turningAngle:number, _rules:LindenmayerSystemRule[]) {
        super();
        this.title = _title;
        this.suggestedIterationCount = _suggestedIterationCount;
        this.axiom = _axiom;
        this.turningAngle = _turningAngle;
        this.constants = _constants;
        this.rules = _rules;
    }
}