var LivingCreature = require("./LivingCreature.js");
//--------------------------Stark__________________________________________
module.exports = class Stark extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        this.energy--;
        var fullCells = this.chooseCell(0);
        var newCell_1 = fullCells[Math.floor(Math.random() * fullCells.length)];

        if (newCell_1) {
            var newX = newCell_1[0];
            var newY = newCell_1[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            //sxals stex er
            this.x = newX;
            this.y = newY;

        }
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.multiply > 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var newGrass = new Stark(newX, newY, this.index);
            starkArr.push(newGrass);
            this.multiply = 0;
        }
        //console.log(emptyCells);
    }

    eat() {
        //var gras = random(this.chooseCell(1));
        var fullCells = this.chooseCell(1);
        var gras = fullCells[Math.floor(Math.random() * fullCells.length)];
        if (gras) {
            var newX = gras[0];
            var newY = gras[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in starkArr) {
                if (this.x == starkArr[i].x && this.y == starkArr[i].y) {
                    starkArr.splice(i, 1);
                }
            }
        }
    }
}
