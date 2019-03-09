import Base, { is } from "/Base/Base.js";
import Storage from "/Storage/Storage.js";
import View, { el, div } from "/View/View.js";

View.stylesheet("/Dev/Dev.css");

/*

CLASS DEFINITIONS SHOULD NEVER DO ANYTHING!
Maybe with the exception of loading the css.

I have a habit of trying to initialize a singleton class in the class file.
But then it gets confusing, and you don't have much control over it.

I suppose it's not that big of a deal, but it might be a better idea not to.
It means I have to refactor a bunch more code now, to do it the right way, with a second dev.js file...

*/

export default class Dev {

	constructor(){
		this.storage = new Storage("dev");

		if (this.storage.get("livereload"))
			this.connect();

		this.render();

	}

	render(){
		const view = this.view = div(".dev", 
			div(".dev-close-btn", "close").click(() => this.hide())
		).append_to(document.body);

		window.dev = function(a){
			view.append(...arguments);
			return a;
		};

		window.dev.view = view;
		window.dev.connect = this.connect.bind(this);
		window.dev.show = this.show.bind(this);

		if (this.storage.get("show-dev-view"))
			this.show_view();

		window.addEventListener("keydown", e => {
			// console.log(e);
			if ((e.key === "D") && e.ctrlKey && e.shiftKey){
				e.preventDefault();
				this.toggle();
			} 

			// if ((e.key === "p") && e.ctrlKey){
			// 	e.preventDefault();
			// 	View.dev.toggleClass("active");
			// 	View.app.toggleClass("has-dev-drawer");
			// 	config.set("dev", View.dev.hasClass("active"));
			// }
		});
	}

	show(){
		this.storage.set("show-dev-view", true);
		this.show_view();
	}

	show_view(){
		this.view.add_class("active");
		this.active = true;
		document.body.classList.add("has-dev");
	}

	hide(){
		this.storage.set("show-dev-view", false);
		this.hide_view();
	}

	hide_view(){
		this.view.remove_class("active");
		this.active = false;
		document.body.classList.remove("has-dev");
	}

	toggle(){
		if (this.active)
			this.hide();
		else
			this.show();
	}

	connect(){
		this.socket = new WebSocket("ws://" + window.location.host);

		this.socket.addEventListener("open", () => {
			console.log("%csimple.dev.socket connected", "color: green; font-weight: bold;");
			this.socket.send("connection!");
		});

		this.socket.addEventListener("message", function(e){
			if (e.data === "reload"){
				window.location.reload();
			} else {
				console.log("message from server:", e.data);
			}
		});

		this.storage.set("livereload", true);

		return this.socket;
	}

	reset(){
		this.storage.set("livereload", false);
		window.location.reload();
	}

	// singleton pattern
	static init(){
		this.dev = new this();
	}
}

Dev.init();