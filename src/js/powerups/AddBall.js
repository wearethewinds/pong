import AbstractPowerUp from './AbstractPowerUp';

const color = 'rgba(77,144,144, .7)';

var AddBall = function () {
    PowerUp.apply(this, arguments);
    this.color = color;
};

AddBall.prototype = new AbstractPowerUp();

AddBall.prototype.hit = function (gameboard, myBar, opponentsBar, ball) {
    gameboard.addBall(ball.velocity / 2, ball.hozdirection, !ball.vertdirection, null, ball.x, ball.y);
};

export default AddBall;