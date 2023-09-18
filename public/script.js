const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const role = document.querySelector("#role").value;
    const data = { username, email, password, role };

    try {
        const response = await fetch("http://localhost:5000/routers/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            // Display error messages to the user
            console.error(errorData.message);
            return;
        }
        // Registration successful
        console.log("Registration successful");
        // Clear input fields
        signupForm.reset();
    } catch (error) {
        console.error("Error:", error);
    }
});

const signinForm = document.querySelector("#signin-form");
signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const data = { username, password };

    try {
        const response = await fetch("http://localhost:5000/routers/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Display error messages to the user
            console.error(errorData.message);
            return;
        }

        const userData = await response.json();
        console.log("Login successful");
        // Clear input fields
        signinForm.reset();
        // Save JWT to local storage
        localStorage.setItem("token", userData.accessToken);
        // Redirect to dashboard page
        window.location.href = "/dashboard"; // Replace with your actual dashboard URL
    } catch (error) {
        console.error("Error:", error);
    }
});
