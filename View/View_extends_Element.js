import { is } from "../Base/Base.js";
import Element from "../Element/Element.js";

export default class View extends Element {

	initialize(){
		this.render();
	}

	render(){
		this.content && this.append(this.content);
	}

	prerender(){
		this.el = this.el || document.createElement(this.tag || "div");
		this.capturable && View.captor && View.captor.append(this);
		this.classify && this.classify();
	}

	classify(){
		this.add_class(this.classes);

		var cls = this.constructor;

		while (cls !== View){
			this.add_class(cls.name.replace("View", "").toLowerCase());
			cls = Object.getPrototypeOf(cls);
		}

		if (this.name)
			this.add_class(this.name);
	}

	append(...args){
		const container = (this.container && this.container.el) || this.el;

		for (const arg of args){
			if (arg && arg.el){
				this.ref(arg);
				container.appendChild(arg.el);
			} else if (is.pojo(arg)){
				this.append_pojo(arg);
			} else if (is.obj(arg)){
				this.append_obj(arg);
			} else if (is.arr(arg)){
				this.append.apply(this, arg);
			} else if (is.fn(arg)){
				this.append_fn(arg);
			} else {
				// DOM, str, undefined, null, etc
				container.append(arg);
			}
		}
		return this;
	}

	append_fn(fn){
		View.set_captor(this);
		const ret = fn.call(this, this);
		View.restore_captor();

		if (is.def(ret))
			this.append(ret);

		return this;
	}

	append_obj(obj){
		if (!obj.render) throw "objects must have .render method";
		this.append(obj.render());
	}

	append_pojo(pojo){
		for (const prop in pojo){
			this.append_prop(prop, pojo[prop]);
		}
		
		return this;
	}

	append_prop(prop, value){
		var view;
		if (value && value.el){
			view = value;
		} else {
			view = (new View()).append(value);
		}

		if (!view.name)
			view.name = prop; // 1

		view.append_to(this); //2 

		return this;
	}

// not simple
	set name(name){
		const old_name = this._name;
		
		if (name === old_name)
			return;

		if (old_name){
			this.remove_class(old_name);
			if (this.parent && this.parent[old_name] === this)
				delete this.parent[old_name];
		}

		this._name = name;
		this.add_class(name);

		this.parent && this.parent.ref(this);
	}

	get name(){
		return this._name;
	}

	// get/set parent()?
	// .parent should probably only be set via .append...

	static set_captor(view){
		View.previous_captors.push(View.captor);
		View.captor = view;
	}

	static restore_captor(){
		View.captor = View.previous_captors.pop();
	}

	static stylesheet(url){
		return new View({ tag: "link" }).attr("rel", "stylesheet").attr("href", url).appendTo(document.head);
	}

	static args(view, args){
		if (is.str(args[0]) && args[0][0] === "."){
			const classes = args[0].slice(1).split(" ");
			view.name = classes[0];
			view.add_class(...classes.slice(1));
			return view.append(...([].slice.call(args, 1)));
		} else {
			return view.append(...args);
		}
	}

	static el(token, ...contents){
		const classes = token.split(".");
		const [tag, id] = classes.shift().split("#");
		return new this({ classes, tag, id }).append(...contents);
	}

}

export const { el, div, p, h1, h2, h3, section, article, main, nav, span } = View.elements();
export { View };

View.previous_captors = [];
View.prototype.capturable = true;

/*

div("hello world")
div(div("hello world"))
div({})

view.append("hello world");
view.append(div("hello world"));
view.append(function(){
	div("hello world");
});
view.append({
	ref: "hello world",
	ref: div("hello world"),
	ref: {
		sub
	},
	ref(){
	
	}
})


view.append_prop(prop, <viewable>) --> new View()?

view.append_with(ctx, <viewables>);
view.append_ctx(ctx, {
	method(){
		// this === ctx
	}
})

so you can do

this.view.append_ctx(this, {
	method(){
		// this remains this
	}
});

this.view.append({
	method: () => {
		// this remains this...
	}
})
*/