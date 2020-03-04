var config = function() {
    //Const - Could Configure
    this.colors = [
        0xFFFF00,
        0xFF00FF,
        0x0000FF,
        0x00FF00,
        0xFF0000,
    ];

    this.blockHightlight = 0x000000;

    this.railColor = 0xFFFFFF;

    this.paddleColorOuter = 0x00FF00;
    this.paddleColorInner = 0xFFFFFF;

    this.breakerColorOuter = 0xFFFFFF;
    this.breakerColorInner = 0x000000;

    this.scoreColor = 0x00FF00;

    this.playerNotificationColor = '#00FF00';

    this.colorCount = this.colors.length;
    this.rowCount = 5;
    this.columnCount = 15;

    this.blockWidth = 20;
    this.blockHeight = 12;
    this.blockBuffer = 5;

    this.velocity = 0.75;
    this.paddleSpeed = 0;

    this.breakerWidth = 5;
    this.breakerHeight = 5;

    this.paddleHeight = 5;
    this.paddleWidth = 15;

    this.breakerStart = -30;
    this.paddleStart = -100;

    this.railWidth = 5;
    this.railBuffer = 15;

    this.blockSpaceWidth = (this.columnCount * this.blockWidth) + (this.columnCount * this.blockBuffer);
    this.blockSpaceHeight = (this.rowCount * this.blockHeight) + (this.rowCount * this.blockBuffer);

    this.railSpaceWidth = this.blockSpaceWidth + this.railBuffer;
    this.railSpaceHeight = this.blockSpaceHeight + this.railBuffer;

    this.leftBound = -(this.railBuffer + this.railWidth);
    this.rightBound = this.railSpaceWidth - this.railBuffer;
    this.bottomBound = this.paddleStart - 20;

    this.numberOfLives = 3;
};

config.prototype = function() {

    return {};
}();