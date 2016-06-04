import GraphicService from './services/GraphicService';

const height = 35;
const width = 10;
const tickOffset = 2.5;
const color = "#00FF00";

var keyState = {};

class Bar {

    constructor (y, orient, gameboard, keyprofile) {
        this.gameboard = gameboard;
        this.tickOffset = tickOffset;
        this.x = (orient === 'left') ? width / 2 : this.gameboard.getWidth() - 1.5 * width;
        this.y = y - height / 2;
        this.easel = GraphicService.Bar(
            gameboard.getCanvasWidth() * (this.x / this.gameboard.getWidth()),
            gameboard.getCanvasHeight() * (this.y / this.gameboard.getHeight()),
            gameboard.getCanvasWidth() * (width / this.gameboard.getWidth()),
            gameboard.getCanvasHeight() * (height / this.gameboard.getHeight()),
            color
        );
        if (keyprofile) {
            registerControls.call(this, keyprofile);
        }
    }

    addToStage (stage) {
        stage.addChild(this.easel);
        stage.update();
    }

    getHeight () {
        return height * this.easel.scaleY
    }

    getWidth () {
        return width * this.easel.scaleX;
    }

    setY (y) {
        this.y = Math.max(0, Math.min(this.gameboard.getHeight() - this.getHeight(), y));
        this.easel.y = this.gameboard.getCanvasHeight() * (this.y / this.gameboard.getHeight());
    }

}

function registerControls(keyprofile) {
    document.onkeydown = function (e) {
        keyState[e.keyCode || e.which] = true;
    };
    document.onkeyup = function (e) {
        keyState[e.keyCode || e.which] = false;
    };
    this.gameboard.registerToLoop(function () {
        var i,
            max,
            offset = null;
        ;
        for (i = 0, max = keyprofile.up.length; i < max; ++i) {
            if (keyState[keyprofile.up[i]]) {
                offset = -this.tickOffset;
                break;
            }
        }
        for (i = 0, max = keyprofile.down.length; i < max; ++i) {
            if (keyState[keyprofile.down[i]]) {
                offset = this.tickOffset;
                break;
            }
        }
        if (offset !== null) {
            this.setY((this.y) + offset);
        }
    }.bind(this));
};

module.exports = Bar;
