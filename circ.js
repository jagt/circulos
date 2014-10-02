(function(){
'use strict';

var game = {
    stage : null,
    width : 0,
    height : 0,
    canvas : null,
    level : null,
    touches : []
};

game.resetCanvasSize = function() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
};

var consts = {
    gravity : 10.0,
    circleRadius : 50
};

var Circle = function(x, y, vx, vy)
{
    // 'ready' for ready to click
    // 'spliting' for spliting into two
    // 'dying' for dying
    this.state = 'ready';
    this.vx = vx;
    this.vy = vy;

    // draw shape
    this.graphics.clear();
    this.graphics.beginFill("red").drawCircle(0, 0, consts.circleRadius);
    this.x = x;
    this.y = y;
};

Circle.prototype = new createjs.Shape();
Circle.prototype.update = function(dt) {
    vy += dt * consts.gravity;

    var dx = dt * vx;
    var dy = dt * vy;

    // if (this.x - consts.circleRadius + dx < 0) {

};

var Level = function() {
    if(this instanceof Level === false) throw "should call Level with 'new'.";

    this.score = 0;
    this.circles = [];
};

Level.prototype = {};
Level.prototype.init = function() {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    game.stage.addChild(circle);
};

Level.prototype.update = function(dt) {
    console.log(game.touches);
};


window.onload = function() {
    game.canvas = document.getElementById("mainCanvas");
    game.stage = new createjs.Stage("mainCanvas");
    game.resetCanvasSize();
    createjs.Touch.enable(game.stage);

    game.level = new Level();
    game.level.init();
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", function(event){
        var dt = event.delta / 1000;
        game.level.update(dt);
        game.stage.update(event);
        game.touches.length = 0;
    });

    game.stage.addEventListener("stagemousedown", function(event){
        game.touches.push({x:event.stageX, y:event.stageY});
    })

};

window.onresize = function() {
    game.resetCanvasSize();
};


})();
