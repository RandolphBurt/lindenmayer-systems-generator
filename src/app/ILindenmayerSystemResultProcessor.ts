export interface ILindenmayerSystemResultProcessor {
    moveForward(distance:number):void;
    rotate(angle:number):void;
    savePosition():void;
    restorePosition():void;
}
