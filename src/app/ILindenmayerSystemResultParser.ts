export interface ILindenmayerSystemResultParser {
    moveForward(distance:number):void;
    rotate(angle:number):void;
    savePosition():void;
    restorePosition():void;
}
