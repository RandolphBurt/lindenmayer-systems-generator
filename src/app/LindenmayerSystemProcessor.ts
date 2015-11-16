import {LindenmayerSystemDefinition} from "./LindenmayerSystemDefinition";
import {LindenmayerSystemRule} from "./LindenmayerSystemDefinition";

export class LindenmayerSystemProcessor {
    private validateRule(rule:LindenmayerSystemRule) {

    }

    validate(definition:LindenmayerSystemDefinition) {
        for (var i = 0; i < definition.rules.length; i++) {
            for (var j = 0; j < definition.rules.length; j++) {

            }
        }

        return new ValidationResult(false);
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