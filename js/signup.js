document.getElementById("signup").addEventListener("click", () => {
    
    let username_ = document.getElementById("username").value
    let password_ = document.getElementById("password").value

    let userCredential = {
        username: username_,
        password: password_
    }

    if (localStorage.getItem("credentials") === null) {
        localStorage.setItem("credentials", JSON.stringify([userCredential]))
    }
    else {
        let tempCredentials = JSON.parse(localStorage.getItem("credentials"))
        tempCredentials.push(userCredential)
        localStorage.setItem("credentials", JSON.stringify(tempCredentials))
    }
    alert("Account created successfully")
    window.location.href = "login.html"



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