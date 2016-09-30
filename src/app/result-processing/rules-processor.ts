import { LindenmayerSystemDefinition } from '../data-definitions/lindenmayer-system-definition';

export class RulesProcessor {

    private processCharacter(definition: LindenmayerSystemDefinition) {
        return (c: string) => {
            if (definition.constants && definition.constants.indexOf(c) > -1) {
                return c;
            } else {
                return definition.rules.filter((x) => x.input === c)[0].output;
            }
        };
    }

    private processSequence(definition: LindenmayerSystemDefinition, sequence: string) {
        return sequence
            .split('')
            .map(this.processCharacter(definition))
            .join('');
    }

    process(definition: LindenmayerSystemDefinition, iterationCount: number): string {
        let result = definition.axiom;

        for (let i = 0; i < iterationCount; i++) {
            result = this.processSequence(definition, result);
        }

        return result;
    }
}
