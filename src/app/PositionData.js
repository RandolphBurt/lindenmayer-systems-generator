var PositionData = (function () {
    function PositionData(copyPosition) {
        if (copyPosition) {
            this.x = copyPosition.x;
            this.y = copyPosition.y;
            this.facing = copyPosition.facing;
        }
        else {
            this.facing = 180;
            this.x = this.y = 0;
        }
    }
    return PositionData;
})();
exports.PositionData = PositionData;
//# sourceMappingURL=PositionData.js.map