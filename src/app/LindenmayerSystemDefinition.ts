export class LindenmayerSystemDefinition {
    axiom: string;
    startDirection: number;
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
