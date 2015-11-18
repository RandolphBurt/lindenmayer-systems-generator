import {LindenmayerSystemDefinition} from "./LindenmayerSystemDefinition";
import {LindenmayerSystemRule} from "./LindenmayerSystemDefinition";

export class LindenmayerSystemProcessor {

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

                if (definition.constants && definition.constants.indexOf(testRule.input) > -1) {
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

            var j:number = 0;
            for (var compareRule of definition.rules) {
                j++;
                if (i === j) {
                    continue;
                }

                if (compareRule.input === testRule.input && i < j) {
                    // check i < j to avoid duplicate error messages
                    errorList.push("There are multiple rules with the same input value of '" + compareRule.input + "'");
                }
            }
        }

        return new ValidationResult(errorList.length === 0, errorList);
    }

    process(definition:LindenmayerSystemDefinition) {

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