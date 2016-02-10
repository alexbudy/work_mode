// sets workingNow flag to !flag in chrome storage
function setWorkingFlag(flag) {
	var obj = {}
	obj['workingNow'] = flag

	chrome.storage.sync.set(obj)

	// set popup icon
	if (flag) {
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
}

function saveBlockedSites() {
	var textArea = document.getElementById("blockedSitesTextArea");

	sites = textArea.value.split("\n")
	for (var i = 0; i < sites.length; i++) {
		sites[i] = sites[i].trim()
		if (!sites[i]) {
			sites.splice(i, 1)
			i--
		}
	}

	filteredSites = sites.filter(function(item, pos) {
	    return sites.indexOf(item) == pos;
	})

	var obj = {}
	obj['sitesToBlock'] = filteredSites.join(",")

	chrome.storage.sync.set(obj)
}

function addLinkListeners() {
	var base_url = document.getElementById("base_url_id");
	var full_url = document.getElementById("full_url_id");

	base_url.addEventListener('click', function() {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		    addLineToTextArea(getBaseUrlFromFullUrl(tabs[0].url));
		    saveBlockedSites()
		});
	})

	full_url.addEventListener('click', function() {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		    addLineToTextArea(tabs[0].url);
		    saveBlockedSites()
		});
	})
}

// get base url only
function getBaseUrlFromFullUrl(fullUrl) {
	var patt=/^https?:\/\/[^\/]+/i;

	var match = patt.exec(fullUrl)

	if (match != undefined) {
		console.log(match[0].replace("https://", "").replace("http://", ""))
		return match[0].replace("https://", "").replace("http://", "")
	}
}

// add a line to the text area if line not there 
function addLineToTextArea(line) {
	if (line.indexOf("chrome-extension:") == 0) { // special case, dont block chrome extension pages
		return
	}

	line  = line.replace("https://", "").replace("http://", "")

	var textArea = document.getElementById("blockedSitesTextArea");
	sites = textArea.value.split("\n").join(",")
	if (sites.indexOf(line) == -1) { // not in previous lines
		if (sites.trim().length == 0) {
			textArea.value = line
		} else {
			textArea.value = textArea.value + "\n" + line
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	var button = document.getElementById("stopWorkingBtn");
	var textArea = document.getElementById("blockedSitesTextArea");

	chrome.storage.sync.get({
	        'sitesToBlock' : "facebook,espn", // default values here, stored as comma delim
	        'workingNow' : false,
	        'redirectTo' : '' // default or custom page
	    }, function(items) {
	    	if (!items.workingNow) { // on open of tab, ALWAYS turn on the working setting - more productive that way :)
		    	setWorkingFlag(true)
	    	}
	    	
	    	textArea.value=items.sitesToBlock.split(",").join("\n")
		}
	);


	button.addEventListener("click", function() {
		setWorkingFlag(false);
		window.close();
	});


	textArea.addEventListener("input", saveBlockedSites)

	addLinkListeners()
}, false);
