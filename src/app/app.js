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
var angular2_1 = require('angular2/angular2');
var LindenmayerSystemDefinition_1 = require('./LindenmayerSystemDefinition');
var LindenmayerSystemRulesProcessor_1 = require('./LindenmayerSystemRulesProcessor');
var LindenmayerSystemValidator_1 = require("./LindenmayerSystemValidator");
var PositionCalculator_1 = require("./PositionCalculator");
var LindenmayerSystemResultBoundaryCalculator_1 = require("./LindenmayerSystemResultBoundaryCalculator");
var LindenmayerSystemResultRenderer_1 = require("./LindenmayerSystemResultRenderer");
var LindenmayerSystemResultBoundaryCalculatorFactory_1 = require("./LindenmayerSystemResultBoundaryCalculatorFactory");
var LindenmayerSystemResultRendererFactory_1 = require("./LindenmayerSystemResultRendererFactory");
var AppComponent = (function () {
    function AppComponent(_lindenmayerSystemRulesProcessor, _lindenmayerSystemValidator, _lindenmayerSystemResultBoundaryCalculatorFactory, _lindenmayerSystemResultRendererFactory) {
        this.iterationCount = 3;
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
        this.lindenmayerSystemResultBoundaryCalculatorFactory = _lindenmayerSystemResultBoundaryCalculatorFactory;
        this.lindenmayerSystemResultRendererFactory = _lindenmayerSystemResultRendererFactory;
        this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
        // TODO: TEMP
        this.lindenmayerSystemDefinition.axiom = "F";
        this.lindenmayerSystemDefinition.constants = "+-";
        this.lindenmayerSystemDefinition.startDirection = 90;
        this.lindenmayerSystemDefinition.turningAngle = 90;
        this.lindenmayerSystemDefinition.addRule();
        this.lindenmayerSystemDefinition.rules[0].input = "F";
        this.lindenmayerSystemDefinition.rules[0].output = "F+F-F-F+F";
    }
    AppComponent.prototype.processResult = function (resultProcessor, result) {
        for (var _i = 0; _i < result.length; _i++) {
            var char = result[_i];
            switch (char) {
                case "A":
                case "B":
                case "F":
                    resultProcessor.moveForward(10);
                    break;
                case "+":
                    resultProcessor.rotate(-this.lindenmayerSystemDefinition.turningAngle);
                    break;
                case "-":
                    resultProcessor.rotate(this.lindenmayerSystemDefinition.turningAngle);
                    break;
            }
        }
    };
    AppComponent.prototype.addRule = function () {
        this.lindenmayerSystemDefinition.addRule();
    };
    ;
    AppComponent.prototype.deleteRule = function (index) {
        this.lindenmayerSystemDefinition.deleteRule(index);
    };
    ;
    AppComponent.prototype.processDefinition = function () {
        var canvas = document.getElementById('canvas');
        var canvasContext = canvas.getContext('2d');
        canvasContext.beginPath();
        canvasContext.setTransform(1, 0, 0, 1, 0, 0);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.closePath();
        var validationResult = this.lindenmayerSystemValidator.validate(this.lindenmayerSystemDefinition);
        if (validationResult.result === true && this.iterationCount > 0) {
            // Iterate over the axiom and generated results 'iterationCount' times....
            var result = this.lindenmayerSystemRulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);
            // Calculate the space/rectangular-size required to draw the resultant shape
            var lindenmayerSystemResultBoundaryCalculator = this.lindenmayerSystemResultBoundaryCalculatorFactory.Create(this.lindenmayerSystemDefinition.startDirection);
            this.processResult(lindenmayerSystemResultBoundaryCalculator, result);
            var diffX = lindenmayerSystemResultBoundaryCalculator.maxX - lindenmayerSystemResultBoundaryCalculator.minX;
            var diffY = lindenmayerSystemResultBoundaryCalculator.maxY - lindenmayerSystemResultBoundaryCalculator.minY;
            var scale = Math.min(canvas.width / diffX, canvas.height / diffY);
            var startX = -1 * lindenmayerSystemResultBoundaryCalculator.minX;
            var startY = -1 * lindenmayerSystemResultBoundaryCalculator.minY;
            // scale the canvas to fit the size required
            canvasContext.scale(scale, scale);
            // render the results on screen...
            var lindenmayerSystemResultRenderer = this.lindenmayerSystemResultRendererFactory.Create(canvasContext, startX, startY, this.lindenmayerSystemDefinition.startDirection);
            this.processResult(lindenmayerSystemResultRenderer, result);
        }
        else {
        }
    };
    ;
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            template: "\n        <div><label>Axiom:</label><input [(ng-model)]=\"lindenmayerSystemDefinition.axiom\"></div>\n        <div><label>Constants:</label><input [(ng-model)]=\"lindenmayerSystemDefinition.constants\"></div>\n        <div><label>Turning Angle:</label><input type=\"number\" [(ng-model)]=\"lindenmayerSystemDefinition.turningAngle\"></div>\n        <div *ng-for=\"#rule of lindenmayerSystemDefinition.rules; #i = index\">\n            <label>Rule {{i + 1}}:</label><input [(ng-model)]=\"rule.input\">\n            <span>=&gt;</span>\n            <input [(ng-model)]=\"rule.output\">\n            <input type=\"button\" value=\"X\" (click)=\"deleteRule(i)\">\n        </div>\n        <div>\n            <input type=\"button\" value=\"Add Rule\" (click)=\"addRule()\">\n        </div>\n        <div>\n            <label>Initial direction (Angle):</label><input type=\"number\" [(ng-model)]=\"lindenmayerSystemDefinition.startDirection\">\n        </div>\n        <div>\n            <label>Iteration Count:</label><input type=\"number\" [(ng-model)]=\"iterationCount\">\n            <input type=\"button\" value=\"Draw\" (click)=\"processDefinition()\">\n        </div>\n        <div>\n            <canvas id=\"canvas\" class=\"canvas\" width=\"500\" height=\"500\"></canvas>\n        </div>\n    ",
            styles: ["\n        .canvas { background-color: grey }\n    "],
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor, LindenmayerSystemValidator_1.LindenmayerSystemValidator, LindenmayerSystemResultBoundaryCalculatorFactory_1.LindenmayerSystemResultBoundaryCalculatorFactory, LindenmayerSystemResultRendererFactory_1.LindenmayerSystemResultRendererFactory])
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent, [
    LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor,
    LindenmayerSystemValidator_1.LindenmayerSystemValidator,
    PositionCalculator_1.PositionCalculator,
    LindenmayerSystemResultBoundaryCalculatorFactory_1.LindenmayerSystemResultBoundaryCalculatorFactory,
    LindenmayerSystemResultRendererFactory_1.LindenmayerSystemResultRendererFactory,
    LindenmayerSystemResultBoundaryCalculator_1.LindenmayerSystemResultBoundaryCalculator,
    LindenmayerSystemResultRenderer_1.LindenmayerSystemResultRenderer
]);
//# sourceMappingURL=app.js.map