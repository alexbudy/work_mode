// simply reorute the page in backgriund script
chrome.runtime.onMessage.addListener(function(request, sender) 
	{
    	chrome.tabs.update(sender.tab.id, {url: chrome.extension.getURL("working.html")});
	}
);