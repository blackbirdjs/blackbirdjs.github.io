import Test, { test } from "/Test/Test.js";
import View, { el, div } from "/View/View.js";

test("ok_here_we_go", t => {
	div("ok, here we go!!!");
	el("a", "#/ok-here-we-go/").attr("href", "#/ok-here-we-go/");
	el("a", "http://localhost/Test/#/ok-here-we-go/").attr("href", "http://localhost/Test/#/ok-here-we-go/");
});

test("hello", t => {
	div("inside the hello test block");
})

test("again", t => {
	el("input", "placeholder?");
	el("span", "hmm");
});

test("parent", p => {
	el("h1", "content for parent test");

	test("child", c => {
		div("child test content");
	});	

	test("child2", c => {
		div("child2 test content");
	});
});

const test1 = new Test({
	name: "test1",
	base_item(){
		return div(".item", "This is an item");
	},

	item1(){
		return this.base_item().add_class("item1");
	},

	fn(){
		this.item1();
	}
});

test1.render();