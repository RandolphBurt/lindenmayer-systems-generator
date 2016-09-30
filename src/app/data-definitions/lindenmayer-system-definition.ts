import { LindenmayerSystemRule } from './lindenmayer-system-rule';

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
