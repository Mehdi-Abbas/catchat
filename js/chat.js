if (localStorage.getItem("login") === 'false') {
    window.location.href = "login.html"

}



document.getElementById("back").addEventListener("click", () => {
    window.location.href = "home.html"
    document.getElementById("option").classList.replace("show", "hide")
})
let autoScroll = true

var audio = new Audio('../sounds/tone.mp3');

document.getElementById("message").addEventListener("touchmove", () => {
    autoScroll = false
    document.getElementById("option").classList.replace("show", "hide")

})
const WIDTH_OF_A_LETTER_16_PX = 9.7

let x = parseInt(window.visualViewport.width / WIDTH_OF_A_LETTER_16_PX)


document.getElementById("input").addEventListener("keydown", () => {

    let inputInitialRow = document.getElementById("input").rows
    if (document.getElementById("input").value.length > 0 && document.getElementById("input").value.length % x === 0) {
        document.getElementById("input").rows = parseInt(document.getElementById("input").value.length / x)
        document.getElementById("input").style.borderRadius = "20px"
    }
    if (document.getElementById("input").value.length / x === 1) {
        document.getElementById("input").style.borderRadius = "40px"
    }
})


function sendMessage() {
    let input = document.getElementById('input').value
    if (input.match(/\s*/g)[0] !== input && input !== "") {

        var d = new Date();
        var time = d.toLocaleTimeString();
        time = time.split(" ")
        let ampm = time[1]
        time = time[0].split(":")
        let str = time[0] + ":" + time[1] + " " + ampm


        let message = {
            sender: localStorage.getItem("currentUser"),
            receiver: "",
            text: document.getElementById('input').value,
            timeStamp: str
        }

        if (localStorage.getItem("messages") === null) {
            localStorage.setItem("messages", JSON.stringify([message]))
        }
        else {
            let tempMessages = JSON.parse(localStorage.getItem("messages"))
            tempMessages.push(message)
            localStorage.setItem("messages", JSON.stringify(tempMessages))
        }
        document.getElementById('input').value = ""
        document.getElementById("input").rows = 1



        autoScroll = true
        audio.play();
        document.getElementById("option").classList.replace("show", "hide")
        window.location.href="chat.html"

    }

}


document.getElementById("sendButton").addEventListener("click", sendMessage)
document.getElementById("message").addEventListener("click", () => autoScroll = false)

if (localStorage.getItem("messages") !== null && localStorage.getItem("messages").length>0) {

    let interid = setInterval(() => {

        let allMessages = JSON.parse(localStorage.getItem("messages"))
        document.getElementById("message").innerHTML = ""
        allMessages.forEach(element => {
            let div = document.createElement("div")
            div.classList.add(element.sender === localStorage.getItem("currentUser") ? "chatCloudSend" : "chatCloudReceive")
            if (element.sender !== localStorage.getItem("currentUser")) {
                let sender_ = document.createElement("div")
                sender_.classList.add("sender")
                sender_.innerText = element.sender
                div.appendChild(sender_)
            }

            let txt = document.createElement("div")
            txt.classList.add("text")
            txt.innerText = element.text
            div.appendChild(txt)

            let time = document.createElement("div")
            time.classList.add("time")
            time.innerText = element.timeStamp
            div.appendChild(time)
            document.getElementById("message").appendChild(div)
        });


        if (autoScroll) {
            var objDiv = document.getElementById("message");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
        

    }, 500)
}

let option = document.getElementById("optionButton")

option.addEventListener("click", () => {
    if (document.getElementById("option").classList.contains("hide")) {
        document.getElementById("option").classList.replace("hide", "show")
    } else {
        document.getElementById("option").classList.replace("show", "hide")
    }
})

document.getElementById("option").addEventListener("click", () => {
    if (localStorage.getItem("messages") !== null) {
        localStorage.removeItem("messages")
    }
    document.getElementById("option").classList.replace("show", "hide")
})


