import {PositionData} from "./PositionData";

export class PositionCalculator {

    move(position:PositionData, distance:number) {
        position.x += distance * Math.sin(position.facing * Math.PI / 180);
        position.y += distance * Math.cos(position.facing * Math.PI / 180);
    }

    rotate(position:PositionData, angle:number) {
        position.facing += angle;

        while (position.facing < 0) {
            position.facing += 360;
        }

        while (position.facing >= 360) {
            position.facing -= 360;
        }
    }
}