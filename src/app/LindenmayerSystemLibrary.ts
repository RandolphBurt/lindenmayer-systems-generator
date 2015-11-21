import {LindenmayerSystemLibraryDefinition} from "./LindenmayerSystemDefinition";
import {LindenmayerSystemRule} from "./LindenmayerSystemDefinition";

export class LindenmayerSystemLibrary {
    definitions:LindenmayerSystemLibraryDefinition[] = [
        new LindenmayerSystemLibraryDefinition("Dragon Curve", 12, "FX", "F+-", 90, 90, [ new LindenmayerSystemRule("X", "X+YF+"), new LindenmayerSystemRule("Y", "-FX-Y") ]),
        new LindenmayerSystemLibraryDefinition("Koch Curve", 5, "F", "+-", 90, 90, [ new LindenmayerSystemRule("F", "F+F-F-F+F") ]),
        new LindenmayerSystemLibraryDefinition("Sierpinski triangle", 10, "A", "+-", 60, 90, [ new LindenmayerSystemRule("A", "+B-A-B+"), new LindenmayerSystemRule("B", "-A+B+A-") ]),
        new LindenmayerSystemLibraryDefinition("Pythagoras tree", 7, "A", "[]+-", 45, 180, [ new LindenmayerSystemRule("A", "B[+A]-A"), new LindenmayerSystemRule("B", "BB") ]),
        new LindenmayerSystemLibraryDefinition("Fractal plant", 8, "X", "+-[]", 25, 180, [ new LindenmayerSystemRule("X", "F-[[X]+X]+F[+FX]-X"), new LindenmayerSystemRule("F", "FF") ]),
        new LindenmayerSystemLibraryDefinition("Seaweed", 6, "F", "+-[]012", 22, 180, [ new LindenmayerSystemRule("F", "0FF-[1-F+F+F]+[2+F-F-F]")]),
        new LindenmayerSystemLibraryDefinition("Crystal", 5, "F+F+F+F", "+", 90, 180, [ new LindenmayerSystemRule("F", "FF+F++F+F")]),
        new LindenmayerSystemLibraryDefinition("Rings", 5, "F+F+F+F", "+-", 90, 180, [ new LindenmayerSystemRule("F", "FF+F+F+F+F+F-F")])
    ];
}