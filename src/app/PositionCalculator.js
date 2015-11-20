var PositionCalculator = (function () {
    function PositionCalculator() {
    }
    PositionCalculator.prototype.move = function (position, distance) {
        position.x += distance * Math.cos(position.facing * Math.PI / 180);
        position.y += distance * Math.sin(position.facing * Math.PI / 180);
    };
    PositionCalculator.prototype.rotate = function (position, angle) {
        position.facing += angle;
        while (position.facing < 0) {
            position.facing += 360;
        }
        while (position.facing > 360) {
            position.facing -= 360;
        }
    };
    return PositionCalculator;
})();
exports.PositionCalculator = PositionCalculator;
//# sourceMappingURL=PositionCalculator.js.map