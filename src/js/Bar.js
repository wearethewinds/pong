define(['easeljs'], function () {
    const height = 35;
    const width = 10;
    const tickOffset = 2.5;

    var keyState = {};

    var Bar = function (y, orient, gameboard, keyprofile) {
        this.gameboard = gameboard;
        this.x = (orient === 'left') ? width / 2 : this.gameboard.getWidth() - 1.5 * width;
        this.y = y - height / 2;
        this.easel = createBar(this.gameboard, this.x, this.y);
        if (keyprofile) {
            registerControls.call(this, keyprofile);
        }
    };

    Bar.prototype.addToStage = function (stage) {
        stage.addChild(this.easel);
        stage.update();
    };

    Bar.prototype.getHeight = function () {
        return height * this.easel.scaleY;
    };

    Bar.prototype.getWidth = function () {
        return width * this.easel.scaleX;
    };

    Bar.prototype.setY = function (y) {
        this.y = Math.max(0, Math.min(this.gameboard.getHeight() - this.getHeight(), y));
        this.easel.y = this.gameboard.getCanvasHeight() * (this.y / this.gameboard.getHeight());
    };

    function createBar (gameboard, x, y) {
        var bar = new createjs.Shape(),
            barwidth = gameboard.getCanvasWidth() * (width / gameboard.getWidth()),
            barheight = gameboard.getCanvasHeight() * (height / gameboard.getHeight());
        bar.graphics.beginFill("#00FF00").drawRoundRect(0,0, barwidth, barheight, 0);
        bar.x = gameboard.getCanvasWidth() * (x / gameboard.getWidth());
        bar.y = gameboard.getCanvasHeight() * (y / gameboard.getHeight());
        return bar;
    };


    function registerControls (keyprofile) {
        document.onkeydown = function (e) {
            keyState[e.keyCode || e.which] = true;
        };
        document.onkeyup = function (e) {
            keyState[e.keyCode || e.which] = false;
        };
        this.gameboard.registerToLoop(function () {
            var i,
                max,
                offset = null;;
            for (i = 0, max = keyprofile.up.length; i < max; ++i) {
                if (keyState[keyprofile.up[i]]) {
                    offset = -tickOffset;
                    break;
                }
            }
            for (i = 0, max = keyprofile.down.length; i < max; ++i) {
                if (keyState[keyprofile.down[i]]) {
                    offset = tickOffset;
                    break;
                }
            }
            if (offset !== null) {
                this.setY((this.y) + offset);
            }
        }.bind(this));
    };

    return Bar;

});