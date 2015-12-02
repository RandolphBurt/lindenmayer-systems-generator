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
var LindenmayerSystemRulesProcessor_1 = require('./LindenmayerSystemRulesProcessor');
var LindenmayerSystemValidator_1 = require("./LindenmayerSystemValidator");
var PositionCalculator_1 = require("./PositionCalculator");
var LindenmayerSystemResultBoundaryCalculator_1 = require("./LindenmayerSystemResultBoundaryCalculator");
var LindenmayerSystemResultRenderer_1 = require("./LindenmayerSystemResultRenderer");
var LindenmayerSystemResultBoundaryCalculatorFactory_1 = require("./LindenmayerSystemResultBoundaryCalculatorFactory");
var LindenmayerSystemResultRendererFactory_1 = require("./LindenmayerSystemResultRendererFactory");
var LindenmayerSystemLibrary_1 = require("./LindenmayerSystemLibrary");
var LindenmayerSystemResultParser_1 = require("./LindenmayerSystemResultParser");
var DefinitionEditor_1 = require("./DefinitionEditor");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'lindenmayer-system',
            template: '<definition-editor></definition-editor>',
            directives: [DefinitionEditor_1.DefinitionEditor, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent, [
    LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor,
    LindenmayerSystemValidator_1.LindenmayerSystemValidator,
    PositionCalculator_1.PositionCalculator,
    LindenmayerSystemResultBoundaryCalculatorFactory_1.LindenmayerSystemResultBoundaryCalculatorFactory,
    LindenmayerSystemResultRendererFactory_1.LindenmayerSystemResultRendererFactory,
    LindenmayerSystemResultBoundaryCalculator_1.LindenmayerSystemResultBoundaryCalculator,
    LindenmayerSystemResultRenderer_1.LindenmayerSystemResultRenderer,
    LindenmayerSystemLibrary_1.LindenmayerSystemLibrary,
    LindenmayerSystemResultParser_1.LindenmayerSystemResultParser
]);
//# sourceMappingURL=app.js.map