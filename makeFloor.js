function load() {
           // var json = require('./data.json');


        var data;
        $.getJSON("/data.json", function(data) {
            console.log("My data: " + data["features"]);
                // $.each(data["prime"], function(idx,prime) {
                //     alert("Prime number: " + prime);
                // });
          	buildCanvas(data);
        })
            
		
}

var hoverObjects = [];
var stage; 
var data;
var buildCanvas = function(data) {
		
		// console.log(data);
		// var ctx = document.getElementById("floorCanvas").getContext("2d");
		// ctx.rect(0,0,1000,600);
		// ctx.stroke();

        var canvas = document.getElementById("floorCanvas");
        stage = new createjs.Stage(canvas);
        data = data;
        var rect = new createjs.Shape();
        rect.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").drawRect(0, 0, 1000, 600);
       
        stage.addChild(rect);
        stage.enableMouseOver(20); 

        var currentLocation = new createjs.Bitmap("location.jpg");
        stage.addChild(currentLocation);
        currentLocation.x = 500;
        currentLocation.y = 200;
        currentLocation.name = "my_loc";
        currentLocation.scaleX = .5;
        currentLocation.scaleY = .5;
        currentLocation.image.onload = function() {
            stage.scaleX = stage.scaleY = 0.7;
            stage.update();
        };
        currentLocation.addEventListener("mouseover", handleMouseOver);
        currentLocation.addEventListener("mouseout", handleMouseOut);
        hoverObjects.push([currentLocation.name, "You"]);
		// parse json object and build floor
		//ctx.beginPath();
		for(var i = 0; i < data.features.length ; i++ ) {
    		var geometry = data.features[i].geometry;
            var property = data.features[i].properties;
    		if(geometry.type == "Line") {
    			ctx.moveTo(geometry.coordinates[0][0], geometry.coordinates[0][1]);
    			for( var j =1; j < geometry.coordinates.length; j++) {
    				ctx.lineTo(geometry.coordinates[j][0], geometry.coordinates[j][1]);	
    			
    			}
    			ctx.stroke();	
    		}
		   if(geometry.type == "FilledRectangle") {
    			//ctx.moveTo(geometry.coordinates[0][0], geometry.coordinates[0][1]);
                var polygon = new createjs.Shape();
                polygon.graphics.setStrokeStyle(0.5).beginStroke("rgba(0,0,0,1)");
                   polygon.graphics.beginFill("#dd4949");
                polygon.graphics.moveTo(geometry.coordinates[0][0], geometry.coordinates[0][1]);
             
    			for( var j = geometry.coordinates.length -1; j >= 0; j--) {
    			 polygon.graphics.lineTo(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                }
            
                polygon.graphics.endFill();
                polygon.name = property.name;
                stage.addChild(polygon);
                hoverObjects.push([property.name, property.desc]);

                polygon.addEventListener("mouseover", handleMouseOver);
                polygon.addEventListener("mouseout", handleMouseOut);
                stage.update();
    			// ctx.fillStyle = data.features[i].properties.fill;
    			// ctx.fill();
    			// ctx.stroke();	
    		}
		}
        
        // scaling factor 0.7 ** hardcoded
        stage.scaleX = stage.scaleY = 0.7;
        stage.update();
        

}
function handleMouseOver(event) {
        var d = document.getElementById('info_obj');
        d.style.position = "absolute";
        d.style.display = "block";
        var x =  event.localX  * 0.7;
        var y =  event.localY * 0.7;
        d.style.left = x + 100 +'px';
        d.style.top = y  + 'px';
        for(var i = 0; i < hoverObjects.length; i++) {
            if(hoverObjects[i][0] == event.currentTarget.name) {
                d.innerHTML = hoverObjects[i][1];
            }
        }
}
function handleMouseOut(event) {
        var d = document.getElementById('info_obj');
        d.style.position = "absolute";
        d.style.display = "none";
         
}


// TODO
function locateShelf() {

    stage.removeChild(stage.children[2]);
    var polygon = new createjs.Shape();
    polygon.graphics.setStrokeStyle(0.5).beginStroke("rgba(0,0,0,1)");
    polygon.graphics.beginFill("#ffe41c");
    polygon.graphics.moveTo(10, 10);
    polygon.graphics.lineTo(400, 10);
    polygon.graphics.lineTo(400, 50);
    polygon.graphics.lineTo(10, 50);
    polygon.graphics.lineTo(10, 10);
    polygon.graphics.endFill();
    stage.addChild(polygon);


    var line = new createjs.Shape();
    line.graphics.setStrokeStyle(3);
    line.graphics.setStrokeDash([10,10]);
    line.graphics.beginStroke("#0d6de2");
    line.graphics.moveTo(500, 200);
    line.graphics.lineTo(200, 60);
    stage.addChild(line);

    stage.update();
}
