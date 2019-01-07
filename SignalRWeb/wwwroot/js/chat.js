"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var connectionBat = new signalR.HubConnectionBuilder().withUrl("/batHub").build();


connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("ReceiveOnlyMessage", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = "XX says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connectionBat.on("ReceiveMessage", function (data) {
    console.log("data : ", data);
    var encodedMsg = data;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

connectionBat.start();

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });

    connectionBat.invoke("SendMessage", {"name": user, "message": message})
        .catch(function (err) {
            return console.error(err.toString());
        });
    event.preventDefault();
});

document.getElementById("sendMsgButton").addEventListener("click", function (event) {
    console.log("send only msg");
    var message = document.getElementById("messageInput").value;
    connection.invoke("OnlyMessage", message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

