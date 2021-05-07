import { Client } from "@fungi-realtime/core";

interface Message {
  content: string;
  sentAt: string;
}

// DOM Elements
let messagesEl = document.getElementById("messages");
let newMessageForm = document.getElementById("new-message-form");

// Create a new client (there should only be one client accross the entire app)
let client = new Client({
  endpoint: "ws://localhost:8081",
});

// Subscribe to the public channel "messages"
let messagesChannel = client.subscribe("messages");

// Bind on the channel to an event with the name "new-message".
messagesChannel.bind<Message>("new-message", (newMessage) => {
  let newMessageEl = document.createElement("li");
  let elTextNode = document.createTextNode(
    `${newMessage.content} - ${newMessage.sentAt}`
  );

  newMessageEl.appendChild(elTextNode);

  messagesEl.append(newMessageEl);
});

newMessageForm.addEventListener("submit", (event: any) => {
  event.preventDefault();

  let [input] = event.target.elements;
  let messageContent = input.value;

  fetch("http://localhost:3000/send-message", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      content: messageContent,
      sentAt: new Date().toISOString(),
    }),
  });
});
