import Ball from './Ball';
import Keyprofiles from './keyprofiles';
import Player from './Player';
import Result from './Result';
import PowerUpHandler from './PowerUpHandler';
import createjs from 'createjs-collection';

const height = 180;
const width = 320;

const resultoffset = 40;

var callbacks = [];

var stage = null;
var balls = [];
var bars = [];
var players = {};
var powerups = [];

var createCanvas = function () {
    var canvas = document.createElement('canvas');
    canvas.style.width = 1288;
    canvas.style.height = 720;
    canvas.setAttribute('id', 'gameboardCanvas');
    return canvas;
};

var getHeight = function () {
    return height;
};

var getStage = function () {
    return stage;
}

var getWidth = function () {
    return width;
};

var getCanvasHeight = function () {
    return stage.canvas.clientHeight;
};

var getCanvasWidth = function () {
    return stage.canvas.clientWidth;
};

var spawnPowerUp = function () {
    if (powerups.length >= 1) {
        return;
    }
    var rand = Math.floor(Math.random() * 1000);
    console.log(rand);
    if (rand === 666) {
        var powerup = PowerUpHandler.spawn(this);
        powerups.push(powerup);
    }

};

var removePowerup = function (powerUp) {
    var i, max;
    for (i = 0, max = powerups.length; i < max; ++i) {
        if (powerUp.id === powerups[i].id) {
            break;
        }
    }
    powerups.splice(i, 1);
};

var resetBall = function (oldBall) {
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
            addBall.call(this, null, !oldBall.hozdirection);
        }

    }
};

var addBall = function (velocity, hozdirection, vertdirection, angle, x, y) {
    var ball = new Ball(this, velocity, hozdirection, vertdirection, angle, x, y);
    ball.addToStage(stage);
    balls.push(ball);
}

var start = function () {
    var i = 0;
    document.getElementById('gameboard').appendChild(createCanvas());
    stage = new createjs.createjs.Stage('gameboardCanvas');
    stage.canvas.width = 1280;
    stage.canvas.height = 720;
    addBall.call(this);
    createPlayer.call(this, stage, 'left', Keyprofiles.left);
    createPlayer.call(this, stage, 'right', Keyprofiles.right);
    registerToLoop(spawnPowerUp.bind(this));
    createjs.createjs.Ticker.setFPS(60);
    createjs.createjs.Ticker.addEventListener('tick', function () {
        stage.update();
        for (i = callbacks.length - 1; i >= 0; --i) {
            callbacks[i]();
        }
    });
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
};

var registerToLoop = function (func) {
    if (typeof func === 'function') {
        callbacks.push(func);
    }
};

export default {
    addBall: addBall,
    start: start,
    getBars: function () {
        return bars;
    },
    getPlayer: function (orient) {
        return players[orient] || null;
    },
    getHeight: getHeight,
    getPowerUp: function () {
        return powerups;
    },
    getStage: getStage,
    getWidth: getWidth,
    getCanvasHeight: getCanvasHeight,
    getCanvasWidth: getCanvasWidth,
    registerToLoop: registerToLoop,
    removePowerup: removePowerup,
    resetBall: resetBall
};