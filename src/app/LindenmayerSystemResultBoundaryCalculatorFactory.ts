import {Inject} from 'angular2/core';

import {LindenmayerSystemResultBoundaryCalculator} from "./LindenmayerSystemResultBoundaryCalculator";
import {PositionCalculator} from "./PositionCalculator";
import {PositionData} from "./PositionData";

export class LindenmayerSystemResultBoundaryCalculatorFactory {
    constructor(@Inject(PositionCalculator) _positionCalculator:PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    private positionCalculator:PositionCalculator;

    Create(facing:number):LindenmayerSystemResultBoundaryCalculator {
        var position = new PositionData();
        position.facing = facing;

        return new LindenmayerSystemResultBoundaryCalculator(this.positionCalculator, position);
    }
}