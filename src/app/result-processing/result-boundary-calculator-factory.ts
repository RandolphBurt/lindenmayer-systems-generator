import { Inject } from '@angular/core';

import { ResultBoundaryCalculator } from './result-boundary-calculator';
import { PositionCalculator } from '../position-calculator';

export class ResultBoundaryCalculatorFactory {
    constructor(@Inject(PositionCalculator) _positionCalculator:PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    private positionCalculator:PositionCalculator;

    Create():ResultBoundaryCalculator {
        return new ResultBoundaryCalculator(this.positionCalculator);
    }
}