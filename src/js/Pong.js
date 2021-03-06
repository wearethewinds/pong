import Ball from './Ball';
import Keyprofiles from './keyprofiles';
import Player from './Player';
import Result from './Result';
import PowerUpManager from './PowerUpManager';
import createjs from 'createjs-collection';

const height = 180;
const width = 320;

const resultoffset = 40;

let callbacks = [];
let stage = null;
let balls = [];
let bars = [];
let players = {};
let powerups = [];

class Pong {


    constructor() {

    }

    start () {
        document.getElementById('gameboard').appendChild(createCanvas());
        stage = new createjs.createjs.Stage('gameboardCanvas');
        stage.canvas.width = 1280;
        stage.canvas.height = 720;
        this.addBall();
        createPlayer.call(this, stage, 'left', Keyprofiles.left);
        createPlayer.call(this, stage, 'right', Keyprofiles.right);
        this.registerToLoop(spawnPowerUp.bind(this));
        createjs.createjs.Ticker.setFPS(60);
        createjs.createjs.Ticker.addEventListener('tick', function () {
            stage.update();
            for (let i = callbacks.length - 1; i >= 0; --i) {
                callbacks[i]();
            }
        });
    }

    addBall (velocity, hozdirection, vertdirection, angle, x, y) {
        var ball = new Ball(this, velocity, hozdirection, vertdirection, angle, x, y);
        ball.addToStage(stage);
        balls.push(ball);
    }

    getBars () {
        return bars;
    }

    getHeight () {
        return height;
    };

    getPlayer (orient) {
        return players[orient] || null;
    }

    getPowerUp () {
        return powerups;
    }

    getStage () {
        return stage;
    }

    getWidth () {
        return width;
    };

    getCanvasHeight () {
        return stage.canvas.clientHeight;
    };

    getCanvasWidth () {
        return stage.canvas.clientWidth;
    };

    registerToLoop (func) {
        if (typeof func === 'function') {
            callbacks.push(func);
        }
    };

    resetBall (oldBall) {
        var i;
        oldBall.destroy();
        stage.removeChild(oldBall);
        for (i = 0; i < balls.length; ++i) {
            if (oldBall.id === balls[i].id) {
                break;
            }
        }
        if (i < balls.length) {
            balls.splice(i, 1);
            if (balls.length === 0) {
                this.addBall(null, !oldBall.hozdirection);
            }

        }
    }

    removePowerUp (powerUp) {
        var i, max;
        for (i = 0, max = powerups.length; i < max; ++i) {
            if (powerUp.id === powerups[i].id) {
                break;
            }
        }
        powerups.splice(i, 1);
    }
}

var createCanvas = function () {
    var canvas = document.createElement('canvas');
    canvas.style.width = 1288;
    canvas.style.height = 720;
    canvas.setAttribute('id', 'gameboardCanvas');
    return canvas;
};

var spawnPowerUp = function () {
    if (powerups.length >= 1) {
        return;
    }
    var rand = Math.floor(Math.random() * 1000);
    if (rand === 666) {
        var powerup = PowerUpManager.spawn(this);
        powerups.push(powerup);
    }

};

function createPlayer(stage, orient, controllable) {
    var player = new Player(orient, controllable);
    var xOffset = null;
    var yOffset = this.getCanvasHeight() * (resultoffset / this.getHeight());
    var x = null;
    if (orient === 'left') {
        xOffset = this.getCanvasWidth() * ((resultoffset + Result.width) / this.getWidth());
        console.log(xOffset);
        x = this.getCanvasWidth() / 2 - (xOffset);
        console.log(x);
    } else {
        xOffset = this.getCanvasWidth() * (resultoffset / this.getWidth());
        x = this.getCanvasWidth() / 2 + xOffset;
        console.log(x);
    }
    player.createResult(this, stage, x, yOffset);
    bars.push(player.createBar(height / 2, this, stage));
    players[orient] = player;
}

module.exports = new Pong();