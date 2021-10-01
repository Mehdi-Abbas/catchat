if (localStorage.getItem("login") === 'false') {
    window.location.href = "login.html"

}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// ref(db,'messages/MkvRJvASFLxFyA_EM0F').remove()

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

        // if (localStorage.getItem("messages") === null) {
        //     localStorage.setItem("messages", JSON.stringify([message]))
        // }
        // else {
        //     let tempMessages = JSON.parse(localStorage.getItem("messages"))
        //     tempMessages.push(message)
        //     localStorage.setItem("messages", JSON.stringify(tempMessages))
        // }


        const newMessagesRef = push(messagesListRef);
        set(newMessagesRef, message);

        document.getElementById('input').value = ""
        document.getElementById("input").rows = 1



        autoScroll = true
        audio.play();
        document.getElementById("option").classList.replace("show", "hide")
        // if(JSON.parse(localStorage.getItem("messages")).length === 1){
        //    location.reload()
        //    console.log("reload")
        // }
        // const db = getDatabase();
        // const dbRef = ref(db, 'messages');
        // onValue(messagesListRef, function(snapshot) {
        //     console.dir(snapshot.size)
        //   })



    }

}

 let sizeOfData = 0
onValue(messagesListRef, function (snapshot) {
    sizeOfData = (parseInt(snapshot.size))
    // console.log(sizeOfData)
})



document.getElementById("sendButton").addEventListener("click", sendMessage)
document.getElementById("message").addEventListener("click", () => autoScroll = false)
// let a=getSize()
// console.log(sizeOfData)
if (true) {

    let interid = setInterval(() => {

        // let allMessages = JSON.parse(localStorage.getItem("messages"))
        // document.getElementById("message").innerHTML = ""
        // allMessages.forEach(element => {
        //     let div = document.createElement("div")
        //     div.classList.add(element.sender === localStorage.getItem("currentUser") ? "chatCloudSend" : "chatCloudReceive")
        //     if (element.sender !== localStorage.getItem("currentUser")) {
        //         let sender_ = document.createElement("div")
        //         sender_.classList.add("sender")
        //         sender_.innerText = element.sender
        //         div.appendChild(sender_)
        //     }

        //     let txt = document.createElement("div")
        //     txt.classList.add("text")
        //     txt.innerText = element.text
        //     div.appendChild(txt)

        //     let time = document.createElement("div")
        //     time.classList.add("time")
        //     time.innerText = element.timeStamp
        //     div.appendChild(time)
        //     document.getElementById("message").appendChild(div)
        // });
        document.getElementById("message").innerHTML = ""
        onValue(messagesListRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let div = document.createElement("div")
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
            });
        }, {
            onlyOnce: true
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
    getDatabase.ref(`messages`).remove()
    console.log("remove")
    // if (localStorage.getItem("messages") !== null) {
    //     messagesListRef.remove()
    //      location.reload()
    // }
    document.getElementById("option").classList.replace("show", "hide")
})

