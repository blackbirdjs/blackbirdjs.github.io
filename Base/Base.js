export default class Base {
	constructor(){
		this.instantiate(...arguments);
	}

	instantiate(){
		this.assign(...arguments);
		this.initialize();
	}

	initialize(){}

	assign(){
		return Object.assign(this, ...arguments);
	}

	static assign(){
		return Object.assign(this, ...arguments);
	}
}

export const is = {
	arr: function(value){
		return toString.call(value) === '[object Array]';
		// or return Array.isArray()?
	},
	obj: function(value){
		return typeof value === "object" && !is.arr(value);
	},
	dom: function(value){
		return value && value.nodeType > 0;
	},
	el: function(value){
		return value && value.nodeType === 1;
	},
	str: function(value){
		return typeof value === "string";
	},
	num: function(value){
		return typeof value === "number";
	},
	bool: function(value){
		return typeof value === 'boolean';
	},
	fn: function(value){
		return typeof value === 'function';
	},
	def: function(value){
		return typeof value !== 'undefined';
	},
	undef: function(value){
		return typeof value === 'undefined';
	},
	pojo: function(value){
		return is.obj(value) && value.constructor === Object;
	},
	proto: function(value){
		return is.obj(value) && value.constructor && value.constructor.prototype === value;
	}
};