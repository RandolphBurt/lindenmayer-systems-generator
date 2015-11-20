import {Inject} from 'angular2/core';

import {PositionData} from "./PositionData";
import {PositionCalculator} from "./PositionCalculator";
import {ILindenmayerSystemResultParser} from "./ILindenmayerSystemResultParser";

export class LindenmayerSystemResultRenderer implements ILindenmayerSystemResultParser {
    constructor(@Inject(PositionCalculator) _positionCalculator:PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    private positionCalculator:PositionCalculator;
    private position:PositionData = new PositionData();
    private positionStack:PositionData[] = [];

    private canvasContext:any;

    savePosition():void {
        this.positionStack.push(this.position);
        this.position = new PositionData(this.position);
    }

    restorePosition():void {
        this.position = this.positionStack.pop();
        this.canvasContext.moveTo(this.position.x, this.position.y);
    }

    moveForward(distance:number):void {
        this.positionCalculator.move(this.position, distance);
        this.canvasContext.lineTo(this.position.x, this.position.y);
    }

    rotate(angle:number):void {
        this.positionCalculator.rotate(this.position, angle);
    }
}

