const form = document.querySelector("form"),
	usernameEl = document.getElementById("username"),
	passwordEl = document.getElementById("password"),
	errorMessage = document.getElementById("errMsg"),
	successMessage = document.getElementById("success");
const passwordToggler = document.getElementById("show");
const loginSignupToggler = document.querySelectorAll(".create");
const signupForm = document.querySelector(".signup");
const loginForm = document.querySelector(".login");

let login = true;

// Login/Signup state toggler
loginSignupToggler.forEach((toggler) => {
	toggler.addEventListener("click", (e) => {
		e.preventDefault();

		if (login) {
			signupForm.style.transform = `translateX(-100%)`;
			loginForm.style.transform = `translateX(-120%)`;
			login = false;
		} else {
			signupForm.style.transform = `translateX(100%)`;
			loginForm.style.transform = `translateX(0%)`;
			login = true;
		}
	});
});

// password peeper function
passwordToggler.addEventListener("click", () => {
	if (passwordEl.getAttribute("type") === "password") {
		passwordEl.setAttribute("type", "text");
		passwordToggler.setAttribute("title", "Hide Password");
		passwordToggler.src =
			"https://www.svgrepo.com/show/532465/eye-slash.svg";
	} else {
		passwordEl.setAttribute("type", "password");
		passwordToggler.setAttribute("title", "Show Password");
		passwordToggler.src = "https://www.svgrepo.com/show/532492/eye-alt.svg";
	}
});

// Function that returns error message
const setMessage = function (messageEl, message) {
	messageEl.textContent = message;
	messageEl.style.display = "block";
	setTimeout(() => {
		messageEl.style.display = "none";
	}, 5000);
};

// Login form event

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const existingUserInfo = {
		email: usernameEl.value,
		password: passwordEl.value,
	};
	const authenticatedUser = await formAction(existingUserInfo, "login");
	setMessage(successMessage, authenticatedUser.message);
	window.location = "Dashboard/index.html";
	console.log(authenticatedUser);

	// setMessage(errorMessage, token.message);
});

// Signup form event
signupForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const newUserInfo = {
		name: `${document.getElementById("firstname").value} ${
			document.getElementById("lastname").value
		}`,
		email: document.getElementById("newUserEmail").value,
		password: document.getElementById("newPassword").value,
	};

	const confirmPassword = document.getElementById("confirmPassword");

	if (confirmPassword.value !== newUserInfo.password) {
		setMessage(
			signupForm.querySelector("#errMsg"),
			"New password doesn't match with Confirm password"
		);
	} else if (newUserInfo.password.length < 8) {
		setMessage(
			signupForm.querySelector("#errMsg"),
			"Password must be upto 8 characters"
		);
	} else {
		const response = await formAction(newUserInfo, "signup");

		if (response.message === "User created successfully") {
			setMessage(signupForm.querySelector("#success"), response.message);
			window.location = "Dashboard/index.html";
		}
	}
});

const formAction = async function (data, endpoint) {
	let response = await fetch(
		`https://solar-pay-backend.onrender.com/api/v1/auth/${endpoint}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/JSON",
			},
			body: JSON.stringify(data),
		}
	);
	response = response.json();
	return response;
};
