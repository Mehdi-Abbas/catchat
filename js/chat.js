if (localStorage.getItem("login") === 'false') {
    window.location.href = "login.html"

}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3Q709I4MfZ_mkH9HOZT-b7NftvldoSxs",
    authDomain: "catchat-cab9a.firebaseapp.com",
    projectId: "catchat-cab9a",
    storageBucket: "catchat-cab9a.appspot.com",
    messagingSenderId: "393659026605",
    appId: "1:393659026605:web:01571e9439d0c2220d8a24",
    measurementId: "G-Z3W8S84442",
    databaseURL: "https://catchat-cab9a-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getDatabase();
const messagesListRef = ref(db, 'messages');

document.getElementById("back").addEventListener("click", () => {
    window.location.href = "home.html"
    document.getElementById("option").classList.replace("show", "hide")
})
let autoScroll = true

var audio = new Audio('sounds/tone.mp3');

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



        const newMessagesRef = push(messagesListRef);
        set(newMessagesRef, message);

        document.getElementById('input').value = ""
        document.getElementById("input").rows = 1



        autoScroll = true

        document.getElementById("option").classList.replace("show", "hide")




    }

}

let sizeOfData = 0
onValue(messagesListRef, function (snapshot) {
    sizeOfData = (parseInt(snapshot.size))
})



document.getElementById("sendButton").addEventListener("click", sendMessage)
document.getElementById("message").addEventListener("click", () => autoScroll = false)
localStorage.setItem("size", 0)
if (true) {

    let interid = setInterval(() => {
        // if(localStorage.size<)
        document.getElementById("message").innerHTML = ""
        onValue(messagesListRef, (snapshot) => {
            let x = 1
            snapshot.forEach((childSnapshot) => {
                // const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if (parseInt(localStorage.getItem("size")) < snapshot.size &&
                    childData.sender !== localStorage.getItem("currentUser") &&
                    x === snapshot.size) {
                    audio.play();
                    localStorage.setItem("size", snapshot.size)
                    document.getElementById("down").style.color = "#000"
                    document.getElementById("down").style.backgroundColor = "#15ed26"


                }

                let div = document.createElement("div")
                if (x === snapshot.size) {
                    div.id = "lastMessage"
                }
                div.classList.add(childData.sender === localStorage.getItem("currentUser") ? "chatCloudSend" : "chatCloudReceive")
                if (childData.sender !== localStorage.getItem("currentUser")) {
                    let sender_ = document.createElement("div")
                    sender_.classList.add("sender")
                    sender_.innerText = childData.sender
                    div.appendChild(sender_)
                }

                let txt = document.createElement("div")
                txt.classList.add("text")
                txt.innerText = childData.text
                div.appendChild(txt)

                let time = document.createElement("div")
                time.classList.add("time")
                time.innerText = childData.timeStamp
                div.appendChild(time)
                document.getElementById("message").appendChild(div)
                x++
            });
        }, {
            onlyOnce: true
        });


        if (autoScroll) {
            var objDiv = document.getElementById("message");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
        
        //get position of last position
        if (screen.height - document.getElementById("lastMessage").getBoundingClientRect()['bottom'] <= 9) {
            document.getElementById("down_").classList.replace("hide", "show")
        }
        if (screen.height - document.getElementById("lastMessage").getBoundingClientRect()['bottom'] > 9) {
            document.getElementById("down_").classList.replace("show", "hide")
            document.getElementById("down").style.color = "#293133"
            document.getElementById("down").style.backgroundColor = "#3b92a1"
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

    document.getElementById("option").classList.replace("show", "hide")
})


document.getElementById("down_").addEventListener("click", () => {
    document.getElementById("down").style.color = "#293133"
    document.getElementById("down").style.backgroundColor = "##3b92a1"
})
