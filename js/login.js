localStorage.setItem("login",false)
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
            
            localStorage.setItem("login",true)
            localStorage.setItem("currentUser",username_)
            window.location.href = "home.html";

        }
        else {
            alert("Wrong username or password, try again")
        }
    }else {
        alert(`No account found with username ${username_}`)
    }




})