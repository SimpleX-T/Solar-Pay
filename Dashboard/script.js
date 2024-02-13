const nav = document.querySelector("nav");
const hamburger = document.querySelector(".hamburger");
const header = document.querySelector("aside");
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("aside nav li");
let progressBars = document.querySelectorAll(".load-circle");

progressBars.forEach((progressBar) => {
	let progressValueEl = progressBar.querySelector(".progress-value");
	let progressValueStart = 0;
	let progressValueEnd = progressBar.getAttribute("data-progress");
	let progressSpeed = 1;
	let amountEl = document.querySelector(".amount");
	let userAmount = 0;

	let increase = setInterval(() => {
		userAmount++;
		amountEl.textContent = `${userAmount}%`;
		if (userAmount == 100) {
			clearInterval(increase);
		}
	}, progressSpeed);

	let progress = setInterval(() => {
		progressValueStart++;
		progressValueEl.textContent = `${progressValueStart}%`;
		progressBar.style.background = `conic-gradient(#4d5bf9 ${
			progressValueStart * 3.6
		}deg, #cadcff ${progressValueStart * 3.6}deg)`;
		if (progressValueStart == progressValueEnd) {
			clearInterval(progress);
		}
	}, 0.5);
});

/* ==================== toggle icon navbar ==================== */
hamburger.addEventListener("click", function toggleNav() {
	nav.classList.toggle("nav-open");
});

/* ========== Circular progress implementation ========== */

window.addEventListener("scroll", () => {
	/* ==================== Scroll Sections active link ==================== */
	sections.forEach((sec) => {
		let top = window.scrollY;
		let offset = sec.offsetTop - 150;
		let height = sec.offsetHeight;
		let id = sec.getAttribute("id");

		if (top >= offset && top < offset + height) {
			navLinks.forEach((links) => {
				links.classList.remove("active");
				document
					.querySelector("aside nav ul li a[href*=" + id + "]")
					.parentElement.classList.add("active");
			});
		}
	});

	/* ==================== close navbar onScroll ==================== */
	nav.classList.contains("nav-open")
		? nav.classList.remove("nav-open")
		: nav.classList.remove("nav-open");
	scrollY >= 120
		? header.classList.add("transparent")
		: header.classList.remove("transparent");
});
