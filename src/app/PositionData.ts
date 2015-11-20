export class PositionData {
    constructor(copyPosition?:PositionData) {
        if (copyPosition) {
            this.x = copyPosition.x;
            this.y = copyPosition.y;
            this.facing = copyPosition.facing;
        } else {
            this.x = this.y = this.facing = 0;
        }
    }

    x: number = 0;
    y: number = 0;

    facing: number = 0;
}