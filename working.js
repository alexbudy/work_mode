var spliturl = location.href.split("?from=")

if (spliturl.length > 1) {
	var from = "(You tried to visit <a href=\"" + spliturl[1] + "\">" + spliturl[1] + "</a>)"
	document.getElementById("arrivedFrom").innerHTML = from;
}
