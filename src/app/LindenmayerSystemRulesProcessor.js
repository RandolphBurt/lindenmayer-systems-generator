var LindenmayerSystemRulesProcessor = (function () {
    function LindenmayerSystemRulesProcessor() {
    }
    LindenmayerSystemRulesProcessor.prototype.processCharacter = function (definition) {
        return function (c) {
            if (definition.constants && definition.constants.indexOf(c) > -1) {
                return c;
            }
            else {
                return definition.rules.filter(function (x) { return x.input === c; })[0].output;
            }
        };
    };
    LindenmayerSystemRulesProcessor.prototype.processSequence = function (definition, sequence) {
        return sequence
            .split("")
            .map(this.processCharacter(definition))
            .join("");
    };
    LindenmayerSystemRulesProcessor.prototype.process = function (definition, iterationCount) {
        var result = definition.axiom;
        for (var i = 0; i < iterationCount; i++) {
            result = this.processSequence(definition, result);
        }
        return result;
    };
    return LindenmayerSystemRulesProcessor;
})();
exports.LindenmayerSystemRulesProcessor = LindenmayerSystemRulesProcessor;
//# sourceMappingURL=LindenmayerSystemRulesProcessor.js.map