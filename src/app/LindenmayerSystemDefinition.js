var LindenmayerSystemDefinition = (function () {
    function LindenmayerSystemDefinition() {
    }
    LindenmayerSystemDefinition.prototype.addRule = function () {
        if (!this.rules) {
            this.rules = [];
        }
        this.rules.push(new LindenmayerSystemRule());
    };
    LindenmayerSystemDefinition.prototype.deleteRule = function (index) {
        this.rules.splice(index, 1);
    };
    return LindenmayerSystemDefinition;
})();
exports.LindenmayerSystemDefinition = LindenmayerSystemDefinition;
var LindenmayerSystemRule = (function () {
    function LindenmayerSystemRule(_input, _output) {
        this.input = _input;
        this.output = _output;
    }
    return LindenmayerSystemRule;
})();
exports.LindenmayerSystemRule = LindenmayerSystemRule;
//# sourceMappingURL=LindenmayerSystemDefinition.js.map