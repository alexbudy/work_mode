// simply reroute the page in background script
chrome.runtime.onMessage.addListener(function(request, sender) 
	{
		if (sender.tab == undefined) {
			tabid = request.tabid
		} else {
			tabid = sender.tab.id
		}

		if (request.from) {
	    	chrome.tabs.update(tabid, {url: chrome.extension.getURL("working.html?from=" + request.from)});
		} else {
	    	chrome.tabs.update(tabid, {url: chrome.extension.getURL("working.html")});
		}

	}
);


chrome.storage.sync.get({
	        'sitesToBlock' : "", // default values here
	        'workingNow' : false,
	    }, function(items) {
    		// set popup icon
			if (items.workingNow) {
				chrome.browserAction.setIcon({
			        path:"workmode_on.png",
			    });
			    chrome.browserAction.setBadgeText({
			        text:"ON",
			    });
			} else {
				chrome.browserAction.setIcon({
			        path:"workmode_off.png",
			    });
				chrome.browserAction.setBadgeText({
			        text:"OFF",
			    });
			}
	    });