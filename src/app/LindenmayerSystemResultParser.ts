import {ILindenmayerSystemResultProcessor} from "./ILindenmayerSystemResultProcessor";
import {LindenmayerSystemDefinition} from "./LindenmayerSystemDefinition";

export class LindenmayerSystemResultParser {
    parseResult(resultProcessor:ILindenmayerSystemResultProcessor, lindenmayerSystemDefinition:LindenmayerSystemDefinition, result:string): void {
        for (var char of result) {
            switch (char) {
                case "0": // brown
                    resultProcessor.setColour("#663300");
                    break;
                case "1": // dark green
                    resultProcessor.setColour("#003300");
                    break;
                case "2": // light green
                    resultProcessor.setColour("#008000");
                    break;
                case "A":
                case "B":
                case "F":
                    resultProcessor.moveForward(6);
                    break;
                case "+":
                    resultProcessor.rotate(-1 * lindenmayerSystemDefinition.turningAngle);
                    break;
                case "-":
                    resultProcessor.rotate(lindenmayerSystemDefinition.turningAngle);
                    break;
                case "[":
                    resultProcessor.savePosition();
                    break;
                case "]":
                    resultProcessor.restorePosition();
                    break;
            }
        }
    }
}