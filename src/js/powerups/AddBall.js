define(['powerups/AbstractPowerUp'], function (PowerUp) {

    const color = 'rgba(77,144,144, .7)';

    var AddBall = function () {
        PowerUp.apply(this, arguments);
        this.color = color;
    };

    AddBall.prototype = new PowerUp();

    AddBall.prototype.hit = function (gameboard, myBar, opponentsBar, ball) {
        gameboard.addBall(ball.velocity / 2, ball.hozdirection, !ball.vertdirection, null, ball.x, ball.y);
    };

    return AddBall;

});