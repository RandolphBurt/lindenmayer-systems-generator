import {Inject} from 'angular2/core';

import {PositionData} from "./PositionData";
import {PositionCalculator} from "./PositionCalculator";
import {ILindenmayerSystemResultProcessor} from "./ILindenmayerSystemResultProcessor";

export class LindenmayerSystemResultRenderer implements ILindenmayerSystemResultProcessor {
    constructor(@Inject(PositionCalculator) _positionCalculator:PositionCalculator) {
        this.positionCalculator = _positionCalculator;
    }

    private positionCalculator:PositionCalculator;
    private position:PositionData = new PositionData();
    private positionStack:PositionData[] = [];

    private canvasContext:any;

    // TODO: type of canvasContext
    initialise(canvasContext:any, x:number, y:number):void {
        this.canvasContext = canvasContext;
        this.position = new PositionData();
        this.position.x = x;
        this.position.y = y;
        this.position.facing = 0;
        this.canvasContext.moveTo(x, y);
    }

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
        this.canvasContext.stroke();
    }

    rotate(angle:number):void {
        this.positionCalculator.rotate(this.position, angle);
    }
}

