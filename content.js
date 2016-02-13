window.addEventListener('keyup', startWorkFunction, false)

window.onfocus = function () { 
	console.log('test')
 	redirectIfFlagsSet()
}; 

// ctrl + Alt + M or W turns on workmode
// still havent decided if I want to flip it back with keystrokes
function startWorkFunction(e) {
    if (!e.ctrlKey || !e.altKey) { 
        return
    }

   chrome.storage.sync.get({
	        enableTheEnableControl : true
	    }, function(items) {
		    var MKEY = 77;
		    var WKEY = 87;

		    if (items.enableTheEnableControl && (e.which == MKEY || e.which == WKEY)) {

		    	var obj = {}
				obj['workingNow'] = true
				obj['blockAllSites'] = false

				chrome.storage.sync.set(obj, function() {
			    	chrome.runtime.sendMessage({turnOn: true});			
				})
		    } 
		}
	);

}

function redirectIfFlagsSet() {
	chrome.storage.sync.get({
		        'sitesToBlock' : "", // default values here
		        'workingNow' : false,
		        'blockAllSites' : false,
		        'bypassFilterFlag' : false
		    }, function(items) {
		    	if (items.bypassFilterFlag) {
		    		var obj = {}
					obj['bypassFilterFlag'] = false

					chrome.storage.sync.set(obj)
					return
		    	}

				curUrl = location.href.toLowerCase()
		    	
		    	if (items.blockAllSites && items.workingNow) {
		    		chrome.runtime.sendMessage({redirect: "workingpage", from: curUrl});
		    		return;
		    	}

		    	if (items.workingNow) {
					sites = items.sitesToBlock.split(",")
					for (var i = 0; i < sites.length; i++) {
						if (curUrl.indexOf(sites[i]) > -1) {
							chrome.runtime.sendMessage({redirect: "workingpage", from: curUrl});
						}
					}
		    	}
			}
	);
}

redirectIfFlagsSet()