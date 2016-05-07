define(['powerups/ReduceBarHeight', 'powerups/AddBall'], function (ReduceBarHeight, AddBall) {

    return {
        spawn: function (gameboard) {
            var powerup = new AddBall(gameboard);
            powerup.spawn();
            return powerup;
        }
    };

});