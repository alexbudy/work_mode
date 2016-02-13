function saveOptions() {
	var obj = {}
	obj[this.id] = this.checked
	chrome.storage.sync.set(obj)
}

function restore_options() {
	chrome.storage.sync.get({
		enableTheEnableControl : true,
		enableAddCurrentToBlock: false
	}, function(items) {
		var chkBoxes=document.getElementsByName("options")

		for (var i = 0; i < chkBoxes.length; i++) {
			var chkBox = chkBoxes[i]
			chkBox.addEventListener('click', saveOptions)
			chkBox.checked=items[chkBox.id]
		}
	});
}

document.addEventListener('DOMContentLoaded', restore_options)