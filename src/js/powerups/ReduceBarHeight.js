define(['powerups/AbstractPowerUp'], function (PowerUp) {

    const color = 'rgba(144,144,77, .7)';

    var ReduceBarHeight = function () {
        PowerUp.apply(this, arguments);
        this.color = color;
    };

    ReduceBarHeight.prototype = new PowerUp();

    ReduceBarHeight.prototype.hit = function (gameboard, myBar, opponentsBar, ball) {
        opponentsBar.easel.scaleY = .6;
        setTimeout(function () {
            opponentsBar.easel.scaleY = 1;
        }, this.effectSecondsToLast * 1000);
    };

    return ReduceBarHeight;

});