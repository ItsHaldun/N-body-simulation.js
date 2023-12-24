class Item {
	constructor(x, y, data) {
		this.x = x;
		this.y = y;
		this.data = data;
	}
}

class Boundary {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	// TODO: Implement Contains
}

class Octree {
	constructor(boundary, capacity=1) {
		this.boundary = boundary;
		this.capacity = capacity;
	}
}