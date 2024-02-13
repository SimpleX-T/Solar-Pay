"use strict";

// Preloader function
window.addEventListener("load", () => {
	if (document.querySelector(".circle").classList.contains("loading")) {
		setTimeout(() => {
			document.querySelector(".circle").classList.remove("loading");
			document.querySelector(".preloader").classList.add("hidden");
		}, 1000);
	}
});
