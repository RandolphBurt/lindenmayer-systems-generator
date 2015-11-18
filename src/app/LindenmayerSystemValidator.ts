import {LindenmayerSystemDefinition} from "./LindenmayerSystemDefinition";
import {LindenmayerSystemRule} from "./LindenmayerSystemDefinition";

export class LindenmayerSystemValidator {

    private isCharacterPresentInRuleOutput(character:string, definition:LindenmayerSystemDefinition):boolean {
        return definition.rules && definition.rules.filter(r => r.output.indexOf(character) > -1).length > 0;
    }

    private isCharacterEqualToRuleInput(character:string, definition:LindenmayerSystemDefinition):boolean {
        return definition.rules && definition.rules.filter(r => r.input === character).length > 0;
    }

    private isCharacterPresentInConstants(character:string, definition:LindenmayerSystemDefinition):boolean {
        return definition.constants && definition.constants.indexOf(character) > -1;
    }

    private isCharacterPresentInConstantsOrRuleInput(character:string, definition:LindenmayerSystemDefinition):boolean {
        return  this.isCharacterPresentInConstants(character, definition) ||
                this.isCharacterEqualToRuleInput(character, definition);
    }

    validate(definition:LindenmayerSystemDefinition):ValidationResult {
        var errorList:string[] = [];

        if (!definition.axiom) {
            errorList.push("No axiom has been defined");
        } else {
            for (var axiomChar of definition.axiom) {
                if (!this.isCharacterPresentInConstantsOrRuleInput(axiomChar, definition)) {
                    errorList.push("No rules/constants found for axiom value '" + axiomChar + "'");
                }
            }
        }

        if (definition.constants) {
            for (var cons of definition.constants) {
                if (!this.isCharacterPresentInRuleOutput(cons, definition) &&
                    (!definition.axiom || definition.axiom.indexOf(cons) === -1)) {
                    errorList.push("Constant '" + cons + "' is not part of the axiom and appears in no rules");
                }
            }
        }

        var i:number = 0;
        for (var testRule of definition.rules) {
            i++;
            var stopProcessing:boolean = false;

            if (!testRule.input) {
                errorList.push("Rule input must be one character in length - rule " + i + "'s input is empty");
                stopProcessing = true;
            } else {
                if (testRule.input.length > 1) {
                    errorList.push("Rule input must be one character in length - rule " + i + "'s input is too long");
                    stopProcessing = true;
                }

                if (testRule.input.length > 0 && testRule.input === testRule.output) {
                    errorList.push("Rule " + i + " has an input equal to the output");
                    stopProcessing = true;
                }

                if (this.isCharacterPresentInConstants(testRule.input, definition)) {
                    errorList.push("Character '" + testRule.input + "' is a constant and a rule input");
                    stopProcessing = true;
                }
            }

            if (!testRule.output) {
                errorList.push("Rule output must not be empty - rule " + i + "'s output is empty");
                stopProcessing = true;
            } else {
                for (var outputChar of testRule.output) {
                    if (!this.isCharacterPresentInConstantsOrRuleInput(outputChar, definition)) {
                        errorList.push("Character '" + outputChar + "' in rule " + i + " does not map to a constant or rule");
                        stopProcessing = true;
                    }
                }
            }

            if (stopProcessing) {
                continue;
            }

            if (definition.rules.filter((r) => r.input === testRule.input).length > 1) {
                var error = "There are multiple rules with the same input value of '" + testRule.input + "'";
                if (errorList.indexOf(error) === -1) {
                    // we'll get the same error raised twice (e.g. A.input === B.input and vice versa) so we only add once
                    errorList.push(error);
                }
            }
        }

        return new ValidationResult(errorList.length === 0, errorList);
    }
}

export class ValidationResult {
    result:boolean;
    errors:string[];

    constructor(_result:boolean, _errors?:string[]) {
        this.result = _result;
        this.errors = _errors || [];
    }
}