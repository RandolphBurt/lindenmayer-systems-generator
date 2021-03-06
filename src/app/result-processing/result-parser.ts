import { IResultProcessor } from './iresult-processor';
import { LindenmayerSystemDefinition } from '../data-definitions/lindenmayer-system-definition';

export class ResultParser {
    parseResult(resultProcessor: IResultProcessor, lindenmayerSystemDefinition: LindenmayerSystemDefinition, result: string): void {
        for (let char of result) {
            switch (char) {
                case '0': // brown
                    resultProcessor.setColour('#663300');
                    break;
                case '1': // dark green
                    resultProcessor.setColour('#003300');
                    break;
                case '2': // light green
                    resultProcessor.setColour('#008000');
                    break;
                case 'A':
                case 'B':
                case 'F':
                    resultProcessor.moveForward(6);
                    break;
                case '+':
                    resultProcessor.rotate(-1 * lindenmayerSystemDefinition.turningAngle);
                    break;
                case '-':
                    resultProcessor.rotate(lindenmayerSystemDefinition.turningAngle);
                    break;
                case '[':
                    resultProcessor.savePosition();
                    break;
                case ']':
                    resultProcessor.restorePosition();
                    break;
            }
        }
    }
}
