import View, { el, div } from "/View/View.js";

export default class TestView extends View {
	content(){
		this.preview = div(".preview", this.test.name);
		this.contents = div(".contents", () => this.test.run());
	}
}