/* Docs: https://hexdocs.pm/phoenix/js/ */

import { Socket } from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let channel = socket.channel("chat:lobby", {})
channel.join()
  .receive("ok", () => {
    channel.push("started_connection")
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
    author: userName.value,
    message: message.value
  }
  channel.push("new_message", { body: payload })
})

// new module
function createElement(tag, value) {
  const element = document.createElement(tag)

  if (typeof value === "string") {
    const content = document.createTextNode(value)
    element.appendChild(content)
    return element
  }

  element.appendChild(value)
  return element
}

function createDefaultMessageLine(author, message) {
  const a = createElement("b", author)
  const p = createElement("p", a)
  p.appendChild(document.createTextNode(": " + message))
  return p
}

channel.on("started_connection_messages", msgs => {
  const { history } = msgs
  console.log(history)
  history.forEach((m) => {
    const line = createDefaultMessageLine(m.author, m.message)
    messagesContainer.appendChild(line)
  })
})

channel.on("new_message", msg => {
  const line = createDefaultMessageLine(msg.author, msg.message)
  messagesContainer.appendChild(line)
})

export default socket
