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
var LindenmayerSystemRulesProcessor_1 = require("./LindenmayerSystemRulesProcessor");
var LindenmayerSystemValidator_1 = require("./LindenmayerSystemValidator");
var LindenmayerSystemLibrary_1 = require("./LindenmayerSystemLibrary");
var LindenmayerSystemResultBoundaryCalculatorFactory_1 = require("./LindenmayerSystemResultBoundaryCalculatorFactory");
var LindenmayerSystemResultRendererFactory_1 = require("./LindenmayerSystemResultRendererFactory");
var LindenmayerSystemResultParser_1 = require("./LindenmayerSystemResultParser");
var LindenmayerSystemDefinition_1 = require("./LindenmayerSystemDefinition");
var LindenmayerSystemDefinition_2 = require("./LindenmayerSystemDefinition");
var DefinitionEditor = (function () {
    function DefinitionEditor(_lindenmayerSystemRulesProcessor, _lindenmayerSystemValidator, _lindenmayerSystemLibrary, _lindenmayerSystemResultBoundaryCalculatorFactory, _lindenmayerSystemResultRendererFactory, _lindenmayerSystemResultParser) {
        this.showBusy = false;
        this.iterationCount = 3;
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
        this.lindenmayerSystemResultBoundaryCalculatorFactory = _lindenmayerSystemResultBoundaryCalculatorFactory;
        this.lindenmayerSystemResultRendererFactory = _lindenmayerSystemResultRendererFactory;
        this.lindenmayerSystemResultParser = _lindenmayerSystemResultParser;
        this.library = _lindenmayerSystemLibrary.definitions;
        this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
        this.selectedPredefinedDefinition = this.library[0].title;
        this.loadAndRender();
    }
    DefinitionEditor.prototype.processDefinition = function () {
        var canvas = document.getElementById('canvas');
        var canvasContext = canvas.getContext('2d');
        canvasContext.beginPath();
        canvasContext.setTransform(1, 0, 0, 1, 0, 0);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.closePath();
        var validationResult = this.lindenmayerSystemValidator.validate(this.lindenmayerSystemDefinition);
        if (validationResult.result === true && this.iterationCount > 0) {
            var result = this.lindenmayerSystemRulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);
            var lindenmayerSystemResultBoundaryCalculator = this.lindenmayerSystemResultBoundaryCalculatorFactory.Create();
            this.lindenmayerSystemResultParser.parseResult(lindenmayerSystemResultBoundaryCalculator, this.lindenmayerSystemDefinition, result);
            var diffX = lindenmayerSystemResultBoundaryCalculator.maxX - lindenmayerSystemResultBoundaryCalculator.minX;
            var diffY = lindenmayerSystemResultBoundaryCalculator.maxY - lindenmayerSystemResultBoundaryCalculator.minY;
            var scale = Math.min(canvas.width / diffX, canvas.height / diffY);
            var startX = (-1 * lindenmayerSystemResultBoundaryCalculator.minX) + (0.5 * ((canvas.width / scale) - diffX));
            var startY = (-1 * lindenmayerSystemResultBoundaryCalculator.minY) + (0.5 * ((canvas.height / scale) - diffY));
            canvasContext.scale(scale, scale);
            canvasContext.strokeStyle = "#000000";
            var lindenmayerSystemResultRenderer = this.lindenmayerSystemResultRendererFactory.Create(canvasContext, startX, startY);
            this.lindenmayerSystemResultParser.parseResult(lindenmayerSystemResultRenderer, this.lindenmayerSystemDefinition, result);
        }
        else {
        }
    };
    ;
    DefinitionEditor.prototype.addRule = function () {
        this.lindenmayerSystemDefinition.addRule();
    };
    ;
    DefinitionEditor.prototype.deleteRule = function (index) {
        this.lindenmayerSystemDefinition.deleteRule(index);
    };
    ;
    DefinitionEditor.prototype.loadAndRender = function () {
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
    DefinitionEditor.prototype.queueProcessDefinition = function () {
        var _this = this;
        this.showBusy = true;
        setTimeout(function () {
            _this.processDefinition();
            _this.showBusy = false;
        }, 100);
    };
    DefinitionEditor = __decorate([
        angular2_1.Component({
            selector: 'definition-editor',
            templateUrl: 'templates/definition-editor.html',
            styles: ["\n        .canvas { background-color: grey }\n        .busy {cursor:wait}\n    "],
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor, LindenmayerSystemValidator_1.LindenmayerSystemValidator, LindenmayerSystemLibrary_1.LindenmayerSystemLibrary, LindenmayerSystemResultBoundaryCalculatorFactory_1.LindenmayerSystemResultBoundaryCalculatorFactory, LindenmayerSystemResultRendererFactory_1.LindenmayerSystemResultRendererFactory, LindenmayerSystemResultParser_1.LindenmayerSystemResultParser])
    ], DefinitionEditor);
    return DefinitionEditor;
})();
exports.DefinitionEditor = DefinitionEditor;
//# sourceMappingURL=DefinitionEditor.js.map