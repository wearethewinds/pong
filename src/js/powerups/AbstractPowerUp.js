import UuidService from '../services/UuidService';
import GraphicService from '../services/GraphicService';

const width = 5;
const maxOffsetFromCenter = 80;
const color = '#FFFFFF';

class PowerUp {

    constructor (gameboard) {
        this.id = UuidService.getUuid();
        this.gameboard = gameboard;
        this.effectSecondsToLast = 10;
        this.color = color;
        this.easel = null;
    }
    
    spawn () {
        var x = Math.floor(Math.random() * (this.gameboard.getCanvasWidth() * maxOffsetFromCenter / this.gameboard.getWidth())),
            y = Math.floor(Math.random() * (this.gameboard.getCanvasHeight() * maxOffsetFromCenter / this.gameboard.getHeight()));
        if (Math.random() <= .5) {
            x *= -1;
        }
        if (Math.random() <= .5) {
            y *= -1;
        }
        let ballWidth = this.gameboard.getCanvasWidth() * (width / this.gameboard.getWidth());
        this.easel = GraphicService.Circle((this.gameboard.getCanvasWidth() / 2) + x, (this.gameboard.getCanvasHeight() / 2) + y, ballWidth, this.color);
        this.gameboard.getStage().addChild(this.easel);
    }

    
    hit (gameboard, myBar, opponentsBar, ball) {
        //myBar refers to the bar that hits the ball the last time
        console.warn('you need to implement this yourself!')
    }

}
module.exports = PowerUp;