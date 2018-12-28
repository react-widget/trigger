const reg = /^\-/;

function getOffset(h, v, offset){
	if( offset[0] ) {
		h += reg.test(offset[0]) ? offset[0] : '+' + offset[0]; 			
	}
	
	if( offset[1] ) {
		v += reg.test(offset[1]) ? offset[1] : '+' + offset[1]; 			
	}	
	
	return `${h} ${v}`;
}

// at: point(at)
// my: point(at) position of target

const _placements = {
	Center: function(offset = []){
		return {
			at: getOffset('center', 'center', offset),
			my: 'center center',
		  } 	
	},
	CenterCenter: function(offset = []){
		return {
			at: getOffset('center', 'center', offset),
			my: 'center center',
		  } 	
	},
	LeftCenter: function(offset = []){
		return {
			at: getOffset('left', 'center', offset),
			my: 'right center',
		  }  
	},
	RightCenter: function(offset = []){
		return {
			at: getOffset('right', 'center', offset),
			my: 'left center',
		  }  
	},
	TopCenter: function(offset = []){
		return {
			at: getOffset('center', 'top', offset),
			my: 'center bottom',
		  }  
	},
	BottomCenter: function(offset = []){
		return {
			at: getOffset('center', 'bottom', offset),
			my: 'center top',
		  }  
	},
	TopLeft: function(offset = []){
		return {
			at: getOffset('left', 'top', offset),
			my: 'left bottom',
		  }  
	},
	LeftTop: function(offset = []){
		return {
			at: getOffset('left', 'top', offset),
			my: 'right top',
		  }  
	},
	TopRight: function(offset = []){
		return {
			at: getOffset('right', 'top', offset),
			my: 'right bottom',
		  }  
	},
	RightTop: function(offset = []){
		return {
			at: getOffset('right', 'top', offset),
			my: 'left top',
		  }  
	},
	BottomRight: function(offset = []){
		return {
			at: getOffset('right', 'bottom', offset),
			my: 'right top',
		  }  
	},
	RightBottom: function(offset = []){
		return {
			at: getOffset('right', 'bottom', offset),
			my: 'left bottom',
		  }  
	},
	BottomLeft: function(offset = []){
		return {
			at: getOffset('left', 'bottom', offset),
			my: 'left top',
		  }  
	},
	LeftBottom: function(offset = []){
		return {
			at: getOffset('left', 'bottom', offset),
			my: 'right bottom',
		  }  
	},
};

export default function placements(placement, offset) {
	console.log(placement)
	return _placements[placement] ? _placements[placement](offset) : null;
};
