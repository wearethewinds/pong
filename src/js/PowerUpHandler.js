import PowerUps from './powerups';

export default {
    spawn: function (gameboard) {
        var powerup = new PowerUps.AddBall(gameboard);
        powerup.spawn();
        return powerup;
    }
};