var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var Rule = (function () {
    function Rule() {
    }
    return Rule;
})();
var LindenmayerSystem = (function () {
    function LindenmayerSystem() {
    }
    return LindenmayerSystem;
})();
var AppComponent = (function () {
    function AppComponent() {
        this.lindenmayerSystem = {
            axiom: "FX",
            constants: "",
            rules: []
        };
    }
    AppComponent.prototype.addRule = function () {
        this.lindenmayerSystem.rules.push(new Rule());
    };
    ;
    AppComponent.prototype.deleteRule = function (index) {
        this.lindenmayerSystem.rules.splice(index, 1);
    };
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            template: "\n        <div><label>Axiom:</label><input [(ng-model)]=\"lindenmayerSystem.axiom\"></div>\n        <div><label>Constants:</label><input [(ng-model)]=\"lindenmayerSystem.constants\"></div>\n            <div *ng-for=\"#rule of lindenmayerSystem.rules; #i = index\">\n                <label>Rule {{i + 1}}:</label><input [(ng-model)]=\"rule.input\">\n                <span>=</span>\n                <input [(ng-model)]=\"rule.output\">\n                <input type=\"button\" value=\"X\" (click)=\"deleteRule(i)\">\n            </div>\n        <div>\n            <input type=\"button\" value=\"Add Rule\" (click)=\"addRule()\">\n        </div>\n    ",
            styles: ["\n    "],
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        })
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent);
//# sourceMappingURL=app.js.map