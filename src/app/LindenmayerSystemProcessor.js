var LindenmayerSystemProcessor = (function () {
    function LindenmayerSystemProcessor() {
    }
    LindenmayerSystemProcessor.prototype.isCharacterPresentInRuleOutput = function (character, definition) {
        return definition.rules && definition.rules.filter(function (r) { return r.output.indexOf(character) > -1; }).length > 0;
    };
    LindenmayerSystemProcessor.prototype.isCharacterEqualToRuleInput = function (character, definition) {
        return definition.rules && definition.rules.filter(function (r) { return r.input === character; }).length > 0;
    };
    LindenmayerSystemProcessor.prototype.isCharacterPresentInConstants = function (character, definition) {
        return definition.constants && definition.constants.indexOf(character) > -1;
    };
    LindenmayerSystemProcessor.prototype.isCharacterPresentInConstantsOrRuleInput = function (character, definition) {
        return this.isCharacterPresentInConstants(character, definition) ||
            this.isCharacterEqualToRuleInput(character, definition);
    };
    LindenmayerSystemProcessor.prototype.validate = function (definition) {
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
                if (definition.constants && definition.constants.indexOf(testRule.input) > -1) {
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
            var j = 0;
            for (var _h = 0, _j = definition.rules; _h < _j.length; _h++) {
                var compareRule = _j[_h];
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
    };
    LindenmayerSystemProcessor.prototype.process = function (definition) {
    };
    return LindenmayerSystemProcessor;
})();
exports.LindenmayerSystemProcessor = LindenmayerSystemProcessor;
var ValidationResult = (function () {
    function ValidationResult(_result, _errors) {
        this.result = _result;
        this.errors = _errors || [];
    }
    return ValidationResult;
})();
exports.ValidationResult = ValidationResult;
//# sourceMappingURL=LindenmayerSystemProcessor.js.map