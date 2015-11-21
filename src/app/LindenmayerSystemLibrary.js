var LindenmayerSystemDefinition_1 = require("./LindenmayerSystemDefinition");
var LindenmayerSystemDefinition_2 = require("./LindenmayerSystemDefinition");
var LindenmayerSystemLibrary = (function () {
    function LindenmayerSystemLibrary() {
        this.definitions = [
            new LindenmayerSystemDefinition_1.LindenmayerSystemLibraryDefinition("Dragon Curve", 12, "FX", "F+-", 90, 90, [new LindenmayerSystemDefinition_2.LindenmayerSystemRule("X", "X+YF+"), new LindenmayerSystemDefinition_2.LindenmayerSystemRule("Y", "-FX-Y")]),
            new LindenmayerSystemDefinition_1.LindenmayerSystemLibraryDefinition("Koch Curve", 5, "F", "+-", 90, 90, [new LindenmayerSystemDefinition_2.LindenmayerSystemRule("F", "F+F-F-F+F")]),
            new LindenmayerSystemDefinition_1.LindenmayerSystemLibraryDefinition("Sierpinski triangle", 10, "A", "+-", 60, 90, [new LindenmayerSystemDefinition_2.LindenmayerSystemRule("A", "+B-A-B+"), new LindenmayerSystemDefinition_2.LindenmayerSystemRule("B", "-A+B+A-")]),
            new LindenmayerSystemDefinition_1.LindenmayerSystemLibraryDefinition("Pythagoras tree", 7, "A", "[]+-", 45, 180, [new LindenmayerSystemDefinition_2.LindenmayerSystemRule("A", "B[+A]-A"), new LindenmayerSystemDefinition_2.LindenmayerSystemRule("B", "BB")]),
            new LindenmayerSystemDefinition_1.LindenmayerSystemLibraryDefinition("Fractal plant", 8, "X", "+-[]", 25, 180, [new LindenmayerSystemDefinition_2.LindenmayerSystemRule("X", "F-[[X]+X]+F[+FX]-X"), new LindenmayerSystemDefinition_2.LindenmayerSystemRule("F", "FF")]),
            new LindenmayerSystemDefinition_1.LindenmayerSystemLibraryDefinition("Seaweed", 6, "F", "+-[]012", 22, 180, [new LindenmayerSystemDefinition_2.LindenmayerSystemRule("F", "0FF-[1-F+F+F]+[2+F-F-F]")])
        ];
    }
    return LindenmayerSystemLibrary;
})();
exports.LindenmayerSystemLibrary = LindenmayerSystemLibrary;
//# sourceMappingURL=LindenmayerSystemLibrary.js.map