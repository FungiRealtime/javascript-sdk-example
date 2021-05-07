import { Client } from "@fungi-realtime/core";

interface Message {
  content: string;
  sentAt: Date;
}

// DOM Elements
let messagesEl = document.getElementById("messages");
let newMessageForm = document.getElementById("new-message-form");

// This is where we'll store the messages
let messages: Message[] = [];

// Create a new client (there should only be one client accross the entire app)
let client = new Client({
  endpoint: "ws://localhost:8081",
});

// Subscribe to the public channel "messages"
let messagesChannel = client.subscribe("messages");

// Bind on the channel to an event with the name "new-message".
messagesChannel.bind<Message>("new-message", (newMessage) => {
  console.log(newMessage);
});

newMessageForm.addEventListener("submit", (event: any) => {
  event.preventDefault();

  let [input] = event.target.elements;
  let messageContent = input.value;

  messagesChannel.trigger("client-new-message", {
    content: messageContent,
    sentAt: new Date(),
  });
});
