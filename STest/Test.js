import Base, { is } from "/Base/Base.js";
import TestView from "./TestView.js";

export default class Test extends Base {
	render(){
		return this.view = new this.constructor.View({ test: this });
	}
}

Test.View = TestView;

/*


export default new Test({
	assignments,
	run(){
		// actual test, can call this.others();
	},
	render(){
		// calls run()
	}
}); // creating this test does NOT run nor render it


// and then
import some_test from "./some_test.js";

some_test.run(args);
some_test.render(args);



// vs

test("name", t => {
	// new Test().render();
});



Don't setup the route until it's rendered...

In fact, should routes only be for views?

/#/hash/ routes could trigger functions without views, but that's rarely useful

Would we ever render a test twice, in 2 locations, giving it different hashes?


Can we create things in code, and then reorganize them with a session?


*/