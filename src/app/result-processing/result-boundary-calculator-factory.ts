import { Inject } from '@angular/core';

import { ResultBoundaryCalculator } from './result-boundary-calculator';
import { PositionCalculator } from '../position-calculator';

export class ResultBoundaryCalculatorFactory {
    private positionCalculator: PositionCalculator;

    constructor(@Inject(PositionCalculator) _positionCalculator: PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    Create(): ResultBoundaryCalculator {
        return new ResultBoundaryCalculator(this.positionCalculator);
    }
}
