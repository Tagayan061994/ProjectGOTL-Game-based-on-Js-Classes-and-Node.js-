var LivingCreature = require("./LivingCreature.js");
//--------------------------Tywin_Lannister__________________________________________
module.exports = class Tywin_Lannister extends LivingCreature {
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

        if (newCell && this.multiply > 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var NewTywin_Lannister = new Tywin_Lannister(newX, newY, this.index);
            tywin_LannisterArr.push(NewTywin_Lannister);
            this.multiply = 0;
        }
    }

    eat() {
        //var graseat = random(this.chooseCell(2));
        var fullCells = this.chooseCell(2);
        var Tywin_Lannister = fullCells[Math.floor(Math.random() * fullCells.length)];
        if (Tywin_Lannister) {2
            this.energy++;
            var newX = Tywin_Lannister[0];
            var newY = Tywin_Lannister[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            for (var i in starkArr) {
                if (newX == starkArr[i].x && newY == starkArr[i].y) {
                    starkArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in tywin_LannisterArr) {
                if (this.x == tywin_LannisterArr[i].x && this.y == tywin_LannisterArr[i].y) {
                    tywin_LannisterArr.splice(i, 1);
                }
            }
        }
    }
}