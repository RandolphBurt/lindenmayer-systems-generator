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
var PositionCalculator_1 = require("./PositionCalculator");
var PositionData_1 = require("./PositionData");
var LindenmayerSystemResultBoundaryCalculator = (function () {
    function LindenmayerSystemResultBoundaryCalculator(_positionCalculator, _position) {
        this.positionStack = [];
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.positionCalculator = _positionCalculator;
        this.position = _position;
    }
    LindenmayerSystemResultBoundaryCalculator.prototype.savePosition = function () {
        this.positionStack.push(this.position);
        this.position = new PositionData_1.PositionData(this.position);
    };
    LindenmayerSystemResultBoundaryCalculator.prototype.restorePosition = function () {
        this.position = this.positionStack.pop();
    };
    LindenmayerSystemResultBoundaryCalculator.prototype.moveForward = function (distance) {
        this.positionCalculator.move(this.position, distance);
        if (this.position.x < this.minX) {
            this.minX = this.position.x;
        }
        else if (this.position.x > this.maxX) {
            this.maxX = this.position.x;
        }
        if (this.position.y < this.minY) {
            this.minY = this.position.y;
        }
        else if (this.position.y > this.maxY) {
            this.maxY = this.position.y;
        }
    };
    LindenmayerSystemResultBoundaryCalculator.prototype.rotate = function (angle) {
        this.positionCalculator.rotate(this.position, angle);
    };
    LindenmayerSystemResultBoundaryCalculator = __decorate([
        __param(0, core_1.Inject(PositionCalculator_1.PositionCalculator)), 
        __metadata('design:paramtypes', [PositionCalculator_1.PositionCalculator, PositionData_1.PositionData])
    ], LindenmayerSystemResultBoundaryCalculator);
    return LindenmayerSystemResultBoundaryCalculator;
})();
exports.LindenmayerSystemResultBoundaryCalculator = LindenmayerSystemResultBoundaryCalculator;
//# sourceMappingURL=LindenmayerSystemResultBoundaryCalculator.js.map