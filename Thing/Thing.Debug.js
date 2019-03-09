class ThingDebug extends Debug {
	existing_method(){

	}
}


/*

Instead of switching

class Thing extends Base { // and
class Thing extends Base.Debug {

We could leave class Thing alone, and also create a Thing.Debug class

So then we decide which we want to use:

import Thing from "/Thing/Thing.js"; // or
import Thing from "/Thing/Thing.Debug.js";

And yet, what would I put in these wrappers?
The args, contents, and return value is auto-logged...

I think it might be better to just have a global `log` function, that accesses the object's current log config when it's called...

import { log } from "/core.js";

// or

const log = core.log.level(-inf to +inf) -> set's the amplitude

class Thing {}

Thing.Log {}

new Thing() --> this.log = new Thing.Log();



HashTable
	.indices[] = array of objects, where the index is significant
	.values[] = array of values that pair with the objects

The problem, is that these are tricky to keep in sync...
And, you can't have duplicates.

Yet, I think it'd be fine, if we don't need to delete any.

Thing.Log.instances[]
and
Thing.Log.instance_config[]

thing.log // doesn't need to exist, but could for simplicity
log.thing, or log.obj can exist...

But, if we want to remove the .log property, and still look this up, we could have Thing.Log.lookup(thing) => the log instance.




Sooo, we have the object.  We have the object's log

thing;
thing.log.logs[]

Thing.Log should be a recursive (tree) class.

Each thing has a single log instance that represents all events for that thing.
Each root log has .logs, one for each time-based event that happens.

And each timestamped log can have its own nested timestamped sub logs, if they're part of the parent event.

Also, these logs could have durations.






By the way, in order to use the console to do something like `thing.log("yo");`, we'd need that `this.log()` fn.  Otherwise, you could use the global `log`, and do something like `log.to(thing, "yo")`.  But it might be best to just keep the debugging stuff turned on?  No, but keep it toggleable.  And keep this.log(), so we can use it without importing?

*/