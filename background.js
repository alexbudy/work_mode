// simply reroute the page in background script
chrome.runtime.onMessage.addListener(function(request, sender) 
	{	
		if (request.turnOn) {
			setModeFromSettings()
			return
		}
		if (sender.tab == undefined) {
			tabid = request.tabid
		} else {
			tabid = sender.tab.id
		}

		if (request.redirect == "workingpage") {
			if (request.from) {
		    	chrome.tabs.update(tabid, {url: chrome.extension.getURL("working.html?from=" + request.from)});
			} else {
		    	chrome.tabs.update(tabid, {url: chrome.extension.getURL("working.html")});
			}
		} else if (request.redirect) {
			chrome.tabs.update(tabid, {url: request.redirect})
		}
		setModeFromSettings()
	}
);

function setModeFromSettings() {
	chrome.storage.sync.get({
		        'sitesToBlock' : "", // default values here
		        'workingNow' : false,
		        'blockAllSites' : false
		    }, function(items) {
	    		// set popup icon
	    		if (items.blockAllSites) {
					chrome.browserAction.setIcon({
				        path:"workmode_on-38.png",
				    });
				    chrome.browserAction.setBadgeText({
				        text:"ALL",
				    });
	    		} else if (items.workingNow) {
					chrome.browserAction.setIcon({
				        path:"workmode_on-38.png",
				    });
				    chrome.browserAction.setBadgeText({
				        text:"ON",
				    });
				} else {
					chrome.browserAction.setIcon({
				        path:"workmode_off-38.png",
				    });
					chrome.browserAction.setBadgeText({
				        text:"",
				    });
				}
		    });
}

setModeFromSettings();