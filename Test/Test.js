import Base, { is } from "/Base/Base.js";
import View, { el, div } from "/View/View.js";
import Dev from "/Dev/Dev.js";
import router from "/router.js";

View.stylesheet("/Test/Test.css");

export default class Test extends Base {

	initialize_route(){
		const parent_route = (this.parent && this.parent.route) || router;
		this.route = parent_route.add(this.name, {
			log: true,
			self: route => {
				this.route = route;
				this.prerender();
			},
			activated: () => {
				this.iso();
			},
			no_hash: () => {
				this.activate();
			}
		});
	}

	prerender(){
		this.view = div(".test", {
			preview: div(el("a", this.name).attr("href", "#" + this.route.path())),
			// div(this.name).click(() => {
			// 	if (this.is_iso){
			// 		this.route.clear();
			// 		window.location.reload();
			// 	} else {
			// 		this.route.push();
			// 		window.location.reload();
			// 	}
			// }),
			contents: div()
		}).add_class(this.name);
	}

	render(){
		this.initialize_route();
		return this; // important, see `static test()`
	}

	activate(){
		if (!this.activated){
			this.view.contents.append(() => {
				this.run();
			});

			this.view.add_class("active");

			this.activated = true;
		}
	}

	iso(){
		this.is_iso = true;
		this.view.add_class("iso");
		this.activate();
	}

	run(){
		console.group((this.is_iso ? "# " : "") + this.name);
		Test.set_captor(this);
		this.fn(...arguments);
		Test.restore_captor();
		console.groupEnd();
	}

	static set_captor(test){
		Test.previous_captors.push(Test.captor);
		Test.captor = test;
	}

	static restore_captor(){
		Test.captor = Test.previous_captors.pop();
	}

	static test(name, fn){
		return new Test({ name, fn, parent: Test.captor }).render();
	}
}

Test.previous_captors = [];

export const test = Test.test.bind(Test);

/*

In the most basic case, we just have one view per test block...
test.render() ....


test("name", t => {
	
}); // new Test({ name, fn }).render();





A test object is just a thin wrapper around methods (test functions).

Some potential objectives:
	Export new Test(), in order to reuse it.
	extend Test in order to preserve the extension capability.
	Create TestClass hierarchies?

	assertion tracking?
	automation?


When you add a test, does it automatically upgrade to its own Test instance?

Test.add({
	test_method(){} --> upgrade to a Test instance?
});

If an added test is to auto-run/render, 

test.run(){
	// loop through .added tests, or override it to manually specify
}

test.render(){
	this.run();
}

new Test({
	prop: 5,
	another_test: imported_test,

	run(args){
		this.one();
		this.another_test.run(args)
	},

	one(){
		// do stuff
	}
});

If the whole test is just one .run() method, then .render() simply wraps the whole thing...

If you want specific control over each method, and potentially create a UI in order to mash them up...

*/