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
var AppComponent = (function () {
    function AppComponent(_lindenmayerSystemRulesProcessor, _lindenmayerSystemValidator, _lindenmayerSystemResultBoundaryCalculator, _lindenmayerSystemResultRenderer) {
        this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
        this.iterationCount = 3;
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
        this.lindenmayerSystemResultBoundaryCalculator = _lindenmayerSystemResultBoundaryCalculator;
        this.lindenmayerSystemResultRenderer = _lindenmayerSystemResultRenderer;
        // TODO: TEMP
        this.lindenmayerSystemDefinition.axiom = "F";
        this.lindenmayerSystemDefinition.constants = "+-";
        this.lindenmayerSystemDefinition.addRule();
        this.lindenmayerSystemDefinition.rules[0].input = "F";
        this.lindenmayerSystemDefinition.rules[0].output = "F+F-F-F+F";
    }
    AppComponent.prototype.processResult = function (resultProcessor, result) {
        for (var _i = 0; _i < result.length; _i++) {
            var char = result[_i];
            switch (char) {
                case "F":
                    resultProcessor.moveForward(10);
                    break;
                case "+":
                    resultProcessor.rotate(-90);
                    break;
                case "-":
                    resultProcessor.rotate(90);
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
            var result = this.lindenmayerSystemRulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);
            var resultProcessor = this.lindenmayerSystemResultBoundaryCalculator;
            this.lindenmayerSystemResultBoundaryCalculator.initialise();
            this.processResult(resultProcessor, result);
            var diffX = this.lindenmayerSystemResultBoundaryCalculator.maxX - this.lindenmayerSystemResultBoundaryCalculator.minX;
            var diffY = this.lindenmayerSystemResultBoundaryCalculator.maxY - this.lindenmayerSystemResultBoundaryCalculator.minY;
            var scale = Math.min(canvas.width / diffX, canvas.height / diffY);
            var startX = -1 * this.lindenmayerSystemResultBoundaryCalculator.minX;
            var startY = -1 * this.lindenmayerSystemResultBoundaryCalculator.minY;
            canvasContext.scale(scale, scale);
            this.lindenmayerSystemResultRenderer.initialise(canvasContext, startX, startY);
            resultProcessor = this.lindenmayerSystemResultRenderer;
            this.processResult(resultProcessor, result);
        }
        else {
        }
    };
    ;
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            template: "\n        <div><label>Axiom:</label><input [(ng-model)]=\"lindenmayerSystemDefinition.axiom\"></div>\n        <div><label>Constants:</label><input [(ng-model)]=\"lindenmayerSystemDefinition.constants\"></div>\n            <div *ng-for=\"#rule of lindenmayerSystemDefinition.rules; #i = index\">\n                <label>Rule {{i + 1}}:</label><input [(ng-model)]=\"rule.input\">\n                <span>=&gt;</span>\n                <input [(ng-model)]=\"rule.output\">\n                <input type=\"button\" value=\"X\" (click)=\"deleteRule(i)\">\n            </div>\n        <div>\n            <input type=\"button\" value=\"Add Rule\" (click)=\"addRule()\">\n        </div>\n        <div>\n            <input [(ng-model)]=\"iterationCount\">\n            <input type=\"button\" value=\"Draw\" (click)=\"processDefinition()\">\n        </div>\n        <div>\n            <canvas id=\"canvas\" class=\"canvas\" width=\"500\" height=\"500\"></canvas>\n        </div>\n    ",
            styles: ["\n        .canvas { background-color: grey }\n    "],
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor, LindenmayerSystemValidator_1.LindenmayerSystemValidator, LindenmayerSystemResultBoundaryCalculator_1.LindenmayerSystemResultBoundaryCalculator, LindenmayerSystemResultRenderer_1.LindenmayerSystemResultRenderer])
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent, [
    LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor,
    LindenmayerSystemValidator_1.LindenmayerSystemValidator,
    PositionCalculator_1.PositionCalculator,
    LindenmayerSystemResultBoundaryCalculator_1.LindenmayerSystemResultBoundaryCalculator,
    LindenmayerSystemResultRenderer_1.LindenmayerSystemResultRenderer
]);
//# sourceMappingURL=app.js.map