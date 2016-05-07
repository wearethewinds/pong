define(['Bar', 'Result'], function (Bar, Result) {

    var Player = function (orient, keyprofile) {
        this.points = 0;
        this.orient = orient;
        this.keyprofile = keyprofile;
        this.result = null;
        this.bar = null;
    };

    Player.prototype.createResult = function (gameboard, stage, x, y) {
        if (this.result) {
            return;
        }
        this.result = new Result(gameboard, this.points, x, y);
        this.result.addToStage(stage);
    };

    Player.prototype.createBar = function (y, gameboard, stage) {
        var bar = new Bar(y, this.orient, gameboard, this.keyprofile);
        bar.addToStage(stage);
        this.bar = bar;
        return bar;
    };

    Player.prototype.increasePoints = function() {
        ++this.points;
        this.result.setPoints(this.points);
    };

    return Player;

});
