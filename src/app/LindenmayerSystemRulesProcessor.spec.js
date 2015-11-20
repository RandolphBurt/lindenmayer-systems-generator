var LindenmayerSystemDefinition_1 = require("./LindenmayerSystemDefinition");
var LindenmayerSystemRulesProcessor_1 = require("./LindenmayerSystemRulesProcessor");
var LindenmayerSystemDefinition_2 = require("./LindenmayerSystemDefinition");
describe('LindenmayerSystemRulesProcessor', function () {
    describe('process', function () {
        describe('Algae', function () {
            var processor = new LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor();
            var definition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
            beforeEach(function () {
                definition.axiom = "A";
                definition.rules = [
                    new LindenmayerSystemDefinition_2.LindenmayerSystemRule("A", "AB"),
                    new LindenmayerSystemDefinition_2.LindenmayerSystemRule("B", "A")
                ];
            });
            it("Processes correctly after 1 iteration", function () {
                var result = processor.process(definition, 1);
                expect(result).toEqual("AB");
            });
            it("Processes correctly after 2 iterations", function () {
                var result = processor.process(definition, 2);
                expect(result).toEqual("ABA");
            });
            it("Processes correctly after 3 iterations", function () {
                var result = processor.process(definition, 3);
                expect(result).toEqual("ABAAB");
            });
            it("Processes correctly after 4 iterations", function () {
                var result = processor.process(definition, 4);
                expect(result).toEqual("ABAABABA");
            });
            it("Processes correctly after 7 iterations", function () {
                var result = processor.process(definition, 7);
                expect(result).toEqual("ABAABABAABAABABAABABAABAABABAABAAB");
            });
        });
        describe('Koch Curve', function () {
            var processor = new LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor();
            var definition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
            beforeEach(function () {
                definition.axiom = "F";
                definition.constants = "+-";
                definition.rules = [
                    new LindenmayerSystemDefinition_2.LindenmayerSystemRule("F", "F+F-F-F+F")
                ];
            });
            it("Processes correctly after 1 iteration", function () {
                var result = processor.process(definition, 1);
                expect(result).toEqual("F+F-F-F+F");
            });
            it("Processes correctly after 2 iterations", function () {
                var result = processor.process(definition, 2);
                expect(result).toEqual("F+F-F-F+F+F+F-F-F+F-F+F-F-F+F-F+F-F-F+F+F+F-F-F+F");
            });
        });
        describe('Pythagoras Tree', function () {
            var processor = new LindenmayerSystemRulesProcessor_1.LindenmayerSystemRulesProcessor();
            var definition = new LindenmayerSystemDefinition_1.LindenmayerSystemDefinition();
            beforeEach(function () {
                definition.axiom = "0";
                definition.constants = "[]";
                definition.rules = [
                    new LindenmayerSystemDefinition_2.LindenmayerSystemRule("1", "11"),
                    new LindenmayerSystemDefinition_2.LindenmayerSystemRule("0", "1[0]0")
                ];
            });
            it("Processes correctly after 1 iteration", function () {
                var result = processor.process(definition, 1);
                expect(result).toEqual("1[0]0");
            });
            it("Processes correctly after 3 iterations", function () {
                var result = processor.process(definition, 3);
                expect(result).toEqual("1111[11[1[0]0]1[0]0]11[1[0]0]1[0]0");
            });
        });
    });
});
//# sourceMappingURL=LindenmayerSystemRulesProcessor.spec.js.map