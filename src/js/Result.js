define(['Digits'], function (digit) {

    const width = 9.9;
    const height = 1.5;
    const digitspacing = 1;
    const color = '#FFFFFF';

    var Result = function (gameboard, points, x, y) {
        this.points = points || 0;
        this.currentDigitCount = getDigitCount(this.points);
        this.gameboard = gameboard;
        this.part = {
            row1: {
                row: []
            },
            row2: {
                row: []
            }
        };
        this.digits = [JSON.parse(JSON.stringify(this.part))];
        createContainer.call(this, x, y);
        this.render();
    };

    Result.prototype.setPoints = function (points) {
        if (getDigitCount(points) > this.currentDigitCount) {
            addDigitToContainer.call(this, this.currentDigitCount);
        }
        this.points = points;
        this.currentDigitCount = getDigitCount(this.points);
        this.render();
    }

    Result.prototype.render = function () {
        var number = null,
            dig = null,
            resultString = this.points.toString();
        for (var i = 0, max = resultString.length; i < max; ++i) {
            number = digit.get(+resultString[i]);
            dig = this.digits[i];
            if (number.row1.upper) {
                dig.row1.upper.set({alpha: .9});
            } else {
                dig.row1.upper.set({alpha: .0});
            }
            if (number.row1.lower) {
                dig.row1.lower.set({alpha: .9});
            } else {
                dig.row1.lower.set({alpha: .0});
            }
            if (number.row2.lower) {
                dig.row2.lower.set({alpha: .9});
            } else {
                dig.row2.lower.set({alpha: .0});
            }
            number.row1.row.forEach(function(part, index) {
                if (!!part) {
                    dig.row1.row[index].set({alpha: .9});
                } else {
                    dig.row1.row[index].set({alpha: .0});
                }
            }, this);
            number.row2.row.forEach(function(part, index) {
                if (!!part) {
                    dig.row2.row[index].set({alpha: .9});
                } else {
                    dig.row2.row[index].set({alpha: .0});
                }
            }, this);
        };
    };

    Result.prototype.addToStage = function (stage) {
        stage.addChild(this.container);
    };

    Result.width = width;
    Result.height = height;

    function createContainer (x, y) {
        this.container = new createjs.Container();
        createDigit.call(this, 0, 0);
        if (this.currentDigitCount > 1) {
            for (var i = 1; i < this.currentDigitCount; ++i) {
                addDigitToContainer.call(this, i);
            }
        }
        this.container.x = x;
        this.container.y = y;   
    };
    
    function addDigitToContainer(index) {
        var relativeWidth = this.gameboard.getCanvasWidth() * (width / this.gameboard.getWidth()),
            relativeSpacer = this.gameboard.getCanvasWidth() * (digitspacing / this.gameboard.getWidth());
        // left result indicator
        this.digits.push(JSON.parse(JSON.stringify(this.part)));
        createDigit.call(this, this.digits.length - 1, index * (relativeWidth + relativeSpacer));
        if (this.container.x < this.gameboard.getCanvasWidth() / 2) {
            this.container.x -= (2*relativeWidth - 3*relativeSpacer);
        }
    }
    
    function createDigit(index, relX) {
        this.digits[index].row1.upper = createHorizontalRect.call(this, relX, 0);
        this.container.addChild(this.digits[index].row1.upper);
        this.digits[index].row1.lower = createHorizontalRect.call(this, relX, width + height);
        this.container.addChild(this.digits[index].row1.lower);
        this.digits[index].row2.lower = createHorizontalRect.call(this, relX, 2*width + 2*height);
        this.container.addChild(this.digits[index].row2.lower);
        this.digits[index].row1.row.push(createVerticalRect.call(this, relX, height));
        this.container.addChild(this.digits[index].row1.row[0]);
        this.digits[index].row2.row.push(createVerticalRect.call(this, relX, 2*height + width));
        this.container.addChild(this.digits[index].row2.row[0]);
        this.digits[index].row1.row.push(createVerticalRect.call(this, relX + width - height, height));
        this.container.addChild(this.digits[index].row1.row[1]);
        this.digits[index].row2.row.push(createVerticalRect.call(this, relX + width - height, 2*height + width));
        this.container.addChild(this.digits[index].row2.row[1]);
    }

    function createHorizontalRect (x, y) {
        var rect = new createjs.Shape(),
            rectwidth = this.gameboard.getCanvasWidth() * (width / this.gameboard.getWidth()),
            rectheight = this.gameboard.getCanvasHeight() * (height / this.gameboard.getHeight());
        rect.graphics.beginStroke(color).beginFill(color).drawRoundRect(0,0, rectwidth, rectheight, 0);
        rect.x = this.gameboard.getCanvasWidth() * (x / this.gameboard.getWidth());
        rect.y = this.gameboard.getCanvasHeight() * (y / this.gameboard.getHeight());
        return rect;
    };

    function createVerticalRect (x, y) {
        var rect = new createjs.Shape(),
            rectwidth = this.gameboard.getCanvasHeight() * (height / this.gameboard.getHeight()),
            rectheight = this.gameboard.getCanvasWidth() * (width / this.gameboard.getWidth());
        rect.graphics.beginStroke(color).beginFill(color).drawRoundRect(0,0, rectwidth, rectheight, 0);
        rect.x = this.gameboard.getCanvasWidth() * (x / this.gameboard.getWidth());
        rect.y = this.gameboard.getCanvasHeight() * (y / this.gameboard.getHeight());
        return rect;
    }

    function getDigitCount(points) {
        return points.toString().length;
    }


    return Result;

});