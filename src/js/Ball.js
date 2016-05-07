define([], function () {

    const width = 5;
    const maxangle = 150;
    const minangle = 30;
    const maxoffset = 25;

    var Ball = function (gameboard, velocity, hozdirection, vertdirection, angle, x, y) {
        this.id = createUuid();
        this.gameboard = gameboard;;
        this.x = x || (gameboard.getWidth() / 2) - (width / 2);
        this.y = y || (gameboard.getHeight() / 2) - (width / 2);
        this.oldX = null;
        this.oldY = null;
        this.easel = createBall(this.gameboard, this.x, this.y);
        this.velocity = velocity || 2.5;
        this.collisionOffset = 0;
        // false => left , true => right
        this.hozdirection = hozdirection || Math.random()<.5;
        // false => top, true => bottom
        this.vertdirection = vertdirection || Math.random()<.5;
        this.angle = angle || Math.floor(Math.random() * (maxangle - minangle)) + minangle;
        this.running = true;
        this.anim = null;
        this.gameboard.registerToLoop(this.render.bind(this));
    };

    Ball.prototype.addToStage = function (stage) {
        stage.addChild(this.easel);
        stage.update();
    };

    Ball.prototype.destroy = function () {
        if (this.anim) {
            clearInterval(this.anim);
        }
    };

    Ball.prototype.render = function () {
        if (!this.running) {
            return;
        }
        var val = (Math.PI / 180) * (this.angle - 90);
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = this.hozdirection ? this.oldX - (this.velocity * Math.cos(val)) : this.oldX + (this.velocity * Math.cos(val));
        this.y = this.vertdirection ? this.oldY - (this.velocity * Math.sin(val)) : this.oldY + (this.velocity * Math.sin(val));
        this.move();
    };

    Ball.prototype.hit = function (bar, offset) {
        this.collisionOffset = 0;
        var diffFromTop = Math.max(0, offset);
        var recalcToGameDimension = (this.gameboard.getHeight() / this.gameboard.getCanvasHeight()) * diffFromTop;
        var angleOffset = (Math.abs(recalcToGameDimension - (bar.getHeight() / 2)) / (bar.getHeight() / 2)) * maxoffset;
        if (this.anim) {
          clearInterval(this.anim);
        }
        if (!this.vertdirection && offset <= 15 || this.vertdirection && offset > 15) {
            this.angle = Math.max(minangle, this.angle - angleOffset);
        } else {
            this.angle = Math.min(maxangle, this.angle + angleOffset);
        }
        this.hozdirection = !this.hozdirection;
        this.velocity *= 1.05;
        //this.start();
    };

    Ball.prototype.move = function () {
        ++this.collisionOffset;
        var bars = this.gameboard.getBars();
        this.easel.x = this.gameboard.getCanvasWidth() * (this.x / this.gameboard.getWidth());
        this.easel.y = this.gameboard.getCanvasHeight() * (this.y / this.gameboard.getHeight());
        if (this.y - width <= 0 || this.y + width >= this.gameboard.getHeight()) {
            this.vertdirection = !this.vertdirection;
        }
        var player = null;
        if (this.x + width <= 0 && this.collisionOffset > 50) {
            this.running = false;
            player = this.gameboard.getPlayer('right');
            if (player !== null) {
                player.increasePoints();
            }
            return this.gameboard.resetBall(this);
        }
        if (this.x - width >= this.gameboard.getWidth() && this.collisionOffset > 50) {
            this.running = false;
            player = this.gameboard.getPlayer('left');
            if (player !== null) {
                player.increasePoints();
            }
            return this.gameboard.resetBall(this);
        }
        detectCollision.call(this, bars, this.gameboard.getPowerUp());
    };

    function detectCollision(bars, powerups) {
        var ballwidth = this.gameboard.getCanvasWidth() * (width / this.gameboard.getWidth()),
            pt = null,
            checkPoints,
            bar = null;
        if (this.hozdirection) {
            bar = bars[0];
            checkPoints = [
                [-ballwidth, 0],
                [0, -ballwidth],
                [0, ballwidth],
                [-ballwidth / 2, ballwidth / 2],
                [-ballwidth / 2, -(ballwidth / 2)]
            ];
        } else {
            bar = bars[1];
            checkPoints = [
                [ballwidth, 0],
                [0, -ballwidth],
                [0, ballwidth],
                [ballwidth / 2, ballwidth / 2],
                [ballwidth / 2, -(ballwidth / 2)]
            ];
        }
        checkPoints.forEach(function (checkPoint) {
            checkPoint.push(bar.easel);
            pt = this.easel.localToLocal.apply(this.easel, checkPoint);
            if (checkPoint[2].hitTest(pt.x, pt.y)) {
                this.hit(bar, pt.y);
            }
        }, this);

        checkPoints = [
            [ballwidth, 0],
            [0, -ballwidth],
            [0, ballwidth],
            [ballwidth / 2, ballwidth / 2],
            [ballwidth / 2, -(ballwidth / 2)],
            [-ballwidth, 0],
            [-ballwidth / 2, ballwidth / 2],
            [-ballwidth / 2, -(ballwidth / 2)]
        ];

        powerups.forEach(function (powerup) {
            var i, max, checkPoint;
            for (i = 0, max = checkPoints.length; i < max; ++i) {
                checkPoint = checkPoints[i];
                checkPoint.push(powerup.easel);
                pt = this.easel.localToLocal.apply(this.easel, checkPoint);
                if (checkPoint[2].hitTest(pt.x, pt.y)) {
                    var myBar = this.hozdirection ? bars[1] : bars[0];
                    var opponentsBar = this.hozdirection ? bars[0] : bars[1];
                    this.gameboard.getStage().removeChild(powerup.easel);
                    this.gameboard.removePowerup(powerup);
                    powerup.hit(this.gameboard, myBar, opponentsBar, this);
                    break;
                }
            }
        }, this);

    }

    function createBall (gameboard, x, y) {
        var circle = new createjs.Shape(),
            ballwidth = gameboard.getCanvasWidth() * (width / gameboard.getWidth());
        circle.graphics.beginFill("#00FF00").drawCircle(0,0, ballwidth);
        circle.x = gameboard.getCanvasWidth() * (x / gameboard.getWidth());
        circle.y = gameboard.getCanvasHeight() * (y / gameboard.getHeight());
        return circle;
    };

    function createUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };

    return Ball;

});