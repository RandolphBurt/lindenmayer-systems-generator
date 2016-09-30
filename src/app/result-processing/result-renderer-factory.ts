import { Inject } from '@angular/core';

import { ResultRenderer } from './result-renderer';
import { PositionCalculator } from '../position-calculator';
import { PositionData } from '../position-data';

export class ResultRendererFactory {
    constructor(@Inject(PositionCalculator) _positionCalculator:PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    private positionCalculator:PositionCalculator;

    Create(canvasContext:any, x:number, y:number):ResultRenderer {

        var position = new PositionData();
        position.x = x;
        position.y = y;
        canvasContext.moveTo(x, y);

        return new ResultRenderer(this.positionCalculator, canvasContext, position);
    }
}