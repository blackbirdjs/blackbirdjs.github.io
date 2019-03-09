import View, { el, div, p, span } from "./View/View.js";
import Token from "./View/Token.js";

// new View().append("hello world").append_to(document.body);
const body = new View({
	el: document.body,
	capturable: false
});

View.set_captor(body);

console.log(new Token());
// div("hello world");
// div(".hello", "world");
// div(".hello world", "hi");
// div(".text", "oops");

// div(".one two", d => {
// 	div(".one", "one");
// 	d.one.add_class("three");
// 	div("two");
// });

// div(".three four", {
// 	three: 3,
// 	four: "four",
// 	five(){
// 		p("five");
// 	},
// 	six: {
// 		seven: 7,
// 		eight(){
// 			p("8", span("yo"), span("yoo"));
// 		}
// 	}
// });