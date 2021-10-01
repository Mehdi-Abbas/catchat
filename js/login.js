localStorage.setItem("login", false)
document.getElementById("login").addEventListener("click", () => {

    let username_ = document.getElementById("username").value
    let password_ = document.getElementById("password").value


    let userFound = false

    if (localStorage.getItem("credentials") !== null) {
        let tempCredentials = JSON.parse(localStorage.getItem("credentials"))
        tempCredentials.forEach(element => {
            if (element.username === username_ && element.password === password_) {
                userFound = true
            }

        });
        if (userFound) {

            localStorage.setItem("login", true)
            localStorage.setItem("currentUser", username_)
            window.location.href = "home.html";

        }
        else {
            alert("Wrong username or password, try again")
        }
    } else {
        alert(`No account found with username ${username_}`)
    }




})

document.getElementById("showPass").addEventListener("click", () => {
    if (document.getElementById("showPass").classList.contains("fa-eye")) {
        document.getElementById("password").type = "text"
        document.getElementById("showPass").classList.replace("fa-eye", "fa-eye-slash")
    }
    else {
        document.getElementById("password").type = "password"
        document.getElementById("showPass").classList.replace("fa-eye-slash", "fa-eye")
    }

})