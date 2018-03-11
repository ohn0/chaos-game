"use strict";

function chaosGameGenerator(points)
{
    var chaosGame = {};
    if(points === null || points <= 2){
        console.log("Need more points");
        return null;
    }
    var originPoints = [[0,1], [.5, 0], [1,1]];
    chaosGame.startPoint = [.5, .5];
    chaosGame.currentPoint = chaosGame.startPoint;
    chaosGame.origin = originPoints;
    chaosGame.points = originPoints;  
    chaosGame.points.push(chaosGame.startPoint);
    chaosGame.iterations = 0;
    
    chaosGame.getPoint = function()
    {
        chaosGame.iterations++;
        var lastPoint = chaosGame.points[chaosGame.points.length - 1];
        var randNum = Math.floor(100 * Math.random());
        var nextPoint;
        if(randNum > 66){
            nextPoint = 2;
        }
        else if(randNum > 33){
            nextPoint = 1;
        }
        else{nextPoint = 0;}
        var newPoint = [(lastPoint[0] + chaosGame.points[nextPoint][0])/2,
                        (lastPoint[1] + chaosGame.points[nextPoint][1])/2];
        chaosGame.points.push(newPoint);
    };
    
    chaosGame.getPointList = function(){
        return chaosGame.points;
    };
    
    return chaosGame;
}

function pointDrawer(chaosGenerator)
{
    var pDrawer = {};
    pDrawer.canvas = document.getElementById('canvas');
    pDrawer.ctx = pDrawer.canvas.getContext('2d');
    pDrawer.chaosGen = chaosGenerator;
    pDrawer.canvas.width = pDrawer.canvas.offsetWidth;
    pDrawer.canvas.height = pDrawer.canvas.offsetHeight;
    console.log(pDrawer.canvas.width + ', ' + pDrawer.canvas.height);
    pointDrawer.updatePoints = function(){
        pDrawer.chaosGen.getPoint();
        var pointList = chaosGenerator.getPointList();
        for(var i = 0; i < 3; i++){
            pDrawer.ctx.fillStyle = 'rgb(255,0,0)';
            pDrawer.ctx.fillRect((pointList[i][0] * pDrawer.canvas.width), 
                                 (pointList[i][1] * pDrawer.canvas.height), 1,1);
        }
        pDrawer.ctx.fillRect((pointList[pointList.length-1][0] * pDrawer.canvas.width), 
                     (pointList[pointList.length-1][1] * pDrawer.canvas.height), 1,1);
        window.requestAnimationFrame(pointDrawer.updatePoints);
                     
    };

//    setInterval(function(){pointDrawer.updatePoints();}, 1);
//    window.requestAnimationFrame(pointDrawer.updatePoints);
    pointDrawer.updatePoints();
    console.log("?");
    return pDrawer;
}

var triangleChaosGame = chaosGameGenerator(3);
var pDrawer = null;
var spacePressed = false;
document.addEventListener('keydown', function(event){
    if(!spacePressed && event.keyCode === 32 ){
        spacePressed = true;
        pDrawer = pointDrawer(triangleChaosGame);
    }
});