import View, { el, p, span, div } from "./View.js";

div("hello world");
div(".hello", "world");
div("#hell.o", "world");

div(".hell o", "world");
div(".hell.o", "world"); // equivalent

div("content");
div("#id", "content");
div(".cls", "content");
div("#id.c1.c2", "content");

div(d => {
	div("capture 1");
	div("capture 2");
});

div({
	one: 1,
	two: true,
	three: "three",
	four(){
		div("4A");
		div("4B");
	},
	five: {
		fiveA: "fiveA",
		fiveB: "fiveB",
		fiveC(){
			div("a div inside div.fiveC");
		}
	}
});
// el("div", "hello world");
// el("span", "this is a span");
// el("span", "this is another span", el("span", "with a nested span"), "inside the first span");

// el("span#id.cls", "span#id.cls");

// function span(){
// 	return el("span", ...arguments); // doesn't work
// }

// span.type(".extra.classes", "content");
// p.intro("Hello world");
// // ===
// p(".intro", "Hello world"); // 3 extra characters

// function parse_el_token(){
// 	// tag#id.cls
// }

// function parse_tag_token(tag, token){
// 	// only #id.cls
// }