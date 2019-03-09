import Router from "./Router.js";
import Dev from "../Dev/Dev.js";
import View, {el, div} from "/View/View.js";

View.stylesheet("/Router/dev.css");

export default class DevRouter extends Router {
	dev(){
		this.views = [];
		this.views.push(dev(div(".router", {
			name: "routzer",
			routes(){}
		})));

		this.force_reload = true;
	}

	add_route(){
		console.log("yo", this);
		const route = super.add_route(...arguments);
		this.views.forEach(view => {
			view.routes.append(div(".route", route.name).click(() => route.push() ))
		});
		return route;
	}
}

/*

What can we do?

router.dev() --> renders into the dev panel


class BaseRouter {}
class Router_1 {}

We need a way to separate view logic from business logic...
Then we can extend it a million different ways...

As opposed to having a decoupled View class system (Router.View), where each router instance can be .render()ed, and that uses this.constructor.View dynamically...

In order to extend the view logic, we then need to:

1) extend the Router.View
2) extend the Router
3) reassign the new RouterView to the new Router


In most simple cases, it's probably easier to just bake the view logic right into the class...

This isn't good, if you're only making 1 class.

But, if you can extend it to add the view logic, you don't have to mess around with these sub view classes...

I suppose the 3 steps above aren't so hard.  And at some point if you have an object that might have a dozen views, you'd definitely want to extract that logic...

And it might be easiest to use the `new this.constructor.View({ thing: this })` pattern...

*/