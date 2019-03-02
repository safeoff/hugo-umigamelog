function toggleCupsoup() {
	var cs = document.getElementsByClassName("box");
	if (cs[4].style.display == "none") {
		for (var c of cs) {
			c.style.display = "block";
		}
		return;
	}

	for (var c of cs) {
		if (!c.className.match(/qa/)) {
			c.style.display = "none";
		}
	}
}
