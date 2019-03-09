import Router from "../DevRouter.js";
import View, { el, div } from "/View/View.js";

const router = new Router({ log: true });
router.dev();

router.add("one", one => {
	console.log("this is route one");
});
router.add("two_2", one => {
	console.log("this is route two_2");
});

router.add({
	three(){
		console.log("this is route three");
	},
	four(){
		console.log("this is route four", this);
	}
})

// router.routes.forEach(route => {
// 	div(".route", route.name);
// });

// router.each(route => {
// 	div(`route: ${route.name}`).click(() => route.push());
// });

/*

Custom Mixin Mapping

mixin1 = {
	a(){},
	b(){}
}

mixin2 = {
	a(){},
	b(){}
}

MyClass.mixin({
	a: mixin2.a,
	b: mixin1.b,
	b(){
		mixin1.b(mixin2.b())
	}
})

*/