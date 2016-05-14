import createjs from 'createjs-collection';

const width = 5;
const maxOffsetFromCenter = 80;
const color = '#FFFFFF';

var PowerUp = function (gameboard) {
    this.id = createUuid();
    this.gameboard = gameboard;
    this.effectSecondsToLast = 10;
    this.color = color;
    this.easel = null;
};

PowerUp.prototype.spawn = function () {
    var x = Math.floor(Math.random() * (this.gameboard.getCanvasWidth() * maxOffsetFromCenter / this.gameboard.getWidth())),
        y = Math.floor(Math.random() * (this.gameboard.getCanvasHeight() * maxOffsetFromCenter / this.gameboard.getHeight()));
    if (Math.random() <= .5) {
        x *= -1;
    }
    if (Math.random() <= .5) {
        y *= -1;
    }
    this.easel = createCircle.call(this, this.gameboard, x, y);
    this.gameboard.getStage().addChild(this.easel);
};

//myBar refers to the bar that hits the ball the last time
PowerUp.prototype.hit = function (gameboard, myBar, opponentsBar, ball) {
    console.warn('you need to implement this yourself!')
};

function createCircle(gameboard, x, y) {
    var circle = new createjs.createjs.Shape(),
        ballwidth = gameboard.getCanvasWidth() * (width / gameboard.getWidth());
    circle.graphics.beginFill(this.color).drawCircle(0, 0, ballwidth);
    circle.x = (gameboard.getCanvasWidth() / 2) + x;
    circle.y = (gameboard.getCanvasHeight() / 2) + y;
    return circle;
};

function createUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export default PowerUp;