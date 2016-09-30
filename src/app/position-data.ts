export class PositionData {
    constructor(copyPosition?:PositionData) {
        if (copyPosition) {
            this.x = copyPosition.x;
            this.y = copyPosition.y;
            this.facing = copyPosition.facing;
        } else {
            // y axis is inverted on Canvas (0, 0) is top left hand corner.  Therefore 180 is facing up.
            this.facing = 180;
            this.x = this.y = 0;
        }
    }

    x: number;
    y: number;
    facing: number;
}