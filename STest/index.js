import Test from "./Test.js";
import View, { el, div } from "/View/View.js";

const test1 = new Test({
	name: "test1",
	run(){
		console.log("we're running");
		div("hello world, we're running");
	}
});

test1.render();