var LivingCreature = require("./LivingCreature.js");
//--------------------------Jon_Snow__________________________________________
module.exports = class Jon_Snow extends LivingCreature {
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
            var newJon_Snow = new Jon_Snow(newX, newY, this.index);
            jon_SnowArr.push(newJon_Snow);
            this.multiply = 0;
        }
    }


    eat() {
       // var jon_Snow = random(this.chooseCell(3));
        var emptyCells = this.chooseCell(3);
        var jon_Snow = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (jon_Snow) {
            var newX = jon_Snow[0];
            var newY = jon_Snow[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            for (var i in tywin_LannisterArr) {
                if (newX == tywin_LannisterArr[i].x && newY == tywin_LannisterArr[i].y) {
                    tywin_LannisterArr.splice(i,1);
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
            for (var i in jon_SnowArr) {
                if (this.x == jon_SnowArr[i].x && this.y == jon_SnowArr[i].y) {
                    jon_SnowArr.splice(i,1);
                }
            }
        }
    }
}