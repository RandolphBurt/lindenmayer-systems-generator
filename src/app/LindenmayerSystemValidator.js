var LindenmayerSystemValidator = (function () {
    function LindenmayerSystemValidator() {
    }
    LindenmayerSystemValidator.prototype.isCharacterPresentInRuleOutput = function (character, definition) {
        return definition.rules && definition.rules.filter(function (r) { return r.output.indexOf(character) > -1; }).length > 0;
    };
    LindenmayerSystemValidator.prototype.isCharacterEqualToRuleInput = function (character, definition) {
        return definition.rules && definition.rules.filter(function (r) { return r.input === character; }).length > 0;
    };
    LindenmayerSystemValidator.prototype.isCharacterPresentInConstants = function (character, definition) {
        return definition.constants && definition.constants.indexOf(character) > -1;
    };
    LindenmayerSystemValidator.prototype.isCharacterPresentInConstantsOrRuleInput = function (character, definition) {
        return this.isCharacterPresentInConstants(character, definition) ||
            this.isCharacterEqualToRuleInput(character, definition);
    };
    LindenmayerSystemValidator.prototype.validate = function (definition) {
        var errorList = [];
        if (!definition.axiom) {
            errorList.push("No axiom has been defined");
        }
        else {
            for (var _i = 0, _a = definition.axiom; _i < _a.length; _i++) {
                var axiomChar = _a[_i];
                if (!this.isCharacterPresentInConstantsOrRuleInput(axiomChar, definition)) {
                    errorList.push("No rules/constants found for axiom value '" + axiomChar + "'");
                }
            }
        }
        if (definition.constants) {
            for (var _b = 0, _c = definition.constants; _b < _c.length; _b++) {
                var cons = _c[_b];
                if (!this.isCharacterPresentInRuleOutput(cons, definition) &&
                    (!definition.axiom || definition.axiom.indexOf(cons) === -1)) {
                    errorList.push("Constant '" + cons + "' is not part of the axiom and appears in no rules");
                }
            }
        }
        var i = 0;
        for (var _d = 0, _e = definition.rules; _d < _e.length; _d++) {
            var testRule = _e[_d];
            i++;
            var stopProcessing = false;
            if (!testRule.input) {
                errorList.push("Rule input must be one character in length - rule " + i + "'s input is empty");
                stopProcessing = true;
            }
            else {
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
            }
            else {
                for (var _f = 0, _g = testRule.output; _f < _g.length; _f++) {
                    var outputChar = _g[_f];
                    if (!this.isCharacterPresentInConstantsOrRuleInput(outputChar, definition)) {
                        errorList.push("Character '" + outputChar + "' in rule " + i + " does not map to a constant or rule");
                        stopProcessing = true;
                    }
                }
            }
            if (stopProcessing) {
                continue;
            }
            if (definition.rules.filter(function (r) { return r.input === testRule.input; }).length > 1) {
                var error = "There are multiple rules with the same input value of '" + testRule.input + "'";
                if (errorList.indexOf(error) === -1) {
                    // we'll get the same error raised twice (e.g. A.input === B.input and vice versa) so we only add once
                    errorList.push(error);
                }
            }
        }
        return new ValidationResult(errorList.length === 0, errorList);
    };
    return LindenmayerSystemValidator;
})();
exports.LindenmayerSystemValidator = LindenmayerSystemValidator;
var ValidationResult = (function () {
    function ValidationResult(_result, _errors) {
        this.result = _result;
        this.errors = _errors || [];
    }
    return ValidationResult;
})();
exports.ValidationResult = ValidationResult;
//# sourceMappingURL=LindenmayerSystemValidator.js.map