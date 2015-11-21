var LindenmayerSystemResultParser = (function () {
    function LindenmayerSystemResultParser() {
    }
    LindenmayerSystemResultParser.prototype.parseResult = function (resultProcessor, lindenmayerSystemDefinition, result) {
        for (var _i = 0; _i < result.length; _i++) {
            var char = result[_i];
            switch (char) {
                case "0":
                    resultProcessor.setColour("#663300");
                    break;
                case "1":
                    resultProcessor.setColour("#003300");
                    break;
                case "2":
                    resultProcessor.setColour("#008000");
                    break;
                case "A":
                case "B":
                case "F":
                    resultProcessor.moveForward(6);
                    break;
                case "+":
                    resultProcessor.rotate(-1 * lindenmayerSystemDefinition.turningAngle);
                    break;
                case "-":
                    resultProcessor.rotate(lindenmayerSystemDefinition.turningAngle);
                    break;
                case "[":
                    resultProcessor.savePosition();
                    break;
                case "]":
                    resultProcessor.restorePosition();
                    break;
            }
        }
    };
    return LindenmayerSystemResultParser;
})();
exports.LindenmayerSystemResultParser = LindenmayerSystemResultParser;
//# sourceMappingURL=LindenmayerSystemResultParser.js.map