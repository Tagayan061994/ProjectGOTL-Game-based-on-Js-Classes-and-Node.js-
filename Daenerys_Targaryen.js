var LivingCreature = require("./LivingCreature.js");
//--------------------------Daenerys_Targaryen__________________________________________
module.exports = class Daenerys_Targaryen extends LivingCreature {
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
            [this.x + 1, this.y + 1],
          // vandaknerny avelanum en 24 stugelu depqum
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            //ankyunayin vandaknerny avelanum en 24 stugelu depqum
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y - 2]
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

        if (newCell && this.multiply > 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var newDaenerys_Targaryen = new Daenerys_Targaryen(newX, newY, this.index);
            daenerys_TargaryenArr.push(newDaenerys_Targaryen);
            this.multiply = 0;
        }
    }


    eat() {
        //var jon_Snow = random(this.chooseCell(4));
        var fullCells = this.chooseCell(4);
        var Daenerys_Targaryen = fullCells[Math.floor(Math.random() * fullCells.length)];
        if (Daenerys_Targaryen) {
            var newX = Daenerys_Targaryen[0];
            var newY = Daenerys_Targaryen[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            for (var i in jon_SnowArr) {
                if (newX == jon_SnowArr[i].x && newY == jon_SnowArr[i].y) {
                    jon_SnowArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy+2;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in daenerys_TargaryenArr) {
                if (this.x == daenerys_TargaryenArr[i].x && this.y == daenerys_TargaryenArr[i].y) {
                    daenerys_TargaryenArr.splice(i,1);
                }
            }
        }
    }
}