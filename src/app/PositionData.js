var PositionData = (function () {
    function PositionData(copyPosition) {
        this.x = 0;
        this.y = 0;
        this.facing = 0;
        if (copyPosition) {
            this.x = copyPosition.x;
            this.y = copyPosition.y;
            this.facing = copyPosition.facing;
        }
        else {
            this.x = this.y = this.facing = 0;
        }
    }
    return PositionData;
})();
exports.PositionData = PositionData;
//# sourceMappingURL=PositionData.js.map