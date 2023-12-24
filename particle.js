class Particle {
	constructor(x, y, velocity=createVector(1,0), acceleration=createVector(0,0), mass=1, size=10) {
		// UNIVERSAL CONSTANTS
		this.constant = 6.67430*10**(-1);
		// Location Properties
		this.x = x;
		this.y = y;

		// Mass Properties
		this.mass = mass;
		this.size = size;

		// Movement Properties
		this.velocity = velocity;
		this.acceleration = acceleration;
	}

	calculateAttraction(otherParticle) {
		let dist_sq = ((this.x - otherParticle.x)**2 + (this.y - otherParticle.y)**2 + 10**(-4));
		let mag = this.constant * this.mass*otherParticle.mass/dist_sq;
		let attraction = createVector(otherParticle.x, otherParticle.y).sub(createVector(this.x, this.y));
		attraction.setMag(mag);

		// If they are very close, they are colliding
		if (sqrt(dist_sq)<(this.size+otherParticle.size)*0.5) {
			// Perfectly elastic collusion
			let u1 = this.velocity.copy();
			let u2 = otherParticle.velocity.copy();
			let m1 = this.mass;
			let m2 = otherParticle.mass;

			u1.mult(m1);
			u2.mult(m2);
			let vf = u1.add(u2);
			vf.div(m1+m2);

			this.velocity = vf;
			otherParticle.velocity = vf;
			return createVector(0,0);
		}
		return attraction;
	}

	// Apply a 2D vector force to the particle
	applyForce(force) {
		force.div(this.mass);
		this.acceleration.add(force);
	}

	update() {
		this.velocity.add(this.acceleration);
		
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		this.acceleration.setMag(0);
	}

	draw(clr="#ffffff") {
		push();
		stroke(clr);
		strokeWeight(this.size);
		point(this.x, this.y);
		pop();

		//drawArrow(createVector(this.x, this.y), this.velocity, 'red');
	}
}

function drawArrow(base, vec, myColor) {
  push();
	let arrowSize = 10*vec.mag();
  stroke(myColor);
	strokeWeight(arrowSize/10);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 10, 0, -arrowSize / 10, arrowSize/5, 0);
  pop();
}