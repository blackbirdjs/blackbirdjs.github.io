class Debug {} // the actual object class

Debug.Ctrl = class {}; // every object instance gets one controller instance

Debug.Ctrl.View = class extends View {}; // each obj/ctrl can have 0+ .views[]

Debug.Log = class {}; // each obj can create a log, independently of the ctrl, but the ctrl can be used to house the logviews.

Debug.Log.View = class extends View {}; // the log could be rendered independently

Debug.Log.Method = class {};
Debug.Log.Method.View = class extends View {}; 

// class Thing extends Base {}
class Thing extends Base.Dev {

}

Thing.Ctrl;
Thing.Ctrl.View;
Thing.Log;
Thing.Log.View;
Thing.Log.Method;
Thing.Log.Method.View;