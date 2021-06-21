/* Docs: https://hexdocs.pm/phoenix/js/ */

import { Socket } from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel = socket.channel("chat:lobby", {})
channel.join()
  .receive("ok", () => {
    // solve this!!
    console.log("Connected client...")
    channel.on("joined", resp => {
      console.log(resp)
    })
  })
  .receive("error", resp => { console.log("Unable to join", resp) })

const button = document.getElementById("send-button")
const userName = document.getElementById("username")
const message = document.getElementById("message")
const messagesContainer = document.getElementById("container-messages")

button.addEventListener('click', () => {

  if(!userName.value || !message.value) {
    alert("Fill all fields")
    return
  }

  const payload = {
    username: userName.value,
    message: message.value
  }
  channel.push("new_message", { body: payload })
})

channel.on("connection_messages", messages => {
  messages.map((m, i) => console.log(m, i))
})

channel.on("new_message", message => {
  const paragraph = document.createElement("p")
  const author = document.createElement("b")
  const authorText = document.createTextNode(message.username)
  author.appendChild(authorText)

  paragraph.appendChild(author)
  paragraph.appendChild(document.createTextNode(": " + message.message))
  messagesContainer.appendChild(paragraph)
})

export default socket
