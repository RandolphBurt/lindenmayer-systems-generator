var LindenmayerSystemDefinition_1 = require("./LindenmayerSystemDefinition");
var LindenmayerSystemProcessor_1 = require("./LindenmayerSystemProcessor");
var LindenmayerSystemDefinition_2 = require("./LindenmayerSystemDefinition");
describe('LindenmayerSystemProcessrt', function () {
    describe('validate', function () {
        var processor = new LindenmayerSystemProcessor_1.LindenmayerSystemProcessor();
        var definition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
        definition.axiom = "f";
        it('no rules for non constant axiom is false', function () {
            definition.constants = "";
            definition.rules = [];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors[0]).toEqual("No rules/constants found for axiom value");
        });
        it('no rules for constant axiom is true', function () {
            definition.constants = "f";
            definition.rules = [];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
        it('clash between constant and rules is false', function () {
            definition.constants = "f[]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "[]")
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'f' is a constant and a rule input");
        });
        it('unused rule output is false', function () {
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "fa"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "fb"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'b' in rule 2 does not map to a constant or rule");
        });
        it('unused constant is false', function () {
            definition.axiom = "fd";
            definition.constants = "[cd]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "a"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "b"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "c"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
            expect(validationResult.errors).toContain("Constant '[' is not an axiom and appears in no rules");
            expect(validationResult.errors).toContain("Constant ']' is not an axiom and appears in no rules");
        });
        it('empty axiom is false', function () {
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("No axiom has been defined");
        });
        it('rule input too long is false', function () {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("ff", "d")
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule input must be one character in length - rule 1's input is too long");
        });
        it('multiple rules with the same input is false', function () {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "d")
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("There are multiple rules with the same input value of 'f'");
        });
        it('rule input is same as output false', function () {
            definition.axiom = "f";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "a"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "a"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("b", "a"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule 2 has an input equal to the output");
        });
        it('algae definition is true', function () {
            definition.axiom = "0";
            definition.constants = "[]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("1", "11"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("0", "1[0]0"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
        it('Fractal plant definition is true', function () {
            definition.axiom = "X";
            definition.constants = "+-[]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("F", "FF"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("X", "F−[[X]+X]+F[+FX]−X"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
    });
});
//# sourceMappingURL=LindenmayerSystemProcessor.spec.js.map