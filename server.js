var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
io.on('connection', function (socket) {

});

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r < 60) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}
var w = 50;
var h = 60;
grassArr = [];
starkArr = [];
tywin_LannisterArr = [];
jon_SnowArr = [];
daenerys_TargaryenArr = [];

Weather = "Summer";
Weatherinit = 1;
Grassinit = 0;
Starkinit = 0;

var Grass = require("./Grass.js");
var Stark = require("./Stark.js");
var Tywin_Lannister = require("./Tywin_Lannister.js");
var Jon_Snow = require("./Jon_Snow.js");
var Daenerys_Targaryen = require("./Daenerys_Targaryen");


matrix = genMatrix(w, h);
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
            Grassinit++;
        }
        else if (matrix[y][x] == 2) {
            starkArr.push(new Stark(x, y, 2));
            Starkinit++;
        }
        else if (matrix[y][x] == 3) {
            tywin_LannisterArr.push(new Tywin_Lannister(x, y, 3));
        }
        else if (matrix[y][x] == 4) {
            jon_SnowArr.push(new Jon_Snow(x, y, 4));
        }
        else if (matrix[y][x] == 5) {
            daenerys_TargaryenArr.push(new Daenerys_Targaryen(x, y, 5));
        }
    }
}


function drawserever() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in starkArr) {
        starkArr[i].move();
        starkArr[i].mul();
        starkArr[i].eat();
        starkArr[i].die();
    }
    for (var i in tywin_LannisterArr) {
        tywin_LannisterArr[i].move();
        tywin_LannisterArr[i].mul();
        tywin_LannisterArr[i].eat();
        tywin_LannisterArr[i].die();
    }
    for (var i in jon_SnowArr) {
        jon_SnowArr[i].move();
        jon_SnowArr[i].mul();
        jon_SnowArr[i].eat();
        jon_SnowArr[i].die();
    }
    for (var i in daenerys_TargaryenArr) {
        daenerys_TargaryenArr[i].move();
        daenerys_TargaryenArr[i].mul();
        daenerys_TargaryenArr[i].eat();
        daenerys_TargaryenArr[i].die();
    }
    io.sockets.emit("matrix", matrix);
}

function draw_wheater() {
    Weatherinit++;
    if (Weatherinit == 5) {
        Weatherinit = 1;
    }
    if (Weatherinit == 4) {
        Weather = "Autumn";
    }
    if (Weatherinit == 3) {
        Weather = "Winter";
    }
    if (Weatherinit == 2) {
        Weather = "Spring";
    }
    if (Weatherinit == 1) {
        Weather = "Summer";
    }
    io.sockets.emit("exanak", Weather);
}

statistics = {"objarr":[]};


setInterval(function () {
    statistics.objarr.push({
        "Grass_Born": Grassinit,
        "Stark_Born": Starkinit,
        "Jon_Snow_Quantinty": jon_SnowArr.length,
        "Tywin_Lannister_Quantinty": jon_SnowArr.length,
    })
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        if (err) throw err;
    })
}, 13000);

io.on('connection', function (socket) {
    // for(var i in messages) {
    //   io.sockets.emit("display message", messages[i]);
    // }
    // socket.on("send message", function (data) {
    //     messages.push(data);
    //     io.sockets.emit("display message", data);
    // });
    socket.on("fire", function () {
        matrix[this.y][this.x] = 0;
        console.log(matrix[this.y][this.x]);
        console.log("privet rob");
        //io.sockets.emit("delete from your message");
    });
 });
setInterval(drawserever, 3000);
setInterval(draw_wheater, 3000);


