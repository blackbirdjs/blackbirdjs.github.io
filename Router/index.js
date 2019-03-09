import View, { el, div } from "/View/View.js";

/*
What's literally the simplest way to route?

if (window.location.hash === "one"){
	one();
} else if (window.locai)
*/

const hash = window.location.hash.substring(1);

const routes = {
	one(){
		console.log("this is route one");
		div("this is route one");
	},
	two(){
		console.log("this is route two");
		div("this is route two");
	}
};

if (routes[hash]) {
	routes[hash]();
}

console.log("router");

/*
We could add routes["one/two/"], from within one(){}.

For these simple tests - refreshing is ok, and even good.

So, instead of worrying about *transitions*, we simply use an a href="#/one/two/"

routes[path] = route
route.link("link text") // which defaults to route.name

router.add("/full/path/", <viewable/content fn>)

The problem with this option, is that you potentially have a namespace conflict?

Well...
If you want logically structured paths, so that a child module can be loaded ANYWHERE into another, and SEAMLESSLY hook into the parent's route, in order to register itself....

But, if you have a folder named /something/, and inside, you have a something.js...

Well, first, you have /something.js
Next, you upgrade to /something/something.js, and you can then have
/something/something0.js
/something/something1.js

or even
/something/x/something-x.js

Now, what is exported from all of these?  How are the routes added?

In something.js, we might import something1.js and something2.js.

something1.js could just be a fn.  

But we want to register this fn to run at /something/1/

So, in the /index.js, we import something.js, which in term imports something1 and 2

And in something.js, we could register the route.  Maybe it's by creating a new Test();

import something from "./something.js";

new Test().add({
	something
});


And in something.js

import something1 from "./something/something1.js";
import something2 from "./something/something2.js";

export default new Test().add({ something1, something2 })


Module IDing

1)  inject dynamic <script> to <head>
		import <generated_name> from <dynamic_path>;
		import test_instance from "./test-instance.js";

		test.add("generated_name", generated_name);

Could this be a security vulnerability?  I suppose, if you call the test.load method with user input.




	# eval(user_input) is evil
	eval("console.log('hello world');"); is no more risky than the code itself.



IT SEcurity 101

You have two types of vulnerabilities.

1)  Leaving your doors unlocked.  These are easy to protect against, just lock down all the ports...
2)  Letting idiots in: physically, remotely, but also inadvertently.



Maybe its more like an expedition.  What if you get stuck on an expedition to Mt. Everest, and you get tired, cold, cranky, whiny...

What if I'm on a journey to Mt. Everest, and it's just gotten too hard.  But obviously it would.  And now my complaint is, "I don't want to be here."  Well no shit...



On-Demand Content

The Leftmost Indent (0 indent) should be reserved for the ToC.
	
	You wouldn't necessarily have to indent the contents, but some form of hierarchy needs to be established.

# You can do that with headers (big, bold, etc)

- You can do that with icons/bullets

	Or, you can do that by indenting the contents, and leaving the main points:

At the root level, like line.

This creates a quick skim of the main points
	This is just like dynalist...
	You can do most of this behavior with a text editor...



*/