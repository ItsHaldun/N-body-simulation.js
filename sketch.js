// Canvas Parameters
let HEIGHT_OFFSET;
let w, h;

// Particle Parameters
let N = 300;
let particles = [];

function setup() {
	HEIGHT_OFFSET = 0;
	w = windowWidth;
	h = windowHeight - HEIGHT_OFFSET;
	// Create particles at random
	for (let i=0; i<N; i++) {
		particles.push(new Particle(random(0, w), random(0, h), p5.Vector.random2D()));
	}
	createCanvas(w, h);
}

function draw() {
  background(0);

	// Naive Approach
	for (let i=0; i<N; i++) {
		for (let j=0; j<N; j++) {
			if (i==j) {
				continue;
			}
			let force = particles[i].calculateAttraction(particles[j]);
			particles[i].applyForce(force);
		}
	}

	// Draw the particles at new location
	for (let i=0; i<N; i++) {
		particles[i].update();
		particles[i].draw();
	}
}