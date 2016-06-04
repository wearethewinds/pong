import AbstractPowerUp from './AbstractPowerUp';

const color = 'rgba(144,77,144, .7)';

class ReduceBarHeight extends AbstractPowerUp {

    constructor(gameboard) {
        super(gameboard);
        this.color = color;
    }

    hit (gameboard, myBar, opponentsBar, ball) {
        opponentsBar.tickOffset *= -1;
        setTimeout(function () {
            if (opponentsBar.tickOffset < 0) {
              opponentsBar.tickOffset *= -1;
            }
        }, this.effectSecondsToLast * 1000);
    }

}

module.exports = ReduceBarHeight;
