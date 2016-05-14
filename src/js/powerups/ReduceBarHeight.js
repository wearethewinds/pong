import AbstractPowerUp from './AbstractPowerUp';

const color = 'rgba(77,144,144, .7)';

class AddBallPowerUp extends AbstractPowerUp {

    constructor(gameboard) {
        super(gameboard);
        this.color = color;
    }

    hit (gameboard, myBar, opponentsBar, ball) {
        opponentsBar.easel.scaleY = .6;
        setTimeout(function () {
            opponentsBar.easel.scaleY = 1;
        }, this.effectSecondsToLast * 1000);
    }

}

module.exports = AddBallPowerUp;