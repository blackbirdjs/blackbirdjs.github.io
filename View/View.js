import Base, { is } from "../Base/Base.js";
import filler from "./filler.js";

export default class View extends Base {
	instantiate(){
		this.assign(...arguments);
		this.prerender();
		this.initialize();
	}

	initialize(){
		this.render();
	}

	render(){
		this.content && this.append(this.content);
	}

	prerender(){
		this.el = this.el || document.createElement(this.tag || "div");
		this.id && this.attr("id", this.id);
		this.capture && this.capture();
		this.classify && this.classify();
	}

	capture(){
		View.captor && View.captor.append(this);
	}

	classify(){
		this.add_class(this.classes);

		var cls = this.constructor;

		while (cls !== View){
			this.add_class(cls.name.replace("View", "")
				.toLowerCase()
				.replace("_", "-"));
			cls = Object.getPrototypeOf(cls);
		}

		if (this.name) // sort of optional... just a quick way to identify
			this.add_class(this.name); // NOT set by .append_prop?
	}

	append(...args){
		for (const arg of args){
			if (arg && arg.el){
				arg.parent = this;
				this.el.appendChild(arg.el);
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
				this.el.append(arg);
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
		const view = (value && value.el && value) || (new View().append(value));

		view.add_class(prop).append_to(this);

		if (!this[prop]){
			this[prop] = view;
		} else {
			console.warn(`.${prop} property is already taken`);
		}

		return this;
	}

	append_to(view){
		if (view.nodeType > 0)
			view.appendChild(this.el);
		else
			view.append(this);

		return this;
	}

	add_class(){
		for (const arg of arguments){
			if (is.arr(arg)){
				this.add_class(...arg);
			} else {
				arg && arg.split(" ").forEach(cls => this.el.classList.add(cls));
			}
		}
		return this;
	}

	remove_class(){
		for (const arg of arguments)
			arg && arg.split(" ").forEach(cls => this.el.classList.remove(cls));
		return this;
	}

	has_class(cls){
		return this.el.classList.contains(cls);
	}

	toggle_class(cls){
		return this.has_class(cls) ? this.remove_class(cls) : this.add_class(cls);
	}

	html(value){
		if (arguments.length){
			this.el.innerHTML = value;
			return this;
		} else {
			return this.el.innerHTML;
		}
	}

	text(value){
		if (arguments.length){
			this.el.textContent = value;
			return this;
		} else {
			this.el.textContent;
		}
	}

	attr(name, value){
		if (arguments.length === 2){
			this.el.setAttribute(name, value);
			return this;
		} else {
			return this.el.getAttribute(name);
		}
	}

	click(cb){
		if (!cb) console.error("must provide a callback");
		return this.on("click", cb);
	}

	on(event, cb){
		this.el.addEventListener(event, (...args) => {
			cb.call(this, this, ...args);
		});

		return this;
	}

	removable(event, cb){
		const wrapper = (...args) => {
			cb.call(this, this, ...args);
		};

		this.el.addEventListener(event, wrapper);

		return () => {
			this.el.removeEventlistener(event, wrapper);
		};
	}

	emit(event, detail){
		const e = new CustomEvent(event, { detail });
		this.el.dispatchEvent(e);
		return this;
	}

	empty(){
		this.el.innerHTML = "";
		return this;
	}

	focus(){
		this.el.focus();
		return this;
	}

	// show(){
	// 	this.el.style.display = "";
	// 	return this;
	// }

	hide(){
		this.el.style.display = "none";
		return this;
	}

	unhide(){ // won't add display: block, or whatever, if default display is none.  so "unhide" > "show"
		this.el.style.display = "";
		return this;
	}

	toggle(){
		if (this.styles().display === "none")
			return this.show();
		else {
			return this.hide();
		}
	}

	remove(){
		this.el.parentNode && this.el.parentNode.removeChild(this.el);
		return this;
	}

	styles(){
		return getComputedStyle(this.el);
	}
	
	// inline styles
	css(prop, value){
		// set with object
		if (is.obj(prop)){
			for (var p in prop){
				this.css(p, prop[p]);
			}
			return this;

		// set with "prop", "value"
		} else if (arguments.length == 2) {
			this.el.style[prop] = value;
			return this;

		// get with "prop"
		} else if (arguments.length == 1) {
			return this.el.style[prop];

		// get all
		} else if (!arguments.length){
			return this.el.style;
		} else {
			throw "whaaaat";
		}
	}

	editable(remove){
		remove = (remove === false);
		const hasAttr = this.el.hasAttribute("contenteditable");

		if (remove && hasAttr){
			// console.warn(this.el, "remove ce");
			this.el.removeAttribute("contenteditable");
		} else if (!remove && !hasAttr) {
			// console.warn(this.el, "add ce");
			this.attr("contenteditable", true)
		}
		return this;
	}

	static init_body_as_captor(){
		this.body = new View({
			el: document.body,
			capturable: false
		});

		View.set_captor(this.body);
	}

	static el(token, ...contents){
		const classes = token.split(".");
		const [tag, id] = classes.shift().split("#");
		return new this({ classes, tag, id }).append(...contents);
	}

	static tag(tag){
		const View = this;
		return function(token, ...contents){
			if (is.str(token) && (token[0] === "#" || token[0] === ".")){
				return View.el(tag + token, ...contents);
			} else {
				return View.el(tag, ...arguments);
			}
		};
	}

	static elements(){
		const elements = {};
		for (const str of arguments){
			for (const tag of str.split(", ")){
				elements[tag] = this.tag(tag);
			}
		}
		return elements;
	}

	static set_captor(view){
		View.previous_captors.push(View.captor);
		View.captor = view;
	}

	static restore_captor(){
		View.captor = View.previous_captors.pop();
	}

	static stylesheet(url){
		return new View({ tag: "link" }).attr("rel", "stylesheet").attr("href", url).append_to(document.head);
	}
}

View.previous_captors = [];
View.init_body_as_captor();

View.prototype.filler = filler;

export const el = View.el.bind(View);
export const { 
	div, p, h1, h2, h3, span, section, 
	nav, aside, main, article 
} = View.elements(
	"div, p, h1, h2, h3, span, section", 
	"nav, aside, main, article"
);

/*
exporting all the elements is the easiest way to import them.

Even if you can generate the functions upon importing, you can't really avoid double-writing the names:

const { one, two, three } = View.elements("one, two, three");

If you predefine them, you can write:

import View, { el, div, p, span, h1, h2, section, etc } from "/View/View.js";

In one import statement...
*/