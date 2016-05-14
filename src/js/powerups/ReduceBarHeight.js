import AbstractPowerUp from './AbstractPowerUp';

const color = 'rgba(144,77,77, .7)';

class ReduceBarHeight extends AbstractPowerUp {

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

module.exports = ReduceBarHeight;