var side = 20;
var socket = io();
var m = 20;
var n = 20;
var weather = "Summer";
//var fire = document.getElementById("fire");

function setup() {
    frameRate(5);
    // createCanvas(matrix[0].length * side, matrix.length * side);
    createCanvas(m * side, n * side);
    background('#33FFFF');
}

function drawWeather(w) {
    var p = document.getElementById("seasons");
    weather = w;
    console.log(weather);
    if (weather == "Summer") {
        p.innerText = "Summer";
    } else if (weather == "Winter") {
        p.innerText = "Winter";
    } else if (weather == "Autumn") {
        p.innerText = "Autumn";
    } else if (weather == "Spring") {
        p.innerText = "Spring";
    }
}
function FireButton () {
    socket.emit("fire");
}
//fire.onclick = FireButton;

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#33FFFF");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 1) {
                if (weather == "Summer") {
                    fill("green");
                } else if (weather != "Summer") {
                    fill("#A79F15");
                }
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 2) {
                if (weather == "Winter") {
                    fill("#696968");
                } else if (weather != "Winter") {
                    fill("Yellow");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("gray");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

socket.on("matrix", drawMatrix);
socket.on("exanak", drawWeather);
socket.on("exanak", function (w) {
    weather = w;
   // console.log(weather);
});



