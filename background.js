// simply reorute the page in backgriund script
chrome.runtime.onMessage.addListener(function(request, sender) 
	{
    	chrome.tabs.update(sender.tab.id, {url: chrome.extension.getURL("working.html")});
	}
);


chrome.storage.sync.get({
	        'sitesToBlock' : ["facebook"], // default values here
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