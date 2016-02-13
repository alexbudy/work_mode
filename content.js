window.addEventListener('keyup', startWorkFunction, false)

window.onfocus = function () { 
 	redirectIfFlagsSet()
}; 

// ctrl + Alt + M or W turns on workmode
// still havent decided if I want to flip it back with keystrokes
function startWorkFunction(e) {
    if (!e.ctrlKey || !e.altKey) { 
        return
    }
   chrome.storage.sync.get({
	        enableTheEnableControl : true,
	        enableAddCurrentToBlock: false,
	        sitesToBlock : ""
	    }, function(items) {
		    var MKEY = 77;
		    var WKEY = 87;
		    var AKEY = 65;

		    if (items.enableTheEnableControl && (e.which == MKEY || e.which == WKEY)) {
		    	var obj = {}
				obj['workingNow'] = true
				obj['blockAllSites'] = false

				chrome.storage.sync.set(obj, function() {
			    	chrome.runtime.sendMessage({turnOn: true});			
				})
		    } else if (items.enableAddCurrentToBlock && e.which == AKEY) {
		    	sites = items.sitesToBlock
		    	curUrl = location.href.replace("https://", "").replace("http://", "")
		    	if (sites.indexOf(curUrl) > -1) {
		    		return // already there
		    	}

				var obj = {}
				obj['sitesToBlock'] = sites + "," + curUrl

				chrome.storage.sync.set(obj, function() {
					chrome.runtime.sendMessage({redirect: "workingpage", from: curUrl});					
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
						if (sites[i].trim().length == 0) {
							continue
						}

						if (curUrl.indexOf(sites[i]) > -1) {
							chrome.runtime.sendMessage({redirect: "workingpage", from: curUrl});
						}
					}
		    	}
			}
	);
}

redirectIfFlagsSet()