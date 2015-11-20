var LindenmayerSystemDefinition_1 = require("./LindenmayerSystemDefinition");
var LindenmayerSystemValidator_1 = require("./LindenmayerSystemValidator");
var LindenmayerSystemDefinition_2 = require("./LindenmayerSystemDefinition");
describe('LindenmayerSystemValidator', function () {
    describe('validate', function () {
        var validator = new LindenmayerSystemValidator_1.LindenmayerSystemValidator();
        var definition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
        beforeEach(function () {
            definition.axiom = "f";
            definition.constants = "";
            definition.rules = null;
        });
        it('No rules for non constant axiom should error', function () {
            definition.axiom = "fad";
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "b"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("b", "a"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
            expect(validationResult.errors).toContain("No rules/constants found for axiom value 'f'");
            expect(validationResult.errors).toContain("No rules/constants found for axiom value 'd'");
        });
        it('No rules for constant axiom is OK', function () {
            definition.constants = "f";
            definition.rules = [];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
        it('A rule for a constant value should error', function () {
            definition.constants = "f[]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "[]")
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'f' is a constant and a rule input");
        });
        it('A rule output value that is not a constant or a rule input should error', function () {
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "fa"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "fb"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'b' in rule 2 does not map to a constant or rule");
        });
        it('An unused constant should error', function () {
            definition.axiom = "fd";
            definition.constants = "[cd]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "a"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "b"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("b", "c"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
            expect(validationResult.errors).toContain("Constant '[' is not part of the axiom and appears in no rules");
            expect(validationResult.errors).toContain("Constant ']' is not part of the axiom and appears in no rules");
        });
        it('An empty axiom should error', function () {
            definition.axiom = "";
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("No axiom has been defined");
        });
        it('Zero value axiom and constants should not error', function () {
            definition.axiom = "0";
            definition.constants = "0";
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
        it('Zero value axiom and rules should not error', function () {
            definition.axiom = "0";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("0", "00")
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
        it('An empty rule input should error', function () {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("", "d"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule input must be one character in length - rule 2's input is empty");
        });
        it('An empty rule output should error', function () {
            definition.axiom = "fd";
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("d", ""),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule output must not be empty - rule 2's output is empty");
        });
        it('A rule input longer than one character should error', function () {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "dg"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("g", "d"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("gg", "d")
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule input must be one character in length - rule 3's input is too long");
        });
        it('Multiple rules with the same input should error', function () {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "d")
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("There are multiple rules with the same input value of 'f'");
        });
        it('A rule with an input equal to the output should error', function () {
            definition.axiom = "f";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("f", "ab"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("a", "a"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("b", "a"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule 2 has an input equal to the output");
        });
        it('Algae definition is OK', function () {
            definition.axiom = "0";
            definition.constants = "[]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("1", "11"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("0", "1[0]0"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
        it('Fractal plant definition is OK', function () {
            definition.axiom = "X";
            definition.constants = "+-[]";
            definition.rules = [
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("F", "FF"),
                new LindenmayerSystemDefinition_2.LindenmayerSystemRule("X", "F-[[X]+X]+F[+FX]-X"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
    });
});
//# sourceMappingURL=LindenmayerSystemValidator.spec.js.map