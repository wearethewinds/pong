import AbstractPowerUp from './AbstractPowerUp';

const color = 'rgba(77,144,144, .7)';

class AddBallPowerUp extends AbstractPowerUp {

    constructor(gameboard) {
        super(gameboard);
        this.color = color;
    }

    hit (gameboard, myBar, opponentsBar, ball) {
        gameboard.addBall(ball.velocity / 2, ball.hozdirection, !ball.vertdirection, null, ball.x, ball.y);
    }

}

module.exports = AddBallPowerUp;