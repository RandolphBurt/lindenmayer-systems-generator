import { Inject } from '@angular/core';

import { ResultRenderer } from './result-renderer';
import { PositionCalculator } from '../position-calculator';
import { PositionData } from '../position-data';

export class ResultRendererFactory {
    private positionCalculator: PositionCalculator;

    constructor(@Inject(PositionCalculator) _positionCalculator: PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    Create(canvasContext: any, x: number, y: number): ResultRenderer {

        let position = new PositionData();
        position.x = x;
        position.y = y;
        canvasContext.moveTo(x, y);

        return new ResultRenderer(this.positionCalculator, canvasContext, position);
    }
}
