/* tslint:disable:no-unused-variable */

import { RulesProcessor } from './rules-processor';
import {LindenmayerSystemDefinition} from "../data-definitions/lindenmayer-system-definition";
import {LindenmayerSystemRule} from "../data-definitions/lindenmayer-system-rule";

describe('RulesProcessor', () => {
    describe('process', () => {
        describe('Algae', () => {
            var processor = new RulesProcessor();
            var definition = new LindenmayerSystemDefinition();

            beforeEach(() => {
                definition.axiom = "A";
                definition.rules = [
                    new LindenmayerSystemRule("A", "AB"),
                    new LindenmayerSystemRule("B", "A")
                ];
            });

            it("Processes correctly after 1 iteration", () => {
                var result = processor.process(definition, 1);
                expect(result).toEqual("AB");
            });

            it("Processes correctly after 2 iterations", () => {
                var result = processor.process(definition, 2);
                expect(result).toEqual("ABA");
            });

            it("Processes correctly after 3 iterations", () => {
                var result = processor.process(definition, 3);
                expect(result).toEqual("ABAAB");
            });

            it("Processes correctly after 4 iterations", () => {
                var result = processor.process(definition, 4);
                expect(result).toEqual("ABAABABA");
            });

            it("Processes correctly after 7 iterations", () => {
                var result = processor.process(definition, 7);
                expect(result).toEqual("ABAABABAABAABABAABABAABAABABAABAAB");
            });
        });

        describe('Koch Curve', () => {
            var processor = new RulesProcessor();
            var definition = new LindenmayerSystemDefinition();

            beforeEach(() => {
                definition.axiom = "F";
                definition.constants = "+-";
                definition.rules = [
                    new LindenmayerSystemRule("F", "F+F-F-F+F")
                ];
            });

            it("Processes correctly after 1 iteration", () => {
                var result = processor.process(definition, 1);
                expect(result).toEqual("F+F-F-F+F");
            });

            it("Processes correctly after 2 iterations", () => {
                var result = processor.process(definition, 2);
                expect(result).toEqual("F+F-F-F+F+F+F-F-F+F-F+F-F-F+F-F+F-F-F+F+F+F-F-F+F");
            });
        });

        describe('Pythagoras Tree', () => {
            var processor = new RulesProcessor();
            var definition = new LindenmayerSystemDefinition();

            beforeEach(() => {
                definition.axiom = "0";
                definition.constants = "[]";
                definition.rules = [
                    new LindenmayerSystemRule("1", "11"),
                    new LindenmayerSystemRule("0", "1[0]0")
                ];
            });

            it("Processes correctly after 1 iteration", () => {
                var result = processor.process(definition, 1);
                expect(result).toEqual("1[0]0");
            });

            it("Processes correctly after 3 iterations", () => {
                var result = processor.process(definition, 3);
                expect(result).toEqual("1111[11[1[0]0]1[0]0]11[1[0]0]1[0]0");
            });
        });
    });
  });
