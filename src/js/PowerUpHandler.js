import PowerUps from './powerups';

module.exports =  {
    spawn: function (gameboard) {
        var powerup = new PowerUps.AddBall(gameboard);
        powerup.spawn();
        return powerup;
    }
};