chrome.storage.sync.get({
	        'sitesToBlock' : "", // default values here
	        'workingNow' : false,
	        'blockAllSites' : false
	    }, function(items) {
			curUrl = location.href.toLowerCase()
	    	
	    	if (items.blockAllSites) {
	    		console.log(curUrl)
	    		chrome.runtime.sendMessage({redirect: "http://redirect", from: curUrl});
	    		return;
	    	}

	    	if (items.workingNow) {
				sites = items.sitesToBlock.split(",")
				for (var i = 0; i < sites.length; i++) {
					if (curUrl.indexOf(sites[i]) > -1) {
						chrome.runtime.sendMessage({redirect: "http://redirect", from: curUrl});
					}
				}
	    	}
		}
);

