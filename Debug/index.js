import Debug from "./Debug.js";
import View, { el, div } from "/View/View.js";


div("hello world").css("background", "red");
new Debug({
	initialize(){
		// debugger;
		div("new View(), inside intiializE");
		this.log("new DView(), inside initilize(()")

		this.my_method();

		div("another view after my_method");
		this.log("another log after my_method");
	},

	my_method(){
		div("a view inside my_method");
		this.log("a log message from inside my_method()");
	}
});