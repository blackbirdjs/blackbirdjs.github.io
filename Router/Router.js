import Base, { is } from "/Base/Base.js";

export default class Router {
	// static route(){
	// 	const route = Router.captor.add(...arguments);
	// 	// route.render();
	// 	return route;
	// }

	// static set_captor(route){ // this is hardly doing anything
	// 	Router.previous_captors = Router.previous_captors || [];
	// 	Router.previous_captors.push(Router.captor);
	// 	Router.captor = route;
	// }

	// static restore_captor(){  //see...
	// 	View.captor = View.previous_captors.pop();
	// }

	constructor(){
		return this.instantiate(...arguments);
	}

	instantiate(){
		// this.log = true;
		this.assign(...arguments);

		this.routes = {};
		this.views = [];

		this.self && this.self(this);

		if (!this.parent)
			this.instantiate_router();
		else
			this.instantiate_route();
	}

	initialize_window_hash(){
		// break the /#/hash/hash-parts/ into ["hash", "hash_parts"]
		this.hash = window.location.hash && window.location.hash.slice(2, -1).replace(/-/g, "_").split("/") || [];
	}
	
	instantiate_router(){
		// is.undef(this.log) && (this.log = true);
		this.router = this;
		this.name = this.name || (this.constructor.name[0].toLowerCase() + this.constructor.name.substring(1));

		this.initialize_window_hash();

		// this.allow_hashchange_callback = true; // x8

		window.addEventListener("hashchange", () => {
			// x9
			// if (this.allow_hashchange_callback){
				this.reinitialize_router();
			// } else {
				// console.warn("BLOCKED hashchange");
				// this.allow_hashchange_callback = true; // important
			// }
		});
		
		this.initialize_router();

		// console.log(this.hash);
		// activate without push
		// this.active_route = this;
		// this.activate(false);
		// setTimeout(() => this.activate(false), 0);
	}

	reinitialize_router(){
		if (this.force_reload){
			window.location.reload();
			return;
		}
		console.group(this.path(), "hashchange");
		if (this.active_route.path() !== window.location.hash.substring(1)){
			console.warn("!X! rematching hash !X!")
			this.initialize_window_hash();
			this.find(route => route.rematch())
			
		}
		console.groupEnd();
	}

	instantiate_route(){
		// this.initialize_route_hash();
		this.initialize_route();
	}

	initialize_route_hash(){
		// this.hash = 
	}

	initialize_router(){
		this.initialize();
		// this.activate(false); // x6
		this.activate();
	}


	initialize_route(){
		this.initialize();
		this.match();
	}

	initialize(){
		// this.prerender();
	}

	// prerender(){
	// 	const main = div.c("item", {
	// 		preview: div(this.name).click(() => this.push())
	// 	});

	// 	this.mains = this.mains || [];
	// 	this.mains.push(main)
	// 	this.views.push(main);
		// this.classify(); // nope - this runs automatically...


		// const view = div.c("item", {
		// 	preview: this.name
		// });

		// view.preview.click(() => {

		// });

		// const ctrl = new this.Ctrl({
		// 	route: this
		// });

		// and let the Ctrl handle the classification?
		// it's possible that extracting this will make things harder.
	// }

	// this is an odd handoff of the hash...
	// we should probably setup the child route's hash in instantiate...
	match(){
		// this.log && console.group(this.path(), ".match()");
		if (this.has_hash()){
			if (this.is_match()){
				this.hash = this.parent.hash.slice(1);
				// this.log = true;
				this.hash_match();
				// this.log && console.groupEnd();
				return true;
			} else {
				this.hash_no_match();
			}
		} else {
			this.no_hash();
		}

		// this.log && console.groupEnd();
		return false; // used to break the rematch loop
	}

	rematch(){
		if (this.match()){ // self is a match
			return this.find(route => route.rematch()) || this;

			// return true; // regardless of child match, return true to halt parent loop
		} else {
			return false;
		}
	}

	has_hash(){
		return this.parent.hash && this.parent.hash.length;
	}

	is_match(){
		// console.log("this.parent.is_active_route()", this.parent.is_active_route(), this.name === this.parent.hash[0],  "why does this matter?");

		// if ( (this.name === this.parent.hash[0]) && 
			// (!this.parent.is_active_route()) ) console.warn("mismatch");

			// this happens when a hashchange happens, and we're jumping from one hash to another, and do a rematch

		// return this.parent.is_active_route() && this.name === this.parent.hash[0];
		return this.name === this.parent.hash[0];

		// if i remove the is_active_route part, it breaks...
		// but it's not really working right now
	}

	hash_match(){
		this.log && console.group(this.path(), ".hash_match()");
		// this.activate(false); // x1
		this.activate();
		this.log && console.groupEnd();
	}

	hash_no_match(){
		this.log && console.group(this.path(), ".hash_no_match()");
		this.no_match();
		this.log && console.groupEnd();
	}

	no_hash(){
		this.log && console.group(this.path(), ".no_hash()");
		this.no_match();
		this.log && console.groupEnd();
	}

	no_match(){
		this.log && console.log(this.path(), ".no_match()");
	}

	// activate(push = true){ // x2
	activate(){
		this.log && console.group(this.path(), ".activate()");
		// this.activate_route(push); // x3
		this.activate_route();
		this.log && console.groupEnd();
	}

	// activate_route(push = true){ // x4
	activate_route(){ 
		if (this.router.active_route === this){
			this.reactivate();
		} else {
			// console.log("activate", this.path());
			if (this.router.active_route /* && this.deactivate_active_route */){
				this.router.active_route.deactivate();
			}

			this.router.active_route = this;
			// push && this.push(); // x5
			this.activated();
		}
	}

	activated(){
		this.log && console.group(this.path(), "activated()");
		
		this.render();
		this.log && console.groupEnd();
	}

	render(){
		// this.classify();
		// this.mains.forEach(main => {
		// 	if (!main.rendered){
		// 		main.append({
		// 			content: () => this.content()
		// 		});
		// 		main.rendered = true;
		// 	}
		// });
		// if (!this.rendered){
		// 	this.classify(); // 1
		// 		this.view.append({
		// 			content: () => this.content() // 2
		// 		});

		// 		// ! Found it:  We must run the content function AFTER classification, because otherwise the classification is void.
		// 	this.rendered = true;
		// } else {
		// 	this.classify();
		// }
		// return this.view;
	}

	rerender_router(){
		// oops, this is going ot be hard, the matching is wonky?
		this.each(route => route.prerender());
		this.each(route => route.rematch());
	}

	content(){
		// this.make(3, { log: true });
	}


	reactivate(){
		this.log && console.log(this.path(),  "reactivate()");
		// this.activated();
	}

	is_active(){
		return this.is_active_route() || this.is_active_ancestor();
	}

	is_active_route(){
		return this.router.active_route === this;
	}

	is_active_parent(){
		const active_child = this.get_active_child();
		return active_child && active_child.is_active_route();
	}

	is_active_ancestor(){
		return this.router.active_route.is_descendant_of(this);
	}

	is_descendant_of(route){
		var parent = this.parent;

		while (parent){
			if (route === parent)
				return true;
			parent = parent.parent;
		}

		return false;
	}

	get_active_child(){
		var next = this.router.active_route;
		while (next){
			if (next.parent === this)
				return next;
			next = next.parent;
		}
		return false;
	}

	deactivate(){
		this.log && console.group(this.path(), "deactivate()");
		// what if this is called manually?  route.deactivate()?  activate parent?
		this.deactivate_route();
		this.deactivated();
		this.log && console.groupEnd();
	}

	deactivate_route(){
		// console.log("deactivate", this.path());
	}

	deactivated(){
		// this.classify(false);
	}

	push(){
		if (this === this.router){
			// remove hash
			this.clear();
		} else {
			// this.router.allow_hashchange_callback = false; // block hashchange rematching // x7
			window.location.hash = this.path();
		}
	}

	clear(){
		window.history.pushState("", document.title, window.location.pathname);
	}

	add(name, props){
		if (is.pojo(name)){
			for (const n in name){
				this.add_route(n, name[n]);
			}
		} else if (is.pojo(props)) {
			 return this.add_route(name, props);
		} else if (props) {
			return this.add_route(name, { content: props });
		} else {
			return this.add_route(name);
		}
	}

	add_route(name, props){
		this.log && console.groupCollapsed(this.path(), ".add_route(", name, ")");
		const route = new this.constructor({
			name, parent: this, router: this.router
		}, props);

		if (this.routes[name]) console.warn("route override?");
		else this.routes[name] = route;
		
		if (!this[name]) this[name] = route;
		else console.warn("prop", name, "taken");
		this.log && console.groupEnd();
		return route;
	}

	// /#/one/two/three/
	level(){
		var count = 0, route = this;
		while (route !== this.router){
			count++;
			route = route.parent;
		}
		return count;
	}

	part(){
		return this.name.replace(/_/g, "-");
	}
	
	path(){
		return "/" + this.parts().join("/") + "/";
	}

	parts(){
		var parent = this.parent;
		const parts = [this.part()];

		while (parent && parent !== this.router){
			parts.unshift(parent.part());
			parent = parent.parent;
		}

		return parts;
	}

	make(n, props){
		for (let i = 1; i < n+1; i++){
			this.add("test"+i, props);
		}
	}

	assign(){
		return Object.assign(this, ...arguments);
	}

	// return value is extremely important
	// don't accidentally use a quick arrow fn: this.each(route => route.something()) and kill the loop because the method returns something...
	// you'd have to use a function(){} or just break to a new line, so it means something completely different..
	find(fn){
		var ret;
		for (const name in this.routes){
			ret = fn.call(this, this.routes[name]);
			if (is.def(ret)) // any defined return value breaks the loop and returns that value
				return ret;
		}

		return false; // nothing found
	}

	each(fn){
		for (const name in this.routes){
			fn.call(this, this.routes[name]);
		}
		return this;
	}

	classify(add = true){
		this.log && console.group(this.path(), (add === false ? "de" : "") + "classify(" + add + ")");

		for (const view of this.views){
			view[add ? "addClass" : "removeClass"]("active active-route");
		}

		var parent = this.parent;

		if (parent)
			parent.classify_as_active_parent(add);

		while (parent){
			parent.classify_as_active_ancestor(add);
			parent = parent.parent;
		}
		
		this.log && console.groupEnd();
	}

	declassify(){
		this.classify(false);
	}

	classify_as_active_parent(add = true){
		this.log && console.log((add === false ? "de" : "") + "classify_as_active_parent", this.path());
		for (const view of this.views){
			view[add ? "addClass" : "removeClass"]("active-parent");
		}
	}

	classify_as_active_ancestor(add = true){
		this.log && console.log((add === false ? "de" : "") + "classify_as_active_ancestor", this.path());
		for (const view of this.views){
			view[add ? "addClass" : "removeClass"]("active active-ancestor");
		}
	}
}

// Router.router = new Router({
// 	log: true
// }); // root/default router
// Router.set_captor(Router.router);

// export const route = Router.route.bind(Router);


/*

Could I proxy and console.log, for quick/easy visibility?

Router.Lo

*/