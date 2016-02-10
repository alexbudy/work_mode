chrome.storage.sync.get({
	        'sitesToBlock' : ["facebook"], // default values here
	        'workingNow' : false,
	    }, function(items) {
	    	console.log(items.workingNow)
	    	if (items.workingNow) {
				curUrl = location.href.toLowerCase()
				sites = items.sitesToBlock.split(",")
				for (var i = 0; i < sites.length; i++) {
					if (curUrl.indexOf(sites[i]) > -1) {
						chrome.runtime.sendMessage({redirect: "http://redirect"});
					}
				}
	    	}

		}
);

