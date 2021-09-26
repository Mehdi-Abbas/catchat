if (localStorage.getItem("login") === 'false') {
    window.location.href = "login.html"

}
document.getElementById("chatItem").addEventListener("click", () => {
    window.location.href = "chat.html"
})


if (localStorage.getItem("messages") !== null) {
    data = localStorage.getItem("messages")
    data = JSON.parse(data)
    let lastMessage = data[data.length - 1]
    document.getElementById("time").innerText = lastMessage.timeStamp
}


document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.setItem("login", false)
    window.location.href = "login.html"
})