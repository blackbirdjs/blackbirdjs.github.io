import Base, { is } from "../Base/Base.js";

export default class Element extends Base {
	instantiate(){
		this.assign(...arguments);
		this.prerender();
		this.initialize();
	}

	prerender(){
		this.el = this.el || document.createElement(this.tag || "div");
	}

	append(){
		for (const arg of arguments){
			if (arg && arg.el){
				this.ref(arg);
				this.el.appendChild(arg.el);
			} else {
				this.el.append(arg);
			}
		}

		return this;
	}
	
	ref(child){
		child.parent = this;
		if (child.name){
			if (!this[child.name])
				this[child.name] = child;
			else
				console.warn("prop", child.name, "taken");
		}
	}

	append_to(view){
		if (view.nodeType > 0)
			view.appendChild(this.el);
		else
			view.append(this);

		return this;
	}

	add_class(){
		for (const arg of arguments)
			arg && arg.split(" ").forEach(cls => this.el.classList.add(cls));
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

	show(){
		this.el.style.display = "";
		return this;
	}

	hide(){
		this.el.style.display = "none";
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
}