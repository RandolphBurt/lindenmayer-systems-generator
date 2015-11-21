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
var PositionData_1 = require("./PositionData");
var PositionCalculator_1 = require("./PositionCalculator");
var LindenmayerSystemResultRenderer = (function () {
    function LindenmayerSystemResultRenderer(_positionCalculator) {
        this.position = new PositionData_1.PositionData();
        this.positionStack = [];
        this.positionCalculator = _positionCalculator;
    }
    // TODO: type of canvasContext
    LindenmayerSystemResultRenderer.prototype.initialise = function (canvasContext, x, y) {
        this.canvasContext = canvasContext;
        this.position = new PositionData_1.PositionData();
        this.position.x = x;
        this.position.y = y;
        this.position.facing = 0;
        this.canvasContext.moveTo(x, y);
    };
    LindenmayerSystemResultRenderer.prototype.savePosition = function () {
        this.positionStack.push(this.position);
        this.position = new PositionData_1.PositionData(this.position);
    };
    LindenmayerSystemResultRenderer.prototype.restorePosition = function () {
        this.position = this.positionStack.pop();
        this.canvasContext.moveTo(this.position.x, this.position.y);
    };
    LindenmayerSystemResultRenderer.prototype.moveForward = function (distance) {
        this.positionCalculator.move(this.position, distance);
        this.canvasContext.lineTo(this.position.x, this.position.y);
        this.canvasContext.stroke();
    };
    LindenmayerSystemResultRenderer.prototype.rotate = function (angle) {
        this.positionCalculator.rotate(this.position, angle);
    };
    LindenmayerSystemResultRenderer = __decorate([
        __param(0, core_1.Inject(PositionCalculator_1.PositionCalculator)), 
        __metadata('design:paramtypes', [PositionCalculator_1.PositionCalculator])
    ], LindenmayerSystemResultRenderer);
    return LindenmayerSystemResultRenderer;
})();
exports.LindenmayerSystemResultRenderer = LindenmayerSystemResultRenderer;
//# sourceMappingURL=LindenmayerSystemResultRenderer.js.map