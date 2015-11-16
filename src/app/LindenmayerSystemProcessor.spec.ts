import {LindenmayerSystemDefinition} from "./LindenmayerSystemDefinition";
import {LindenmayerSystemProcessor} from "./LindenmayerSystemProcessor";
import {ValidationResult} from "./LindenmayerSystemProcessor";
import {LindenmayerSystemRule} from "./LindenmayerSystemDefinition";

describe('LindenmayerSystemProcessrt', () => {
    describe('validate', () => {
        var processor = new LindenmayerSystemProcessor();
        var definition = new LindenmayerSystemDefinition();
        definition.axiom = "f";

        it('no rules for non constant axiom is false', () => {
            definition.constants = "";
            definition.rules = [];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors[0]).toEqual("No rules/constants found for axiom value");
        });

        it('no rules for constant axiom is true', () => {
            definition.constants = "f";
            definition.rules = [];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it('clash between constant and rules is false', () => {
            definition.constants = "f[]";
            definition.rules = [
                new LindenmayerSystemRule("f", "[]")
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'f' is a constant and a rule input");
        });

        it('unused rule output is false', () => {
            definition.constants = "";
            definition.rules = [
                new LindenmayerSystemRule("f", "fa"),
                new LindenmayerSystemRule("a", "fb"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Character 'b' in rule 2 does not map to a constant or rule");

        });

        it('unused constant is false', () => {
            definition.axiom = "fd";
            definition.constants = "[cd]";
            definition.rules = [
                new LindenmayerSystemRule("f", "a"),
                new LindenmayerSystemRule("a", "b"),
                new LindenmayerSystemRule("a", "c"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(2);
            expect(validationResult.errors).toContain("Constant '[' is not an axiom and appears in no rules");
            expect(validationResult.errors).toContain("Constant ']' is not an axiom and appears in no rules");
        });

        it('empty axiom is false', () => {
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("No axiom has been defined");

        });

        it('rule input too long is false', () => {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemRule("ff", "d")
            ];

            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule input must be one character in length - rule 1's input is too long");
        });

        it('multiple rules with the same input is false', () => {
            definition.axiom = "fd";
            definition.constants = "d";
            definition.rules = [
                new LindenmayerSystemRule("f", "d"),
                new LindenmayerSystemRule("f", "d")
            ];

            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("There are multiple rules with the same input value of 'f'");
        });

        it('rule input is same as output false', () => {
            definition.axiom = "f";
            definition.rules = [
                new LindenmayerSystemRule("f", "a"),
                new LindenmayerSystemRule("a", "a"),
                new LindenmayerSystemRule("b", "a"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(false);
            expect(validationResult.errors.length).toEqual(1);
            expect(validationResult.errors).toContain("Rule 2 has an input equal to the output");
        });

        it('algae definition is true', () => {
            definition.axiom = "0";
            definition.constants = "[]";
            definition.rules = [
                new LindenmayerSystemRule("1", "11"),
                new LindenmayerSystemRule("0", "1[0]0"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });

        it('Fractal plant definition is true', () => {
            definition.axiom = "X";
            definition.constants = "+-[]";
            definition.rules = [
                new LindenmayerSystemRule("F", "FF"),
                new LindenmayerSystemRule("X", "F−[[X]+X]+F[+FX]−X"),
            ];
            var validationResult = processor.validate(definition);
            expect(validationResult.result).toEqual(true);
            expect(validationResult.errors.length).toEqual(0);
        });
    });
});