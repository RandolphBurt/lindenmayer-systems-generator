export interface IResultProcessor {
    setColour(colour: string): void;
    moveForward(distance: number): void;
    rotate(angle: number): void;
    savePosition(): void;
    restorePosition(): void;
}
