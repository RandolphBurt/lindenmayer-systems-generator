import {Inject} from 'angular2/core';

import {ILindenmayerSystemResultProcessor} from "./ILindenmayerSystemResultProcessor";
import {PositionCalculator} from "./PositionCalculator";
import {PositionData} from "./PositionData";

export class LindenmayerSystemResultBoundaryCalculator implements ILindenmayerSystemResultProcessor {
    constructor(@Inject(PositionCalculator) _positionCalculator:PositionCalculator, _position:PositionData ) {
        this.positionCalculator = _positionCalculator;
        this.position = _position;
    }

    private positionCalculator:PositionCalculator;
    private position:PositionData;
    private positionStack:PositionData[] = [];

    minX:number = 0;
    maxX:number = 0;
    minY:number = 0;
    maxY:number = 0;

    setColour(colour:string):void {}

    savePosition():void {
        this.positionStack.push(this.position);
        this.position = new PositionData(this.position);
    }

    restorePosition():void {
        this.position = this.positionStack.pop();
    }

    moveForward(distance:number):void {
        this.positionCalculator.move(this.position, distance);

        if (this.position.x < this.minX) {
            this.minX = this.position.x;
        } else if (this.position.x > this.maxX) {
            this.maxX = this.position.x;
        }

        if (this.position.y < this.minY) {
            this.minY = this.position.y;
        } else if (this.position.y > this.maxY) {
            this.maxY = this.position.y;
        }
    }

    rotate(angle:number):void {
        this.positionCalculator.rotate(this.position, angle);
    }
}