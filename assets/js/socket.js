/* Docs: https://hexdocs.pm/phoenix/js/ */

import { Socket } from "phoenix"

// TODO1: To create for validation

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel = socket.channel("chat:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

const button = document.getElementById("send-button")
const userName = document.getElementById("username")
const userMessage = document.getElementById("user-message")
const messagesContainer = document.getElementById("container-messages")

button.addEventListener('click', () => {
  const payload = {
    username: userName.value,
    usermessage: userMessage.value
  }
  channel.push("new_message", { body: payload })
})

channel.on("new_message", message => {
  const createElement = (text) => {
		const element = document.createElement("p")
		const textNode = document.createTextNode(text)
		element.appendChild(textNode)
		messagesContainer.appendChild(element)
  }
  createElement(message.context)
  console.log(message)
})

export default socket
