var LindenmayerSystemProcessor = (function () {
    function LindenmayerSystemProcessor() {
    }
    LindenmayerSystemProcessor.prototype.validateRule = function (rule) {
    };
    LindenmayerSystemProcessor.prototype.validate = function (definition) {
        for (var i = 0; i < definition.rules.length; i++) {
            for (var j = 0; j < definition.rules.length; j++) {
            }
        }
        return new ValidationResult(false);
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