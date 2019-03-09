import Base, { is } from "/Base/Base.js";
import View from "/View/View.js";
import Dev from "/Dev/Dev.js";

View.stylesheet("/Debug/Debug.css");

class DView extends View {

	capture(){
		DView.captor && DView.captor.append(this);
	}
	append_fn(fn){
		DView.set_captor(this);
		const ret = fn.call(this, this);
		DView.restore_captor();

		if (is.def(ret))
			this.append(ret);

		return this;
	}


	append_prop(prop, value){
		const view = (value && value.el && value) || (new DView().append(value));

		view.add_class(prop).append_to(this);

		if (!this[prop]){
			this[prop] = view;
		} else {
			console.warn(`.${prop} property is already taken`);
		}

		return this;
	}
	static set_captor(view){
		DView.previous_captors.push(DView.captor);
		DView.captor = view;
	}

	static restore_captor(){
		DView.captor = DView.previous_captors.pop();
	}
}

DView.previous_captors = [];

const el = DView.el.bind(DView);

const { 
	div, p, h1, h2, h3, span, section, 
	nav, aside, main, article 
} = DView.elements(
	"div, p, h1, h2, h3, span, section", 
	"nav, aside, main, article"
);

dev({
	explorer: div(),
	global: div()
})

const explorer_view = dev.view.explorer;
const global_view = dev.view.global;

DView.set_captor(global_view);

div("this shoudl be in the global box");

class Debug_MethodView extends DView {
	render(){
		// new View().append(`new View(); // before methodview.render().append call`)
		// new DView().append(`new DView(); // before methodview.render().append call`)
		this.append({
			preview: this.name + "()",
			contents: this.content.bind(this)
		});
		// new View().append(`new View(); // after methodview.render().append call`)
		// new DView().append(`new DView(); // after methodview.render().append call`)
	}
}

class DebugView extends DView {
	content(){ return {
		preview: this.iid + "-" + (this.obj.name || this.obj.constructor.name.toLowerCase()),
		contents: div()
	}}
}

class Logger extends Base {
	initialize(){
		this.log_fn = this.log_fn.bind(this);
	}

	log_fn(){
		div(...arguments);
	}
}

export default class DebugBase {
	constructor(){
		const self = new DebugProxy(this).proxy;
		self.log = new Logger({ obj: this }).log_fn;
		self.instantiate(...arguments);
		return self;
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

var next_ID = 0;

class DebugProxy {
	constructor(obj){
		this.proxy = new Proxy(obj, {
			get: this.get_trap.bind(this),
			set: this.set_trap.bind(this)
		});

		this.iid = next_ID++;

		this.view = new DebugView({
			obj, iid: this.iid
		});
	}

	get_trap(ctx, prop, prox){
		const value = ctx[prop];
		const dp = this;
		if ((typeof value === "function") && ["constructor", "hasOwnProperty", "log"].indexOf(prop) === -1){
			return new Proxy(value, {
				apply(fn, ctx, args){
					var ret;
					var largs = ["."+prop+"("].concat(args, ")");
					
					// new View().append(`new View(); // before method ${prop} proxy call`)
					// new DView().append(`new DView(); // before method ${prop} proxy call`)

						new Debug_MethodView({
							name: prop,
							content(){
								console.group.apply(console, largs);
								ret = fn.apply(ctx, args);
								console.groupEnd();
							}
						});

					// new View().append(`new View(); // after method ${prop} proxy call`)
					// new DView().append(`new DView(); // after method ${prop} proxy call`)
					// dp.view.contents.append(() => {
					// });
					// var log = ctx.log;
					return ret;
				}
			});
		} else {
			return value;
		}
	}

	set_trap(ctx, prop, value, prox){
		console.log("set", ctx, prop, value);
		ctx[prop] = value;
		return true; // important
	}
}

// new View().append("new View(); // end of Debug.js")
// new DView().append("new DView(); // end of Debug.js")