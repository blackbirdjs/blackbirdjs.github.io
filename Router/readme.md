# Nested Routing is necessary 

.. to easily import nested tests, and allow them to link up properly.

# route.fn ?

If the basis of routing is to simply call a .fn, the whole activation system could be separated.

# route views?

The test system could pickup where this leaves off.  However, I kind of need a debug view.

The debug view could be temporary, and just render in place?  But that's not very helpful, if you have to turn it off.

This is where the debug/logging would be helpful.

Yet, in its absence, can we get the router to work for tests?

And, can we be flexible with out the tests actually work?

Where does the navigation go?
How do we split screen, in order to test responsiveness?

# Separate Files -> Reconfigurable Views

How do you choose which type of view you want?

router.list();
	- a single container
	- when an item is clicked, it "opens" in that box
	- can you have two of these?
router.viewport();
	- two columns, list + screen

router.hide(); // hides the nav?

# dev panel?

dev(router.bc())

dev.ac()
dev.rc()

dev.explorer.append()
dev.page.append()


