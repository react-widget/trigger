const reg = /^\-/;

function getOffset(h, v, offset) {
	if (offset[0]) {
		h += reg.test(offset[0]) ? offset[0] : "+" + offset[0];
	}

	if (offset[1]) {
		v += reg.test(offset[1]) ? offset[1] : "+" + offset[1];
	}

	return [h, v].join(" ");
}

// at: point(at)
// my: point(at) position of target

type Placements =
	| "center"
	| "centerCenter"
	| "left"
	| "top"
	| "right"
	| "bottom"
	| "leftCenter"
	| "rightCenter"
	| "topCenter"
	| "bottomCenter"
	| "topLeft"
	| "leftTop"
	| "topRight"
	| "rightTop"
	| "bottomRight"
	| "rightBottom"
	| "bottomLeft"
	| "leftBottom";

type Offset = [number, number];

const placements = {
	center: function (offset: Offset) {
		return {
			at: getOffset("center", "center", offset),
			my: "center center",
		};
	},
	centerCenter: function (offset: Offset) {
		return {
			at: getOffset("center", "center", offset),
			my: "center center",
		};
	},
	left: function (offset: Offset) {
		return this.leftCenter(offset);
	},
	top: function (offset: Offset) {
		return this.topCenter(offset);
	},
	right: function (offset: Offset) {
		return this.rightCenter(offset);
	},
	bottom: function (offset: Offset) {
		return this.bottomCenter(offset);
	},
	leftCenter: function (offset: Offset) {
		return {
			at: getOffset("left", "center", offset),
			my: "right center",
		};
	},
	rightCenter: function (offset: Offset) {
		return {
			at: getOffset("right", "center", offset),
			my: "left center",
		};
	},
	topCenter: function (offset: Offset) {
		return {
			at: getOffset("center", "top", offset),
			my: "center bottom",
		};
	},
	bottomCenter: function (offset: Offset) {
		return {
			at: getOffset("center", "bottom", offset),
			my: "center top",
		};
	},
	topLeft: function (offset: Offset) {
		return {
			at: getOffset("left", "top", offset),
			my: "left bottom",
		};
	},
	leftTop: function (offset: Offset) {
		return {
			at: getOffset("left", "top", offset),
			my: "right top",
		};
	},
	topRight: function (offset: Offset) {
		return {
			at: getOffset("right", "top", offset),
			my: "right bottom",
		};
	},
	rightTop: function (offset: Offset) {
		return {
			at: getOffset("right", "top", offset),
			my: "left top",
		};
	},
	bottomRight: function (offset: Offset) {
		return {
			at: getOffset("right", "bottom", offset),
			my: "right top",
		};
	},
	rightBottom: function (offset: Offset) {
		return {
			at: getOffset("right", "bottom", offset),
			my: "left bottom",
		};
	},
	bottomLeft: function (offset: Offset) {
		return {
			at: getOffset("left", "bottom", offset),
			my: "left top",
		};
	},
	leftBottom: function (offset: Offset) {
		return {
			at: getOffset("left", "bottom", offset),
			my: "right bottom",
		};
	},
};

export default function getPlacement(placement: Placements, offset?: [number, number]) {
	return placements[placement] ? placements[placement](offset || [0, 0]) : null;
}
