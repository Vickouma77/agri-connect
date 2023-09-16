const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function fetchData() {
    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "test",
            email: "test@gmail.com"
        }),
    })

    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });

    fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "test",
            email: ""
        }),
    })

    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })

    fetch("http://localhost:5000/signout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
}