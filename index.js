var	canvas = document.getElementById("canvas"),
	stage = new createjs.Stage(canvas),
	circle,
	center,
	radius,
	fpsLabel,
	circleNumber = 300,
	rings = 35;
	colors = ["#ffffff", "#edeae6", "#c5a173", "#cf0015"];
	colors2 = ["#678e3d", "#fdfffe", "#f71c30", "#007ab3"];
	colorsbb = ["#010027","#000077","#6a2ecd","#9f64d8"];
	colorsbb2 = ["#081856","#085bb9","#fff6f1","#ffd646"];
	colorsby = ["#22072A","#530B57","#780C3D","#3438BD"];

function init() {
	circle();
	createjs.Ticker.addEventListener("tick", tick);
	fps();
}

console.log(window);

function getSpecificRandom(min, max) {
	return Math.random() * (max-min) + min;
};

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

function circle() {

	for (var i = 0; i < circleNumber; i++) {
		radius = Math.floor(getSpecificRandom(0.5, 1.5) * 100)
		circle = new createjs.Shape();
		for (var j = rings; j > 0; j--) {
			circle.graphics.beginFill(colorsbb[Math.random() * colorsbb.length | 0]).drawCircle(0,0,radius*j/rings);
			// circle.graphics.beginFill(getRandomColor()).drawCircle(0,0,radius*j/rings);
			circle.alpha = getSpecificRandom(0.20001, 0.99999);
			circle.cache(-radius, -radius, radius * 2, radius * 2);
		}
		circle.x = stage.canvas.width/2;
		circle.y = stage.canvas.height/2;
		circle.signX = Math.floor(getSpecificRandom(0,2));
		circle.signY = Math.floor(getSpecificRandom(0,2));
		circle.radius = radius;
		circle.speedX = getSpecificRandom(0, 1).toFixed(2)*circle.radius/10;
		circle.speedY = getSpecificRandom(0, 1).toFixed(2)*circle.radius/10;

		circle.snapToPixel = true;

		stage.addChild(circle);
	}
}

function move(event) {
	var l = stage.getNumChildren() - 1;
	for (var i = 0; i < l; i++) {
		var shape = stage.getChildAt(i);
		// shape.speedX = shape.radius / 10 * Math.atan2(shape.y, shape.x);
		// shape.speedY = shape.radius / 10 * Math.atan2(shape.y, shape.x);
		if (shape.signX === 0 && shape.signY === 0) {
			shape.x = (shape.x - shape.speedX);
			shape.y = (shape.y - shape.speedY);
		};
		if (shape.signX === 0 && shape.signY === 1) {
			shape.x = (shape.x - shape.speedX);
			shape.y = (shape.y + shape.speedY);
		};
		if (shape.signX === 1 && shape.signY === 0) {
			shape.x = (shape.x + shape.speedX);
			shape.y = (shape.y - shape.speedY);
		};
		if (shape.signX === 1 && shape.signY === 1) {
			shape.x = (shape.x + shape.speedX);
			shape.y = (shape.y + shape.speedY);
		};
		// if (shape.x > stage.canvas.width + radius * 2 || shape.y > stage.canvas.height + radius * 2 || shape.x < 0 - radius * 2 || shape.y < 0 - radius * 2) {
		// 	shape.x = stage.canvas.width/2;
		// 	shape.y = stage.canvas.height/2;
		// }

		if (shape.x > stage.canvas.width + shape.radius/2) {
		// if (shape.x > stage.canvas.width) {
			shape.signX = 0;
			if (shape.signY === 1) {
				shape.y = shape.y - getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
			if (shape.signY === 0) {
				shape.y = shape.y + getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
		}
		if (shape.y > stage.canvas.height + shape.radius/2) {
		// if (shape.y > stage.canvas.height) {
			shape.signY = 0;
			if (shape.signX === 1) {
				shape.x = shape.x - getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
			if (shape.signX === 0) {
				shape.x = shape.x + getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
		}
		if (shape.x < 0 - shape.radius/2) {
		// if (shape.x < 0) {
			shape.signX = 1;
			if (shape.signY === 1) {
				shape.y = shape.y + getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
			if (shape.signY === 0) {
				shape.y = shape.y - getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
		}
		if (shape.y < 0 - shape.radius/2) {
		// if (shape.y < 0) {
			shape.signY = 1;
			if (shape.signX === 1) {
				shape.x = shape.x + getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
			if (shape.signX === 0) {
				shape.x = shape.x - getSpecificRandom(0, 1).toFixed(2)*shape.radius/10;
			}
		}
	}
}

function tick(event) {
	move(event);
	fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
	stage.update(event);
}

function fps() {
	fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#fff");
	stage.addChild(fpsLabel);
	fpsLabel.x = 10;
	fpsLabel.y = 20;
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
}