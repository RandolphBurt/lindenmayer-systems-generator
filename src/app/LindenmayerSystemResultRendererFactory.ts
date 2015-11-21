import {Inject} from 'angular2/core';

import {LindenmayerSystemResultRenderer} from "./LindenmayerSystemResultRenderer";
import {PositionCalculator} from "./PositionCalculator";
import {PositionData} from "./PositionData";

export class LindenmayerSystemResultRendererFactory {
    constructor(@Inject(PositionCalculator) _positionCalculator:PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    private positionCalculator:PositionCalculator;

    Create(canvasContext:any, x:number, y:number):LindenmayerSystemResultRenderer {

        var position = new PositionData();
        position.x = x;
        position.y = y;
        canvasContext.moveTo(x, y);

        return new LindenmayerSystemResultRenderer(this.positionCalculator, canvasContext, position);
    }
}