import { IResultProcessor } from './iresult-processor';
import { PositionCalculator } from '../position-calculator';
import { PositionData } from '../position-data';

export class ResultRenderer implements IResultProcessor {
    constructor(_positionCalculator:PositionCalculator, _canvasContext:CanvasRenderingContext2D, _position:PositionData) {
        this.positionCalculator = _positionCalculator;
        this.position = _position;
        this.canvasContext = _canvasContext;
    }

    private positionCalculator:PositionCalculator;
    private position:PositionData;
    private canvasContext:any;

    private positionStack:PositionData[] = [];

    savePosition():void {
        this.positionStack.push(this.position);
        this.position = new PositionData(this.position);
    }

    restorePosition():void {
        this.position = this.positionStack.pop();
        this.canvasContext.moveTo(this.position.x, this.position.y);
    }

    setColour(colour:string):void {
        this.canvasContext.strokeStyle = colour;
    }

    moveForward(distance:number):void {
        this.positionCalculator.move(this.position, distance);
        this.canvasContext.lineTo(this.position.x, this.position.y);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.position.x, this.position.y);
    }

    rotate(angle:number):void {
        this.positionCalculator.rotate(this.position, angle);
    }
}