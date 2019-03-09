import { Base, is, log } from "/core.js";

const log = logger(true, false, "auto"); // returns a noop or console or view-based logger?
log("can be configured somewhere else?");

// class Thing extends Base {
class Thing extends Base.Debug {
	my_method(){ // auto-proxied and logged
		// arguments and return value should often tell the full story...
		log("can be configured");

		log.special(); // special api is tricky
	}
}

Thing.config({
	methods: {
		method_name: true,
		method_name: false,
		method_name: {
			collapse: true,
		}
	}
});



class Thing extends DevBase {
	add(){
		this.log.add(child);
	}
}

Thing.Log = Thing.Log extends Thing.Log {
	add(child_log){
		this.views.forEach(view => view.contents.append(new ChildView(child)))
	}

	render(){
		return new Thing.Ctrl.View();
	}
}


class Thing extends Base.Debug {

}

Thing.Ctrl
Thing.Ctrl.View
Thing.Log
Thing.Log.View

/*

Where do you customize the class' debug view?


We basically have a debug view that is composed of any number of tabs/panels...
Each obj can have its own log.  But it can also have any number of other tabs/panels.

Frankly, the tabs and panels should be configurable, both via code, and via the UI. 

Properties and lists of child items are the basic things.  Maybe some action/trigger buttons. 

I suppose Thing.Log could be the object controller..  Its likely created when the object is created.

What are the absolutes?

Thing
ThingCtrl
ThingCtrlView(s)

ThingMethod
ThingMethodView
ThingMethodLog
ThingMethodLogView


Or, `this.log` is different from `log`?  log will add to global AND to `this`, but we could only log to `this.log()` in order to avoid junking the global log?

But wouldn't the parent method already be logged?  Probably... And so it would likely be invisible (collapsed) in the global log...


Base.Dev {}

and Base.Dev.Ctrl {}


How does the instance communicate with its log?
`this.log.something()` ?

setting a property can automatically get logged.

what kind of data do we actually need to update?

Separating it into 2 different terms might be helpful.

1)  this.debug is the debug view?  No, the debug controller.  Sort of the logger?

Well, if we're moving `this.log` to just `log`, then the "logger" can now be called `this.debug`, which is a controller for any.. debugging.

Besides configuring 
*/
Thing.Log = class extends Thing.Log {
	render(){
		return new Thing.Log.View();
	}

	interface_methods(){
		this.views.forEach(view => view.whatever());
	}
};

Thing.Log.View = class extends Thing.Log.View {

}

// or 










// How about a global log() fn?

import { log } from "/Log/Log.js";
log() && log.subs();
// should be able to detect method context via proxy.
// no need to configure the .log property?

/*
Well, how would you customize each object log?

I suppose we could still look at the obj.constructor.Log class...?


Thing.Log represents the object log...

*/

Thing.Log = class extends Thing.Log {
	.logs[] = new 
}

// 1 global logger --> produces the `log()` fn
// Class.Log is the log/controller, and could exist at .log
// Class.Log.View is the object view...


class Logger {
	build_fn(){
		const self = this;
		this.fn = function(){
			return self.default(...arguments);
		};

		this.fn.logger = self;
	}

	default(first_arg){
		return first_arg;  // some_fn(value) -> some_fn(this.log(value));
			// wrap any single value in a log...
	}
}

class Thing extends Base {}
Thing.Log = class Thing_Log extends Thing.Log {
	// can't customize properties...
}

thing.log = new this.constructor.Log(this.log).fn; // export the api fn
thing.log("any", values);
thing.log.sub();
thing.log.log; // new Thing.Log()

thing_log.logs = [ new Log(), new MethodLog(), new CustomLog() ];
thing_log.render() // new Thing_Log_View()
	// can be rendered anywhere...

global_log = new Global_Log();
global_log.render() // new Global_Log_View()


thing.log() -> new thing.log.log.api_default();
thing.log.msg() -> new thing.log.log.api_msg(); --> new Thing_Log.Message()




class Thing {}

class Thing extends Base {}

class Thing extends Base.Debug {} or Base.Dev {}

const Thing = Base.extend(mixins, props, methods);
const Thing = Base.Dev.extend(mixins, props, methods);

const Thing = Base.extend({
	log: true, // add simple props...
	method(){
		// per usual
	}
});

import { Base, Dev, Method, Property, Element } from "/core.js";

const Thing = Base.extend({
	method_name: new Base.Method({
		// inline method definition
		log: true,
		fn(){
			// code here
		}
	}), // or
	method_name: new Method(true, function(){
		// this is pretty legit...
		// could be a content function with real views
		// could be a util function with only debug views
		// could be a hybrid, so you can display the important parts, and debug the rest...
	})
});

// or

Thing = Base.extend({
	// config
}).add_method();

// or

Thing.add_method(true, {
	method_name(){}
})

// or

Thing.method_config("method_name", { config });

export default const new Method({
	name: "method_name",
	args: {
		arg_name: {
			log: true || false || {},
			proxy, // inherits from log value
			validation, etc,
		}
	}, // or
	args: [
		new Arg({
			name: "arg_name",
			log, config, etc
		})
	],
	fn(arg_name){

	},
	// or
	fn: [
		// code blocks
	],
	ret: {
		// return logging/validation config
	}
});
/*

Thing.Log is inherited, and doesn't have a reference to the new Thign class...

I think we'd have to do

Thing.Log = Thing.Log.extend({
	
});

which woudl then extend itself in whichever way, and then assign to the prototype...

And that's where 

Thing.extend({}) could do a deep extend/protect...

class Thing extends Base.extend({
	
}) {
	
}

or just

const Thing = Base.extend({
	// honestly, this is probably just as good...
});


*/