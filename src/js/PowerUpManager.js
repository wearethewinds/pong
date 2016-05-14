import PowerUps from './powerups';
import MathService from './services/MathService';

class PowerUpManager {
    spawn (gameboard) {
        var powerup = new (getRandomPowerUp())(gameboard);
        powerup.spawn();
        return powerup; 
    }
}

var getRandomPowerUp = () => {
    var powerUps = Object.keys(PowerUps);
    var index = MathService.getRandomInt(0, powerUps.length - 1);
    return PowerUps[powerUps[index]];
};

module.exports = new PowerUpManager();