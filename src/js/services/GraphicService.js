import createjs from 'createjs-collection';

let circle = (x, y, width, color) => {
    var circle = new createjs.createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, width);
    circle.x = x;
    circle.y = y;
    return circle;
};


let bar = (x, y, width, height, color) => {
    var bar = new createjs.createjs.Shape();
    bar.graphics.beginFill(color).drawRoundRect(0, 0, width, height, 0);
    bar.x = x;
    bar.y = y;
    return bar; 
}


module.exports = {
    Bar: bar,
    Circle: circle
};
