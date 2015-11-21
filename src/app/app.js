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
var LindenmayerSystemLibrary_1 = require("./LindenmayerSystemLibrary");
var LindenmayerSystemDefinition_2 = require("./LindenmayerSystemDefinition");
var AppComponent = (function () {
    function AppComponent(_lindenmayerSystemRulesProcessor, _lindenmayerSystemValidator, _lindenmayerSystemLibrary, _lindenmayerSystemResultBoundaryCalculatorFactory, _lindenmayerSystemResultRendererFactory) {
        this.showBusy = false;
        this.iterationCount = 3;
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
        this.lindenmayerSystemResultBoundaryCalculatorFactory = _lindenmayerSystemResultBoundaryCalculatorFactory;
        this.lindenmayerSystemResultRendererFactory = _lindenmayerSystemResultRendererFactory;
        this.library = _lindenmayerSystemLibrary.definitions;
        this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
        this.selectedPredefinedDefinition = this.library[0].title;
        this.loadAndRender();
    }
    AppComponent.prototype.processResult = function (resultProcessor, result) {
        for (var _i = 0; _i < result.length; _i++) {
            var char = result[_i];
            switch (char) {
                case "0":
                    resultProcessor.setColour("#663300");
                    break;
                case "1":
                    resultProcessor.setColour("#003300");
                    break;
                case "2":
                    resultProcessor.setColour("#008000");
                    break;
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
                case "[":
                    resultProcessor.savePosition();
                    break;
                case "]":
                    resultProcessor.restorePosition();
                    break;
            }
        }
    };
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
            var lindenmayerSystemResultBoundaryCalculator = this.lindenmayerSystemResultBoundaryCalculatorFactory.Create();
            this.processResult(lindenmayerSystemResultBoundaryCalculator, result);
            var diffX = lindenmayerSystemResultBoundaryCalculator.maxX - lindenmayerSystemResultBoundaryCalculator.minX;
            var diffY = lindenmayerSystemResultBoundaryCalculator.maxY - lindenmayerSystemResultBoundaryCalculator.minY;
            var scale = Math.min(canvas.width / diffX, canvas.height / diffY);
            var startX = -1 * lindenmayerSystemResultBoundaryCalculator.minX;
            var startY = -1 * lindenmayerSystemResultBoundaryCalculator.minY;
            // scale the canvas to fit the size required
            canvasContext.scale(scale, scale);
            canvasContext.strokeStyle = "#000000";
            // render the results on screen...
            var lindenmayerSystemResultRenderer = this.lindenmayerSystemResultRendererFactory.Create(canvasContext, startX, startY);
            this.processResult(lindenmayerSystemResultRenderer, result);
        }
        else {
        }
    };
    ;
    AppComponent.prototype.addRule = function () {
        this.lindenmayerSystemDefinition.addRule();
    };
    ;
    AppComponent.prototype.deleteRule = function (index) {
        this.lindenmayerSystemDefinition.deleteRule(index);
    };
    ;
    AppComponent.prototype.loadAndRender = function () {
        var _this = this;
        var chosenDefinition = this.library.filter(function (x) { return x.title === _this.selectedPredefinedDefinition; })[0];
        this.lindenmayerSystemDefinition.axiom = chosenDefinition.axiom;
        this.lindenmayerSystemDefinition.constants = chosenDefinition.constants;
        this.lindenmayerSystemDefinition.turningAngle = chosenDefinition.turningAngle;
        this.iterationCount = chosenDefinition.suggestedIterationCount;
        if (chosenDefinition.rules) {
            this.lindenmayerSystemDefinition.rules = chosenDefinition.rules.map(function (r) { return new LindenmayerSystemDefinition_2.LindenmayerSystemRule(r.input, r.output); });
        }
        this.queueProcessDefinition();
    };
    ;
    AppComponent.prototype.queueProcessDefinition = function () {
        var _this = this;
        this.showBusy = true;
        setTimeout(function () {
            _this.processDefinition();
            _this.showBusy = false;
        }, 100);
    };
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            templateUrl: 'templates/lindenmayer-system.html',
            styles: ["\n        .canvas { background-color: grey }\n        .busy {cursor:wait}\n    "],
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor, LindenmayerSystemValidator_1.LindenmayerSystemValidator, LindenmayerSystemLibrary_1.LindenmayerSystemLibrary, LindenmayerSystemResultBoundaryCalculatorFactory_1.LindenmayerSystemResultBoundaryCalculatorFactory, LindenmayerSystemResultRendererFactory_1.LindenmayerSystemResultRendererFactory])
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
    LindenmayerSystemResultRenderer_1.LindenmayerSystemResultRenderer,
    LindenmayerSystemLibrary_1.LindenmayerSystemLibrary
]);
//# sourceMappingURL=app.js.map