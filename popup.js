// sets workingNow flag to !flag in chrome storage
function setWorkingFlag(flag) {
	var obj = {}
	obj['workingNow'] = flag

	chrome.storage.sync.set(obj)
}

function saveBlockedSites() {
	var obj = {}
	obj['sitesToBlock'] = this.value.split("\n").join(",")

	chrome.storage.sync.set(obj)
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
}, false);
