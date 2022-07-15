// ------ Scene Settings ------
const canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const robot = new Robot(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const traffic = [
	new Robot(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
	new Robot(road.getLaneCenter(0), -100, 30, 50, "DUMMY", 1.5),
];

animate();

function animate() {
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].update(road.borders, []);
	}
	robot.update(road.borders, traffic);

	canvas.height = window.innerHeight;

	ctx.save();
	ctx.translate(0, -robot.y + canvas.height * 0.7);

	road.draw(ctx);
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].draw(ctx, "red");
	}
	robot.draw(ctx, "blue");

	ctx.restore();
	requestAnimationFrame(animate);
}

