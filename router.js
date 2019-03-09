import _Router from "/Router/Router.js";
import View, { el, div } from "/View/View.js";

class Router extends _Router {
	link(content){
		content = content || "/#" + this.path()
		return el("a", content).attr("href", "#" + this.path());
	}
}
export default new Router({
	log: true
});