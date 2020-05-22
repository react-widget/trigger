function getOffset(h: string, v: string, offset: [number, number]) {
	let offsetLeft = offset[0];
	let offsetTop = offset[1];

	if (v === "top") {
		offsetTop *= -1;
	}

	if (h === "left") {
		offsetLeft *= -1;
	}

	if (offsetLeft) {
		h += offsetLeft > 0 ? "+" + offsetLeft : offsetLeft;
	}

	if (offsetTop) {
		v += offsetTop > 0 ? "+" + offsetTop : offsetTop;
	}

	return [h, v].join(" ");
}

export type Placements =
	| "left"
	| "top"
	| "right"
	| "bottom"
	| "topLeft"
	| "topRight"
	| "leftTop"
	| "leftBottom"
	| "rightTop"
	| "rightBottom"
	| "bottomRight"
	| "bottomLeft";

type Offset = [number, number];

const placements = {
	left: function (offset: Offset) {
		return {
			at: getOffset("left", "center", offset),
			my: "right center",
		};
	},
	top: function (offset: Offset) {
		return {
			at: getOffset("center", "top", offset),
			my: "center bottom",
		};
	},
	right: function (offset: Offset) {
		return {
			at: getOffset("right", "center", offset),
			my: "left center",
		};
	},
	bottom: function (offset: Offset) {
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

	topRight: function (offset: Offset) {
		return {
			at: getOffset("right", "top", offset),
			my: "right bottom",
		};
	},

	leftTop: function (offset: Offset) {
		return {
			at: getOffset("left", "top", offset),
			my: "right top",
		};
	},

	leftBottom: function (offset: Offset) {
		return {
			at: getOffset("left", "bottom", offset),
			my: "right bottom",
		};
	},

	rightTop: function (offset: Offset) {
		return {
			at: getOffset("right", "top", offset),
			my: "left top",
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

	bottomRight: function (offset: Offset) {
		return {
			at: getOffset("right", "bottom", offset),
			my: "right top",
		};
	},
};

export default function getPlacement(placement: Placements, offset?: [number, number] | number) {
	if (typeof offset === "number") {
		offset = /^left|right/.test(placement) ? [offset, 0] : [0, offset];
	}

	return placements[placement] ? placements[placement](offset || [0, 0]) : null;
}
