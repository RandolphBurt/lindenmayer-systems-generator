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
var LindenmayerSystemResultRenderer_1 = require("./LindenmayerSystemResultRenderer");
var PositionCalculator_1 = require("./PositionCalculator");
var PositionData_1 = require("./PositionData");
var LindenmayerSystemResultRendererFactory = (function () {
    function LindenmayerSystemResultRendererFactory(_positionCalculator) {
        this.positionCalculator = _positionCalculator;
    }
    LindenmayerSystemResultRendererFactory.prototype.Create = function (canvasContext, x, y, facing) {
        var position = new PositionData_1.PositionData();
        position.x = x;
        position.y = y;
        position.facing = facing;
        canvasContext.moveTo(x, y);
        return new LindenmayerSystemResultRenderer_1.LindenmayerSystemResultRenderer(this.positionCalculator, canvasContext, position);
    };
    LindenmayerSystemResultRendererFactory = __decorate([
        __param(0, core_1.Inject(PositionCalculator_1.PositionCalculator)), 
        __metadata('design:paramtypes', [PositionCalculator_1.PositionCalculator])
    ], LindenmayerSystemResultRendererFactory);
    return LindenmayerSystemResultRendererFactory;
})();
exports.LindenmayerSystemResultRendererFactory = LindenmayerSystemResultRendererFactory;
//# sourceMappingURL=LindenmayerSystemResultRendererFactory.js.map