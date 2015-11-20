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
    function AppComponent(_lindenmayerSystemRulesProcessor, _lindenmayerSystemValidator) {
        this.lindenmayerSystemDefinition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
        this.lindenmayerSystemRulesProcessor = _lindenmayerSystemRulesProcessor;
        this.lindenmayerSystemValidator = _lindenmayerSystemValidator;
    }
    AppComponent.prototype.addRule = function () {
        this.lindenmayerSystemDefinition.addRule();
    };
    ;
    AppComponent.prototype.deleteRule = function (index) {
        this.lindenmayerSystemDefinition.deleteRule(index);
    };
    ;
    AppComponent.prototype.processDefinition = function () {
        var validationResult = this.lindenmayerSystemValidator.validate(this.lindenmayerSystemDefinition);
        if (validationResult.result === true && this.iterationCount > 0) {
            this.lindenmayerSystemRulesProcessor.process(this.lindenmayerSystemDefinition, this.iterationCount);
        }
        else {
        }
    };
    ;
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            template: "\n        <div><label>Axiom:</label><input [(ng-model)]=\"lindenmayerSystemDefinition.axiom\"></div>\n        <div><label>Constants:</label><input [(ng-model)]=\"lindenmayerSystemDefinition.constants\"></div>\n            <div *ng-for=\"#rule of lindenmayerSystemDefinition.rules; #i = index\">\n                <label>Rule {{i + 1}}:</label><input [(ng-model)]=\"rule.input\">\n                <span>=&gt;</span>\n                <input [(ng-model)]=\"rule.output\">\n                <input type=\"button\" value=\"X\" (click)=\"deleteRule(i)\">\n            </div>\n        <div>\n            <input type=\"button\" value=\"Add Rule\" (click)=\"addRule()\">\n        </div>\n        <div>\n            <input [(ng-model)]=\"iterationCount\">\n            <input type=\"button\" value=\"Draw\" (click)=\"processDefinition()\">\n        </div>\n        <div>\n            <canvas id=\"canvas\" width=\"500\" height=\"500\"></canvas>\n        </div>\n    ",
            styles: ["\n    "],
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor, LindenmayerSystemValidator_1.LindenmayerSystemValidator])
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