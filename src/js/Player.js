import Bar from './Bar';
import Result from './Result.js';

class Player {
    
    constructor (orient, keyprofile) {
        this.points = 0;
        this.orient = orient;
        this.keyprofile = keyprofile;
        this.result = null;
        this.bar = null;
    }
    
    createBar (y, gameboard, stage) {
        var bar = new Bar(y, this.orient, gameboard, this.keyprofile);
        bar.addToStage(stage);
        this.bar = bar;
        return bar;
    }
    
    createResult (gameboard, stage, x, y) {
        if (this.result) {
            return;
        }
        this.result = new Result(gameboard, this.points, x, y);
        this.result.addToStage(stage);
    }
    
    increasePoints () {
        ++this.points;
        this.result.setPoints(this.points);
    }
    
}

module.exports = Player;