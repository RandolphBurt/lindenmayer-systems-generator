import { LindenmayerSystemDefinition } from '../data-definitions/lindenmayer-system-definition';
import { ValidationResult } from './validation-result';

export class DefinitionValidator {

    private isCharacterPresentInRuleOutput(character: string, definition: LindenmayerSystemDefinition): boolean {
        return definition.rules && definition.rules.filter(r => r.output.indexOf(character) > -1).length > 0;
    }

    private isCharacterEqualToRuleInput(character: string, definition: LindenmayerSystemDefinition): boolean {
        return definition.rules && definition.rules.filter(r => r.input === character).length > 0;
    }

    private isCharacterPresentInConstants(character: string, definition: LindenmayerSystemDefinition): boolean {
        return definition.constants && definition.constants.indexOf(character) > -1;
    }

    private isCharacterPresentInConstantsOrRuleInput(character: string, definition: LindenmayerSystemDefinition): boolean {
        return  this.isCharacterPresentInConstants(character, definition) ||
                this.isCharacterEqualToRuleInput(character, definition);
    }

    validate(definition: LindenmayerSystemDefinition): ValidationResult {
        let errorList: string[] = [];

        if (!definition.axiom) {
            errorList.push('No axiom has been defined');
        } else {
            for (let axiomChar of definition.axiom) {
                if (!this.isCharacterPresentInConstantsOrRuleInput(axiomChar, definition)) {
                    errorList.push('No rules/constants found for axiom value \'' + axiomChar + '\'');
                }
            }
        }

        if (definition.constants) {
            for (let cons of definition.constants) {
                if (!this.isCharacterPresentInRuleOutput(cons, definition) &&
                    (!definition.axiom || definition.axiom.indexOf(cons) === -1)) {
                    errorList.push('Constant \'' + cons + '\' is not part of the axiom and appears in no rules');
                }
            }
        }

        let i = 0;
        for (let testRule of definition.rules || []) {
            i++;
            if (!testRule.input) {
                errorList.push('Rule input must be one character in length - rule ' + i + '\'s input is empty');
            } else {
                if (testRule.input.length > 1) {
                    errorList.push('Rule input must be one character in length - rule ' + i + '\'s input is too long');
                }

                if (testRule.input.length > 0 && testRule.input === testRule.output) {
                    errorList.push('Rule ' + i + ' has an input equal to the output');
                }

                if (this.isCharacterPresentInConstants(testRule.input, definition)) {
                    errorList.push('Character \'' + testRule.input + '\' is a constant and a rule input');
                }
            }

            if (!testRule.output) {
                errorList.push('Rule output must not be empty - rule ' + i + '\'s output is empty');
            } else {
                for (let outputChar of testRule.output) {
                    if (!this.isCharacterPresentInConstantsOrRuleInput(outputChar, definition)) {
                        errorList.push('Character \'' + outputChar + '\' in rule ' + i + ' does not map to a constant or rule');
                    }
                }
            }

            if (definition.rules.filter((r) => r.input === testRule.input).length > 1) {
                let error = 'There are multiple rules with the same input value of \'' + testRule.input + '\'';
                if (errorList.indexOf(error) === -1) {
                    // we'll get the same error raised twice (e.g. A.input === B.input and vice versa) so we only add once
                    errorList.push(error);
                }
            }
        }

        return new ValidationResult(errorList.length === 0, errorList);
    }
}
