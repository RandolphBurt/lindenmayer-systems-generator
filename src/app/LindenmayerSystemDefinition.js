var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var LindenmayerSystemLibraryDefinition = (function (_super) {
    __extends(LindenmayerSystemLibraryDefinition, _super);
    function LindenmayerSystemLibraryDefinition(_title, _suggestedIterationCount, _axiom, _constants, _turningAngle, _startDirection, _rules) {
        _super.call(this);
        this.title = _title;
        this.suggestedIterationCount = _suggestedIterationCount;
        this.axiom = _axiom;
        this.turningAngle = _turningAngle;
        this.constants = _constants;
        this.startDirection = _startDirection;
        this.rules = _rules;
    }
    return LindenmayerSystemLibraryDefinition;
})(LindenmayerSystemDefinition);
exports.LindenmayerSystemLibraryDefinition = LindenmayerSystemLibraryDefinition;
//# sourceMappingURL=LindenmayerSystemDefinition.js.map