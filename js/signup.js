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