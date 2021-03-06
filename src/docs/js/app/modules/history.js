/**
* This module defines the history one which adds history management support to this tiny little web app.
*
* Depending on browser, either popstate or hashchange event is used. Whenever a popstate is triggered, this module
* will publish the topic wiki-history-change (this module actually just deal with proper event binding, and does not 
* perform any other stuff like dom manipulation or trigger of another action. This is left to the other modules which 
* could subscribe to the wiki-history-change topic).
*
*/
define(

// Dependencies
['app/modules/base', 'libs/pubsub'],

// entry point
function(base) {
  
    var module = {
        init: function() {
            if(!Modernizr.hashchange) {
              return;
            }
            
            $(window).bind('hashchange', $.proxy(this.popStateHandler, this));
        },
        
        popStateHandler:  function popStateHandler(ev) {
          $.publish('wiki-history-change', [window.location.hash]);
          return false;
        }
    },
    
    module = $.extend({}, base, Object.create(module));
    
    $.bridge('history', module);
    
    return module;
});



