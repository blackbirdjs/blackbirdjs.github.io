import Base, { is } from "/Base/Base.js";
import View, { el, div } from "/View/View.js";

div(".sandbox", () => {
	div(".left", () => {
		el("textarea").on("change", () => {
			console.log("changed");
		});
	});

	div(".right", () => {
		div("contents");
	});
});