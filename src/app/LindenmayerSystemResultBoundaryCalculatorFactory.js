var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var LindenmayerSystemResultBoundaryCalculator_1 = require("./LindenmayerSystemResultBoundaryCalculator");
var PositionCalculator_1 = require("./PositionCalculator");
var LindenmayerSystemResultBoundaryCalculatorFactory = (function () {
    function LindenmayerSystemResultBoundaryCalculatorFactory(_positionCalculator) {
        this.positionCalculator = _positionCalculator;
    }
    LindenmayerSystemResultBoundaryCalculatorFactory.prototype.Create = function () {
        return new LindenmayerSystemResultBoundaryCalculator_1.LindenmayerSystemResultBoundaryCalculator(this.positionCalculator);
    };
    LindenmayerSystemResultBoundaryCalculatorFactory = __decorate([
        __param(0, core_1.Inject(PositionCalculator_1.PositionCalculator)), 
        __metadata('design:paramtypes', [PositionCalculator_1.PositionCalculator])
    ], LindenmayerSystemResultBoundaryCalculatorFactory);
    return LindenmayerSystemResultBoundaryCalculatorFactory;
})();
exports.LindenmayerSystemResultBoundaryCalculatorFactory = LindenmayerSystemResultBoundaryCalculatorFactory;
//# sourceMappingURL=LindenmayerSystemResultBoundaryCalculatorFactory.js.map