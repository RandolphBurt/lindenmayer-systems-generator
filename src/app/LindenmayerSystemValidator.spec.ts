import {LindenmayerSystemDefinition} from "./LindenmayerSystemDefinition";
import {LindenmayerSystemValidator} from "./LindenmayerSystemValidator";
import {ValidationResult} from "./LindenmayerSystemValidator";
import {LindenmayerSystemRule} from "./LindenmayerSystemDefinition";

describe('LindenmayerSystemValidator', () => {
    describe('validate', () => {
        var validator = new LindenmayerSystemValidator();
        var definition = new LindenmayerSystemDefinition();

        beforeEach(function() {
            definition.axiom = "f";
            definition.constants = "";
            definition.rules = null;
        });

        it('No rules for non constant axiom should error', () => {
            definition.axiom = "fad";
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemRule("a", "b"),
                new LindenmayerSystemRule("b", "a"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
            expect(validationResult.errors).toContain("No rules/constants found for axiom value 'f'");
            expect(validationResult.errors).toContain("No rules/constants found for axiom value 'd'");
        });

        it('No rules for constant axiom is OK', () => {
            definition.constants = "f";
            definition.rules = [];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it('A rule for a constant value should error', () => {
            definition.constants = "f[]";
            definition.rules = [
                new LindenmayerSystemRule("f", "[]")
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'f' is a constant and a rule input");
        });

        it('A rule output value that is not a constant or a rule input should error', () => {
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemRule("f", "fa"),
                new LindenmayerSystemRule("a", "fb"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'b' in rule 2 does not map to a constant or rule");

        });

        it('An unused constant should error', () => {
            definition.axiom = "fd";
            definition.constants = "[cd]";
            definition.rules = [
                new LindenmayerSystemRule("f", "a"),
                new LindenmayerSystemRule("a", "b"),
                new LindenmayerSystemRule("b", "c"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
            expect(validationResult.errors).toContain("Constant '[' is not part of the axiom and appears in no rules");
            expect(validationResult.errors).toContain("Constant ']' is not part of the axiom and appears in no rules");
        });

        it('An empty axiom should error', () => {
            definition.axiom = "";
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("No axiom has been defined");
        });

        it('Zero value axiom and constants should not error', () => {
            definition.axiom = "0";
            definition.constants = "0";
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it('Zero value axiom and rules should not error', () => {
            definition.axiom = "0";
            definition.rules = [
                new LindenmayerSystemRule("0", "00")
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it('An empty rule input should error', () => {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemRule("", "d"),
            ];

            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule input must be one character in length - rule 2's input is empty");
        });

        it('An empty rule output should error', () => {
            definition.axiom = "fd";
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemRule("d", ""),
            ];

            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule output must not be empty - rule 2's output is empty");
        });

        it('A rule input longer than one character should error', () => {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemRule("f", "dg"),
                new LindenmayerSystemRule("g", "d"),
                new LindenmayerSystemRule("gg", "d")
            ];

            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule input must be one character in length - rule 3's input is too long");
        });

        it('Multiple rules with the same input should error', () => {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemRule("f", "d")
            ];

            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("There are multiple rules with the same input value of 'f'");
        });

        it('A rule with an input equal to the output should error', () => {
            definition.axiom = "f";
            definition.rules = [
                new LindenmayerSystemRule("f", "ab"),
                new LindenmayerSystemRule("a", "a"),
                new LindenmayerSystemRule("b", "a"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule 2 has an input equal to the output");
        });

        it('Algae definition is OK', () => {
            definition.axiom = "0";
            definition.constants = "[]";
            definition.rules = [
                new LindenmayerSystemRule("1", "11"),
                new LindenmayerSystemRule("0", "1[0]0"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it('Fractal plant definition is OK', () => {
            definition.axiom = "X";
            definition.constants = "+-[]";
            definition.rules = [
                new LindenmayerSystemRule("F", "FF"),
                new LindenmayerSystemRule("X", "F-[[X]+X]+F[+FX]-X"),
            ];
            var validationResult = validator.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
    });
});